const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient
const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "stocksdb"

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology:true}, (error, client)=>{
    if (error)
    {
        return console.log("Cannot connect to the " + databaseName + ". Connection failed.")
    }

    console.log("Connected to the db")
    const db = client.db(databaseName) // if it does not exist, it will create it

    db.collection("stocktwit_users").insertOne(
        {
            id:4061710,
            username:"Kenjjj",
            user: "Kenji Moua",
            join_date: "2020-09-10",
            followers:0,
            following:2,
            ideas:148,
            watchlist_stocks_count:22,
            like_count:170
        }, (error, result) =>{
            if (error){
                return console.log("Unable to insert user")
            }
            
            console.log(result.ops)

        }
    )


})