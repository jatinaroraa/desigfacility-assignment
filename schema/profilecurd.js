const express = require('express');
const app = express();
const mongoose =require('mongoose');

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    urltwitter:{
        type:String,
        required:true
    },
    urlgithub:{
        type:String,
        required:true
    }

})

const profilecurd = mongoose.model('profilecurd',schema);

module.exports=profilecurd;