var API = require('common-api').API;

var WolframAlpha = function(appid) {
    this.appid = appid;
};

WolframAlpha.prototype = new API({
    hostname: 'api.wolframalpha.com',
    format:   API.FORMAT.XML,
    base:     '/v2/',
    root:     ['queryresult'],
    urlTransform: function(url) {
        if (this.appid) {
            return url + "&appid=" + this.appid;
        } else {
            return url;
        }
    }
});

WolframAlpha.prototype.query = function(input) {
    return this.call('query', {
        input: input
    }).then(function(result) {
        return result.queryresult;
    });
};

exports.WolframAlpha = WolframAlpha;

