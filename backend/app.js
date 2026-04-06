const express = require ('express');
const thoughtModel= require('./src/model/thoughtModel')
const app = express();
const cors = require("cors")

app.use(cors())

app.use(express.json())

app.get("/",(req,res) =>{
    res.send("Hello sir")
})
const description = [];

app.post("/thought", async (req,res) =>{
    const data=req.body
    description.push(data)
    const {name, thought}=req.body;
   const thoughtCreated = await thoughtModel.create({ name, thought });
    res.send({
        message: "We recieved your thought",
        thoughtCreated
        
    })
    
})
app.get("/thought", async (req,res)=>{
    // console.log(description)
    const allThoughts= await thoughtModel.find();
    res.json({
        message:"Let me show you all thoughts",
        allThoughts
    })
})
app.delete("/thought/:id", async (req,res)=>{
    const id = req.params.id;
    console.log(id)
    const deleteThought= await thoughtModel.findByIdAndDelete(id)
    res.json({
        message:"deleted",
        deleteThought
    })
})

app.patch("/thought/:id",async (req,res)=>{
    const id = req.params.id
    
    const{thought} = req.body
    console.log(thought)
     const edit = await thoughtModel.findByIdAndUpdate(id,{thought})
     res.json({
        message : "updated"
     })
})

module.exports = app;