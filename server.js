// Load modules needed
var jwt = require('jsonwebtoken')
var fs = require('fs')
var express = require('express')
var http = require('http')
var https = require('https')
var path = require('path')
var _ = require('lodash')
var bodyParser = require('body-parser')
var config = require('./config')
var senseConfig = require('./src/config.json')

var app = express()
//set the port for the listener here
var port = config.serverPort
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use('/', express.static(path.join(__dirname, 'dist')))

//**********************************************************/
//CONFIG SECTION                                            /
//**********************************************************/

var jwtEncryptionKey = fs.readFileSync(config.privateKeyFile)
//e.g. "F:\\My Documents\\CertFiles\\june2017.qlikpoc.com\\client_key.pem"

var serverKey = fs.readFileSync(config.serverKeyFile)
var serverCert = fs.readFileSync(config.serverCertFile)

var hostname = senseConfig.host
var prefix = senseConfig.prefix

//In the following function, update the attributes and add more if desired.
function createToken() {
  var token = jwt.sign(config.jwtToken, jwtEncryptionKey, {
    algorithm: 'RS256'
  })
  return token
}

//**********************************************************/
//CONFIG SECTION                                            /
//**********************************************************/

function authRequest(token) {
  return new Promise(function(resolve) {
    var cookie
    var options = {
      hostname: hostname,
      port: 443,
      path: '/' + prefix + '/qrs/about?xrfkey=ABCDEFG123456789',
      method: 'GET',
      headers: {
        'X-Qlik-Xrfkey': 'ABCDEFG123456789',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      rejectUnauthorized: false
    }

    var request = https.request(options, function(response) {
      //cookie = response.headers['set-cookie'];
      console.log(cookie)
      response.on('data', function(data) {
        // process.stdout.write(JSON.stringify(JSON.parse(data)));
        resolve(cookie)
      })
      resolve(response.headers['set-cookie'])
    })
    request.on('error', function(error) {
      console.log(error)
    })

    request.end()
  })
}

app.get('/auth', function(request, response) {
  authRequest(createToken())
    .then(function(res) {
      console.log(res)
      response.setHeader('set-cookie', res)
      return
    })
    .then(function() {
      var options = {
        root: path.join(__dirname, 'dist')
      }
      response.sendFile('index.html', options, function(err) {
        if (err) {
          console.log(err)
          response.status(err.status).end()
        }
      })
    })
    .catch(function(error) {
      console.log(error)
    })
})

var httpsoptions = {
  key: serverKey,
  cert: serverCert
}

var server = https.createServer(httpsoptions, app)
server.listen(port, function() {
  console.log('JWT test server started')
})
