const express =  require('express');
const { route } = require('./register/register');
const app = express();
app.use(express.json());
const port = 3000;
const router = require('./register/register')
app.use(router);
app.use(require('./schema/userdata'))
app.use(require('./schema/usercurd'));
app.use(require('./schema/citycurd'));
const mongoose = require('mongoose');
const DB='mongodb+srv://newproj:newproj@cluster0.wcmos.mongodb.net/userdata?retryWrites=true&w=majority';

mongoose.connect(DB).then(()=>{
    console.log('database connect');
}).catch((e)=>{
    console.log(e);
})

app.get('/',(req,res)=>{
    res.send('hello from server')
})


app.listen(port,()=>{
    console.log('serving on port 3000')
})
