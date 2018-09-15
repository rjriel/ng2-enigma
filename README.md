# ng2-enigma

Have you tried out [enigma.js](https://github.com/qlik-oss/enigma.js), Qliks javascript library released under the [Qlik Open Source Software](https://github.com/qlik-oss) initiative? How about in Angular 2? If not, this example will do nicely.

A working example of the project can be seen at https://rjriel.github.io/ng2-enigma/

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.17.

## Usage

This project was created with the Angular CLI, which you will need in order to build and run. Information on installing the Angular CLI can be found [here](https://github.com/angular/angular-cli#installation).

Once that's done, you'll have to follow these steps:

1. clone the repository
2. run `npm install`
3. create a `src/config.json` file with the following structure:

  ```
  {
    "host": "<the sense host>",
    "prefix": "<the virtual proxy>",
    "app": "<the app to connect to>"
  }
  ```
  
4. run `ng serve`

`ng serve` will build the project and run it on your system at `http://localhost:4200`.

## IMPORTANT

The hypercube and html in this example is built for the Qlik Branch app that the [Qlik Branch](https://developer.qlik.com) website uses. If you want to get the example working with other data, you will need to modify the hypercube and the html.
