const mongoose = require("mongoose")

const thoughtSchema = new mongoose.Schema({
    name:{
        type:"String",
        require:"true"
    },
    thought:{
        type:"string",
        require:"true"
    }
})

const thoughtModel = mongoose.model("thoughts", thoughtSchema)

module.exports = thoughtModel;