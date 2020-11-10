// module.exports = () => {};

// Módulo para trabajar con rutas de archivos y directorios
const path = require('path');
// Módulo que permite trabajar con el sistema de archivos en su computador
const fs = require('fs');
const { resolve } = require('path');
const { rejects } = require('assert');


// ¿Ruta absoluta o relativa? 
let pathFile = process.argv[2];
let options = {
  validate: false
};

// Métodos de path que devuelven una ruta absoluta
pathFile = path.resolve(pathFile); // Absoluta
pathFile = path.normalize(pathFile); // normaliza y resuelve '..' y '.'

const mdLinks = fs.readFile(pathFile, "utf-8", (error, data) => {
  if (error) {
    console.log(error + 'Por favor ingresa una ruta correcta');
  }
  console.log(data);
});


//   return new Promise((resolve, reject) => {


module.exports = mdLinks;

// mdLinks()
//   .then(route => {
//     if (route === '') {
//       return
//     } throw 'Ingresa una ruta correcta';

//   })
//   .catch(error => console.log(error))
