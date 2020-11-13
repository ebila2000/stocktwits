const proxy = require("./proxy.js");
const stocktwits = require("./stocktwits.js");


const { proxyip, proxyport } = proxy.getproxy("stocktwits");
const res = stocktwits.fetchstocktwits("MSFT", proxyip, proxyport, (err, res) =>
    {
        if (err) {
            console.log("Error: " + err)
        }
        else {
            console.log(res)
        }
    })
