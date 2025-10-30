const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const BidsCollections=Smartdb.collection('Bids')
        // Create Method
        app.post('/products',async(req,res)=>{
            const newProduct=req.body;
            const result=await ProductsCollections.insertOne(newProduct)
            res.send(result)
        })
        //Create a bids
         app.post('/bids',async(req,res)=>{
            const newBid=req.body;
           const result=await BidsCollections.insertOne(newBid);
           res.send(result)
         })
        // Get Products section
        app.get('/products',async(req,res)=>{
            // const cursor=ProductsCollections.find().sort({price_min:-1});    
            const Email=req.query.email;
            const quary={};
            if(Email){
                quary.email=Email
            }


            const cursor=ProductsCollections.find(quary);
            const result=await cursor.toArray()
            res.send(result)
        })
        // get Bids details

        app.get('/bids',async(req,res)=>{
            const email=req.query.email;
            const quary={}
            if(email){
                quary.buyer_email=email;
            }
            const cursor=BidsCollections.find(quary);
            const result=await cursor.toArray()
            res.send(result)
        })
        // get single Products via id
        app.get("/products/:id",async(req,res)=>{
            const id= req.params.id;
            const quary={_id:new ObjectId(id)}
            const result=await ProductsCollections.findOne(quary)
            res.send(result)
        })
        // get single Bids via id
        app.get('/bids/:id',async(req,res)=>{
            const id=req.params.id;
            const quary={_id:new ObjectId(id)}
            const result=await BidsCollections.findOne(quary)
            res.send(result)
        })
        // Upadate function here
        app.patch('/products/:id',async(req,res)=>{
            const id=req.params.id;
            const quary={_id:new ObjectId(id)}
            const updatedProduct=req.body;
            const update={
                $set:{
                   name: updatedProduct.name,
                   price:updatedProduct.price

                }
            }
            const result= await ProductsCollections.updateOne(quary,update)
            res.send(result)

        })
        // Delete Method
        app.delete('/products/:id',async(req,res)=>{
            const id=req.params.id;
            const quary={_id:new ObjectId(id)}
            const result=await ProductsCollections.deleteOne(quary)
            res.send(result)
        })
        //Delete a bids
        app.delete('/bids/:id',(req,res)=>{
            const id=req.params.id;
            const quary={_id:new ObjectId(id)}
            const result=BidsCollections.deleteOne(quary)
             res.send(result)
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