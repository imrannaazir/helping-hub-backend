
//import or require 
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// create middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.mokim.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri);


//async function
async function run() {
    try {
        await client.connect();
        const eventCollection = client.db("volunteer").collection("events");
        //get all events api
        app.get('/events', async (req, res) => {
            const query = {};
            const cursor = eventCollection.find(query);
            const events = await cursor.toArray();
            res.send(events)
        })
    }
    finally {

    }
}


//get root 
app.get('/', (req, res) => {
    res.send('Hello dude I am from backend')
})

app.listen(port, () => {
    console.log('your voice is very sweet.');
})


// call the function 
run().catch(console.dir)