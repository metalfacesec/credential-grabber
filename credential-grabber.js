var request = require("request");
var express = require('express');
var app = express();
const cheerio = require('cheerio')

request({
  uri: "https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin",
}, function(error, response, body) {
    const $ = cheerio.load(body);
    
    let allInputs = $(':input');
    allInputs.toArray().map(element => {
        console.log($(element).attr('placeholder'));
        console.log("!!!!!!!!!!!");
    });


    app.get('/', function(req, res) {
        res.send(body)
    });

    app.set('view engine', 'html');
    app.listen(8080);
});