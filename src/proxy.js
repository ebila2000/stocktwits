const getproxy = (type) => {

    proxyobj = { proxyip: "0.0.0.0", proxyport: "0"}

    if (type === undefined)
    {
        proxyobj = {
            proxyip : "0.0.0.0", proxyport: "0"
        }

        
    }
    else {
        proxyobj = {
            proxyip : "37.48.118.4", proxyport: "13041"
        }
    }

    console.log(proxyobj)
    return proxyobj;
}

module.exports = {getproxy:getproxy }