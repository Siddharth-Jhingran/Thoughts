require('dotenv').config();
const app= require('./app')
const mongoose = require("mongoose")

async function connectToDb (){
   await mongoose.connect(process.env.MONGO_URL)
    console.log("connected to DB")
}
connectToDb();

app.listen(3000, () =>{
    console.log("the server is running on port 3000")
});

