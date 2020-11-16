const path = require('path');
const extractLinks = require('./extractLinks')

// Recibe una ruta
let pathFile = process.argv[2];

// Métodos de path que devuelven una ruta absoluta
pathFile = path.resolve(pathFile); // Absoluta
pathFile = path.normalize(pathFile); // normaliza y resuelve '..' y '.'

// Objeto
const options = {
  validate: false,
  stats: false
};

// Método de fs recibe parametros y una callback 
const mdLinks = (path, options) => {
};

extractLinks(pathFile, options);
