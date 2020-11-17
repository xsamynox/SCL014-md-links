const path = require('path');
const mdLinks = require('./extractLinks')

// Recibe una ruta
let pathFile = process.argv[2];

// Métodos de path que devuelven una ruta absoluta
pathFile = path.resolve(pathFile); // Absoluta
pathFile = path.normalize(pathFile); // normaliza y resuelve '..' y '.'

console.log(pathFile)
// Objeto
const options = {
  validate: false,
  stats: false
};

// const mdLinks = (path, options) => {
// };

mdLinks(pathFile, options);
