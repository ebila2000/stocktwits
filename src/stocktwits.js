const proxy = require("./proxy.js");
const request = require("postman-request")

const fetchstocktwits =
    (symbol, proxyip, proxyport, callback) =>
    {

        if (proxyip === "0.0.0.0") { reqobj = { url: 'https://api.stocktwits.com/api/2/streams/symbol/' + encodeURIComponent(symbol) + '.json', json: true } }
        else { reqobj = { url: 'https://api.stocktwits.com/api/2/streams/symbol/' + encodeURIComponent(symbol) + '.json', json: true, proxy: `http://${proxyip}:${proxyport}`, }}

        request(reqobj, (err, res) =>
            {
            if (err) {
                callback("Connecting to stocktwits error.", undefined)
            }
            else if (res === undefined) {
                callback("Stocktwits did not return anything.", undefined)
            }
            else if (res.body === undefined || res.body.errors !== undefined)
            {
                if (res.body.errors === undefined) {
                    callback("Stocktwits has empty body.", undefined)
                }
                else
                {
                    callback("Stocktwits returned an error. Status: " + res.body.response.status  + ",  Message:" + res.body.errors[0].message, undefined);
                }
            }
            else if (res.body.messages === undefined || res.body.messages.length === 0 ) {
                callback("Stocktwits has no messages.", undefined)
            }
            else
            {
                callback(undefined, res.body)
            }
            })
    }


module.exports =
    {
        fetchstocktwits : fetchstocktwits
    }
