# Xsamynox Markdown Links

## Índice

* [1. Md-Links](#1-md-links)
* [2. Flujo](#2-flujo)
* [3. Instalación](#3-instalación)
* [4. Uso](#3-uso)
* [5. Herramientas y Librerias Utilizadas](#4-herramientas-y-librerias-utilizadas)
* [6. Autor](#5-autor)

***

## 1. Md-Links

![md-links](Images-readme/portada.png)


**¿Qué es Md-Links?**

Md-Links es una libreria que lee y analiza archivos en formato **MARKDOWN**  para verificar los links que contengan y reportar algunas estadísticas.

Puedes conocerla y probarla [aquí](https://www.npmjs.com/package/xsamynox-md-links).
## 2. Flujo

Para la implementación de Md-Links se creo un flujo que explica el funcionamiento de la libreria.

![Flujo](Images-readme/flujo.png)
## 3. Instalación 🚀

Cómo primera instancia es necesario que tengas instalado [Node.js](https://nodejs.org/).

Luego:
```
npm install xsamynox-md-links
npm i xsamynox-md-links
```
## 4. Uso

1. Si sólo quieres ver los links extraidos de tus archivos .md tienes dos opciones, uno analizara el archivo especifico y el otro algún directorio:

```
npx xsamynox-md-links nombredetuarchivo.md
npx xsamynox-md-links ./ (Directorio actual)
```

2. Si quieres saber si tus links estan respondiendo de manera correcta:

```
npx xsamynox-md-links nombredetuarchivo.md --validate
npx xsamynox-md-links nombredetuarchivo.md --v

npx xsamynox-md-links ./ (Directorio actual) --validate
npx xsamynox-md-links ./ (Directorio actual) --v
```

3. Si quieres visualizar la estadística de tus links totales y tus links unicos:

```
npx xsamynox-md-links nombredetuarchivo.md --stats
npx xsamynox-md-links nombredetuarchivo.md --s

npx xsamynox-md-links ./ (Directorio actual) --stats
npx xsamynox-md-links ./ (Directorio actual) --s
```

4. Si quieres visualizar la estadística de tus links totales y tus links unicos más los links rotos:

```
npx xsamynox-md-links nombredetuarchivo.md --stats --validate
npx xsamynox-md-links nombredetuarchivo.md --s --v

npx xsamynox-md-links ./ (Directorio actual) --stats --validate
npx xsamynox-md-links ./ (Directorio actual) --s --v
```

## 5. Herramientas y Librerias Utilizadas 🛠️

En éste proyecto fueron utilizadas varias herramientas y librerias para llegar al resultado del producto entregado.
Las herramientas usadas fueron:

* [Creately.](https://app.creately.com/diagram/yKVuqoX0LcV/edit) – Para el flujo de la libreria.
* [Trello](https://trello.com/b/SlpQ5I8n/md-links-%F0%9F%94%97) – Para la planificación.
* [Git y GitHub](https://github.com/xsamynox/SCL014-md-links) – Para guardar las versiones de trabajo.
* [Node](https://nodejs.org/es) – Para el entorno de ejecución de JavaScript.
* [Markdown-it](https://github.com/markdown-it/markdown-it) – Para pasar el archivo .md a HTML.
* [JSDOM](https://github.com/jsdom/jsdom) – Para crear un dom que se encargue de buscar las etiquetas '<a>'.
* [Fetch](https://www.npmjs.com/package/fetch) – Para extraer el contenido de los links/urls.

## 6. Autor ✒️

* **Samantha Moreno** [GitHub](https://github.com/xsamynox) :octocat: - Front-end Developer
