import {Injectable} from '@angular/core';
import * as enigmaJs from 'enigma.js';

var envconfig = require('../config.json')

@Injectable()
export class SenseService {

  qixSchema = require('../../node_modules/enigma.js/schemas/qix/3.1/schema.json');
  config = {
    schema: this.qixSchema,
    session: {
      host: envconfig.host,
      prefix: envconfig.prefix,
      unsecure: false
    }
  }
  app: any

  constructor() {

  }

  connect() {
    return new Promise((resolve, reject) => {
      enigmaJs.getService('qix', this.config)
        .then(qix => {
          return qix.global.openApp(envconfig.app)
        })
        .then(app => {
          this.app = app
          resolve()
        })
        .catch(reject)
    })
  }

  getProjects(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      var hypercubeDef = {
        qInfo: {
          qType: 'cube'
        },
        qHyperCubeDef: {
          qDimensions: [{
            qDef: {
              qSortCriterias: [{
                qSortByAscii: 1
              }],
              qFieldDefs: ['title']
            }
          },{
            qDef: {
              qSortCriterias: [{
                qSortByAscii: 1
              }],
              qFieldDefs: ['projectId']
            },
            qNullSuppression: true
          }],
          qMeasures: [{
            qDef: {
              qLabel: 'Number of Points',
              qDef: '=Sum(points)'
            }
          }],
          qInitialDataFetch: [{
            qWidth: 3,
            qHeight: 200
          }]
        }
      }

      this.app.createSessionObject(hypercubeDef)
        .then(obj => {
          return obj.getLayout()
        })
        .then(layout => {
          resolve(layout.qHyperCube.qDataPages[0].qMatrix.map(val => ({title: val[0].qText, sum: val[2].qNum})))
        })
        .catch(reject)
    })
  }

}
