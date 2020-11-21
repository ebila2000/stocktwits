const path = require("path")
const express = require("express")
const stocktwits = require("./stocktwits")
const proxy = require("./proxy")
const  handlebars  = require("hbs")
const mongodb = require("mongodb")


// point express to the public variable

const abs_publicpath = path.join(__dirname, "../public")
const views_path = path.join(__dirname, "../views")
const partials_path = path.join(__dirname, "../partials")
const port = process.env.PORT
const webapp = express()

//webapp.engine('hbs', handlebars.engine);
webapp.set('view engine', 'hbs') // to add the handlebars to to the custom directory
webapp.set('views',views_path)
handlebars.registerPartials(partials_path)
webapp.use(express.static(abs_publicpath)) // setting up the static directory or otherwise the webserver cannot render the contents of it
webapp.listen(port || 3000, () => { console.log("Server Started") })




webapp.get('', (req, res)=> {
    console.log('index page');
    
    const { proxyip, proxyport } = proxy.getproxy(undefined);

    
    res.render("index", {symbol: "", comments:[]});
})




/*webapp.get('/search?symbol=*&user=*', (req, res) => {
    const { proxyip, proxyport } = proxy.getproxy(undefined);

    stocktwits.fetchstocktwits(req.query.q, proxyip, proxyport, (error, data) => {
        console.log(req.query.q, proxyip, proxyport)
        console.log(data)
        console.log(error)
        
       
        console.log("Writing to the browser " + data)
        res.render("index", data)//{ symbol: data.symbol.symbol, comments:mes })

    })
})*/


webapp.get('/symbol/:symbol?', (req, res) => {
    console.log("Symbol search")
    const { proxyip, proxyport } = proxy.getproxy(undefined);
    console.log(req.params.symbol,  proxyip, proxyport)
    stocktwits.fetchstocktwitsbysymbol(req.params.symbol, proxyip, proxyport, (error, data) => {
       
        console.log(data)
        console.log(error)
        
       
        console.log("Writing to the browser " + data)
        res.render("index", {data:JSON.stringify(data)})//{ symbol: data.symbol.symbol, comments:mes })

    })
})


webapp.get('/user/:user?', (req, res) => {
    console.log("User search")
    const { proxyip, proxyport } = proxy.getproxy(undefined);
    console.log(req.params.symbol,  proxyip, proxyport)
    stocktwits.fetchstocktwitsbyuser(req.params.user, proxyip, proxyport, (error, data) => {
       
        console.log(data)
        console.log(error)
        
       
        console.log("Writing to the browser " + data)
        res.render("index", {data:JSON.stringify(data)})//{ symbol: data.symbol.symbol, comments:mes })

    })
})

