var request = require("request");

var HTTPUtils = {
    getPageContents: function (site) {
        return new Promise(function(resolve, reject) {
            request({
                uri: site,
            }, function(error, response, body) {
                resolve(body);
            });
        });
    },
    stripScripts: function (content) {
        let cleanBody = [];
        let skipping = false;
    
        for (let i = 0; i < content.length; i++) {
            if (content[i].includes("<script")) {
                skipping = true;
            }

            if (!skipping) {
                cleanBody.push(content[i]);
            }

            if (content[i].includes("</script")) {
                skipping = false;
            }
        }
        return cleanBody.join("\n");
    },
    injectScript: function (content, payload) {
        let cleanBodyFinalSplit = content.split("</body>");
        cleanBodyFinalSplit[0] += payload;

        return cleanBodyFinalSplit.join('');
    },
    extractDomainFromURL: function(url) {
        return url.split('://')[0] + '://' + url.split("://")[1].split('/')[0];
    },
    replaceLocalLinksWithOrigin: function (html, domain) {
        html = html.split('src="/').join('src="' + domain + '/');
        html = html.split("src='/").join("src='" + domain + '/');
        html = html.split('href="/').join('href="' + domain + '/');
        html = html.split("href='/").join("href='" + domain + '/');

        return html;
    }
}

module.exports = HTTPUtils;