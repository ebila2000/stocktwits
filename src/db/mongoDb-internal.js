const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient
const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "stocksdb"







const InsertStockTwitsBySymbol = (webresult)=> {

    
    MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology:true}, (error, client)=>{
        if (error)
        {
            return console.log("Cannot connect to the " + databaseName + ". Connection failed.")
        }

        console.log("Connected to the db")
        console.log(webresult)


        const db = client.db(databaseName) // if it does not exist, it will create it
       

        if (webresult.data.response.status !== 200)
        {
               //~ error 

        }

        // insert if the symbol does not exist
        result = webresult.data.symbol
        keysymboldata = {symbol : result.symbol}
        symboldata = {
            name : result.title,
            watchlistcount : result.watchlist_count,
            stocktwitid : result.id,
            last_checked: Date.now(),
        }

        db.collection("st_symbols").updateOne(keysymboldata, {$set: symboldata}, {upsert : true}).then(resolve => 
        {
            console.log("Symbol Successfully Updated " + resolve)

            // Look into the messages section
            messages = webresult.data.messages 
            if (messages === undefined || messages.length === 0)
                return console.log("No Messages found for " + result.symbol)
            else
                console.log("Found " + messages.length)
    
           
            messages.forEach((message)=>{
                    // insert the user if does not exists
                    keyuserdata = { id : message.user.id, }
                    userdata = {
                        
                        username : message.user.username,
                        name : message.user.name,
                        join_date: message.user.join_date,
                        followers: message.user.followers,
                        following: message.user.following,
                        ideas: message.user.ideas,
                        watchlist_stocks_count: message.user.watchlist_stocks_count,
                        like_count: message.user.like_count
                    }
                    db.collection("st_users").updateOne(keyuserdata, {$set: userdata}, {upsert : true}).then(resolve => 
                    {
                        console.log("User successfully inserted / Updated " + resolve)

                         // insert the message
                         keymessagedata = {
                             id : message.id,
                             symbol: result.symbol,
                         }
                         messagedata = {
                             userid: message.user.id,
                             symbols : message.symbols.map((sym)=> { return sym.symbol}),
                             body:message.body,
                             created: message.created_at,
                             mentioned_users: message.mentioned_users.map((usr)=>{return usr.id}),
                             sentiment:message.entities.sentiment.basic

                         }

                         db.collection("st_comments").updateOne(keymessagedata, {$set: messagedata}, {upsert : true}).then(resolve => 
                            {
                                return console.log("Successfully inserted comment " + message.id + " for " + result.symbol)
                            }).catch(err=> {
                                return console.log("Failed to insert comment " + message.id +  " for " + result.symbol)
                            })

                    } 
                    ).catch(err => {
                        return console.log("Failed to insert user " + message.user.name + "Error:" + err)
                    })
    
                   
            })
    
           


        } 
        ).catch(err => {
            return console.log("Failed to insert symbol " + result.symbol)
        })

        
        



       

    })
}


module.exports = 
{
    InsertStockTwitsBySymbol : InsertStockTwitsBySymbol,
}