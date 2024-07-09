const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const UserRoute = require('./Route/UserRoute');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth', UserRoute)
app.get('/', (req, res)=>{
    res.send("Hello FoodPlanet");
});

const uri = process.env.MONGO_URL;
mongoose.connect(uri, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("Mongoose connected successfully");
}).catch(()=>{
    console.log("No connection with mongoose");
});


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const server = async() =>{
    try {
        await client.connect();
        const db = await client.db('FoodPlanet');
        const Foods = await db.collection('foods');
    
        app.get('/foods', async(req, res) =>{
            const result = await Foods.find().toArray();
            res.send(result);
        }); 

        app.listen( process.env.PORT | 4000, (()=>{
            console.log("FoodPlanet server is running!");
        }));
         
    } finally {
    
    }
};
server();  
