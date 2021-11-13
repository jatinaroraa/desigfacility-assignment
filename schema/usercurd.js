const express = require('express');
const app = express();
const mongoose =require('mongoose');
// const { schema } = require('./userdata');

const Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true

    },
    role:{
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
    }

})

const usercurd =  mongoose.model('usercurd',Schema);

module.exports = usercurd;