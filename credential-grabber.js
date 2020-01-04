const express = require('express');
const httpUtils = require('./lib/http-utils');

async function main() {
    let site = process.argv[2];

    let app = express();
    app.set('view engine', 'html');

    let pageContent = await httpUtils.getPageContents(site);

    pageContent = httpUtils.replaceLocalLinksWithOrigin(pageContent, httpUtils.extractDomainFromURL(site));

    //pageContent = httpUtils.stripScripts(pageContent.split("\n"));

    // TODO: Generate smart payloads
    // let payload = '<script>document.getElementById("next").addEventListener("click", function(){console.log("test");});</script>';
    // pageContent = httpUtils.injectScript(pageContent, payload);

    app.get('/', function(req, res) {
        res.send(pageContent);
    });

    app.listen(8080);
}

main();