const express = require('express');
const app = express();
const mongoose =require('mongoose');

const schema = new mongoose.Schema({
    city:{
        type:String,
        required:true
    }
})

const citycurd = mongoose.model('citycurd',schema);

module.exports=citycurd;