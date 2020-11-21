#!/usr/bin/env node

const fs = require("fs");
const path = require('path');
const util = require('util');
const md = require('markdown-it')();
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fetchUrl = require('fetch').fetchUrl;

// Recibe una ruta
let filePath = process.argv[2];
let firstOption = process.argv[3];
let secondOption = process.argv[4];

// Métodos de path que devuelven una ruta absoluta
filePath = path.resolve(filePath); // Absoluta
filePath = path.normalize(filePath); // normaliza y resuelve '..' y '.'

// Objeto
const options = {
  validate: false,
  stats: false
};

if (firstOption === "--stats" || firstOption === "--s") {
  options.stats = true;
  options.validate = false;
} if (firstOption === "--validate" || firstOption === "--v") {
  options.validate = true;
  options.stats = false;
} if (firstOption === "--stats" && secondOption === "--validate" || firstOption === "--s" && secondOption === "--v") {
  options.validate = true;
  options.stats = true;
}


const readdir = util.promisify(fs.readdir);

module.exports.init = () => {
  // Verificar que la ruta dada es un archivo o directorio
  // Dependiendo de eso se ejecuta lo requerido.
  fs.stat(filePath, (error, stats) => {
    const isFile = stats.isFile();
    const isDirectory = stats.isDirectory();

    if (isFile) {
      return extractLinks([filePath])
        .then(data => {
          Promise.all(data.map(href => getStatusUrl(href).catch(error => 'broken')))
            .then(results => {
              console.log(results)
              statsObject = {
                Total: results.length,
                Unique: results.length,
                broken: results.length,
              }
              console.log(statsObject)
              return statsObject;
            });
        })
        .catch(error);
    } if (isDirectory) {
      readdir(filePath)
        .then(files => {
          const filesMarkdown = files.filter(file => file.includes('.md'));
          return extractLinks(filesMarkdown).then(data => {
            Promise.all(data.map(href => getStatusUrl(href).catch(error => 'broken' + error)))
              .then(results => {
                statsObject = {
                  Total: results.length,
                  Unique: results.length,
                }
                console.log(statsObject)
                return statsObject;
              });
          });
        })
        .catch(error);
    } else {
      throw error;
    }
  });
};

const readFileContent = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (error, content) => {
      if (error) {
        reject(error);
      }
      resolve({ fileName: file, content });
    });
  });
};

const extractLinks = (files) => {
  return new Promise((resolve, reject) => {
    if (!files.length) {
      reject('Arreglo no valido');
    }
    const promises = files.map(file => readFileContent(file));

    Promise.all(promises).then(files => {
      let linksInArray = [];
      let detailsLinks = {};
      for (const file of files) {
        // Pasar mi archivo .md a html
        const fileMd = md.render(file.content.toString());
        const domContent = new JSDOM(fileMd);
        // Creo un array desde el nodeList
        const links = Array.from(domContent.window.document.querySelectorAll('a'));
        links.forEach((link) => {
          detailsLinks = {
            href: link.href,
            text: link.text.slice(0, 50),
            file: filePath,
          }
          const aboutBlank = 'about:blank';
          const regularExpression = new RegExp(aboutBlank, 'gi');
          if (!regularExpression.exec(link.href)) {
            linksInArray.push(detailsLinks);
          }
        })
      }
      getStatusUrlInArray(linksInArray);
      resolve(linksInArray);
    });
  });
};


this.init();


// FETCH => Recibe el status
const getStatusUrl = (links) => {
  return new Promise((resolve, reject) => {
    fetchUrl(links.href, (error, meta) => {
      if (error) {
        reject(error);
      } else {
        if (meta.status === 200) {
          resolve(meta.status);
        }
        if (meta.status === 400) {
          resolve(meta.status);
        }
      }
    });
  });
};

// Recorre el array 
const getStatusUrlInArray = (linksInArray) => {
  return new Promise((resolve, reject) => {
    let status = 0;
    let broken = 0;
    for (let i = 0; i < linksInArray.length; i++) {
      getStatusUrl(linksInArray[i])
        .then(res => {
          if (res === 200) {
            status += 1;

            resolve(status += 1);
          } if (res > 400) {
            resolve(broken += 1);
          }
        })
    }
  })
}