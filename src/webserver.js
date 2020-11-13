const path = require("path")
const express = require("express")
const stocktwits = require("./stocktwits")
const proxy = require("./proxy")
const  handlebars  = require("hbs")

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

webapp.use(express.static(abs_publicpath)) // setting up the static directory
webapp.listen(port || 3000, () => { console.log("Server Started") })




webapp.get('/symbol2/*', (req, res) => {
    const { proxyip, proxyport } = proxy.getproxy(undefined);

    stocktwits.fetchstocktwits(req.query.q, proxyip, proxyport, (error, data) => {
        console.log(req.query.q, proxyip, proxyport)
        console.log(data)
        console.log(error)
        mes = []
        data.messages.forEach((m) => {
            if (m.body !== undefined)
                mes.push(m.body)
        })
       
        console.log("Writing to the browser")
        res.render("index", { symbol: data.symbol.symbol, comments:mes })

    })
})

webapp.get("/symbol/*", (req, res) => {
    const { proxyip, proxyport } = proxy.getproxy(undefined);

    stocktwits.fetchstocktwits(req.query.q, proxyip, proxyport, (error, data) => {
        console.log(req.query.q, proxyip, proxyport)
        console.log(data)
        console.log(error)
        if (error) {
            res.send({ "error": error})
        }
        else
        {
            res.send(data)
        }
        
    })
})

