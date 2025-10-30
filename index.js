const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port=process.env.PORT||3000
const app=express();
// MongoDb Url 
const uri = "mongodb+srv://SmartDeals:a8eBcA7RjB7EuBy5@aiclusters1.5l6vxb7.mongodb.net/?appName=AIClusters1";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
// MiddleWare
app.use(cors())
app.use(express.json())
// Main section
app.get('/',(req,res)=>{
    res.send('This Server is initilized')
})

async function run() {
    try{
        await client.connect();
        const Smartdb=client.db("SmartDealsDB")
        const ProductsCollections=Smartdb.collection("Products")

        // Create Method
        app.post('/products',async(req,res)=>{
            const newProduct=req.body;
            const result=await ProductsCollections.insertOne(newProduct)
            res.send(result)
        })
        // Delete Method
        app.delete('/products/:id',async(req,res)=>{
            const id=req.params.id;
        })

        // await client.db('admin').command({ping:1})
          await client.db("admin").command({ ping: 1 });
          console.log("Pinged your Database sucessfuly")
    }finally{

    }
    
}

run()

// Listener
app.listen(port,()=>{
    console.log(`This server is running of port ${port}`)
})


// MOgo db user name and pass
// user: SmartDeals
// pass: a8eBcA7RjB7EuBy5