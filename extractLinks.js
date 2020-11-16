const md = require('markdown-it')();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = (extractLinks, content) => {
    // Pasar mi archivo .md a html
    let fileMd = md.render(content);
    console.log(content)
    // Crea un dom con el archivo html
    const dom = new JSDOM(fileMd);
    const links = dom.window.document.querySelectorAll("a");
    // Creo un array desde el nodeList
    var linksArray = Array.from(links);
    // console.log(linksArray);
    let linksInArray = [];
    let detailsLinks = {};
    linksArray.forEach((link) => {
        detailsLinks = {
            href: link.href,
            text: link.text,
            file: pathFile,
        }
        const aboutBlank = 'about:blank';
        const regularExpression = new RegExp(aboutBlank, 'gi');
        if (!regularExpression.exec(link.href)) {
            linksInArray.push(detailsLinks);
        }
    })
    linksInArray = Array.from(new Set(linksInArray));
    console.log(linksInArray)
    return linksInArray;
}