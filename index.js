const express = require('express');
const cors = require('cors');
const port=process.env.PORT||3000
const app=express();

// MiddleWare
app.use(cors())
// Main section
app.get('/',(req,res)=>{
    res.send('This Server is initilized')
})

// Listener
app.listen(port,()=>{
    console.log(`This server is running of port ${port}`)
})