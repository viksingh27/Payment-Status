const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
// const dotEnv = require('dotenv');
const mongo  = require('mongodb');
const mongoCliet = mongo.MongoClient;
// dotEnv.config();
const mongoUrl = process.env.MongoLiveUrl;
var port = process.env.PORT || 8225;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())
var db;

app.get('/api' , (req,res)=>{
    res.send("Hello from server");
})
app.put('/updateStatus/:id',(req,res) => {
    var id = Number(req.params.id);
    var status = req.body.status?req.body.status:"Pending"
        db.collection('orders').updateOne(
            {id:id},
            {
                $set:{
                    "date":req.body.date,
                    "bank_status":req.body.bank_status,
                    "bank":req.body.bank,
                    "status":status
                }
            }
        )
        res.send('data updated')
})



mongoCliet.connect(mongoUrl , (err,client)=>{
    if(err){ 
        console.log("Error while connecting")
    }
    db = client.db('edu_intern');
    app.listen(port,()=>{
        console.log(`Connection Successful to database and listening on port ${port}`);
    });
})
