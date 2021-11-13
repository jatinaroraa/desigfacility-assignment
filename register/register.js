const { json } = require('express');
const express =  require('express');
const user = require('../schema/userdata');
const router = express.Router();
const usercurd = require('../schema/usercurd');
const profilecurd = require('../schema/profilecurd');
// const user = require('../schema/userdata');
const citycurd = require('../schema/citycurd');

// router.get('/register',(req,res)=>{
//     console.log('hello from register');
//     res.send('hello from register');
// })


router.post('/register',async (req,res)=>{
    const {email,name,password}=req.body;
   
    
    const exist = await user.findOne({email:email})
    if(exist)
    return res.json({status:"404"})

    else if(!email ||!name||!password)
     return res.json({status:'404',messege:'please fill all feilds properly'})

     else{
         const data = await new user({email:email,name:name,password:password});
         await data.save();
        return res.json({mess:"received",status:"200"}) 
     }
     

})

router.post('/verify',(req,res)=>{
    const {id}=req.body;
    user.findById(id).then((data)=>{
        return res.json({mess:"id verified ",
    data})
    }).catch((e)=>{
        console.log(e);
        return res.json({mess:"not found "})
    })

})
router.post('/login',(req,res)=>{
    const {email,password}=req.body;
    const exist= user.findOne(email);
    if(!exist)
    return res.json({messege:'mail id not registerd',status:'400'})

    else if(!email|| !password)
    return res.json({messege:'plese fill it properly'})

    // console.log(exist);
    user.find(email).then((u)=>{
        console.log(u)
    }).catch((e)=>{
        console.log(e);
    })
    res.json({mess:'done'})

})

// usercurd 
// exports.userlist = (req,res)=>{

// }
router.post('/users',async (req,res)=>{
    const {email,name,password,role,phone,city,country}=req.body;
  
    
    const exist = await usercurd.findOne({email:email})
    if(exist)
    return res.json({status:"404"})

    else if(!email ||!name||!password||!role || !phone || !city || !country)
     return res.json({status:'404',messege:'please fill all feilds properly'})

     else{
         const data = await new usercurd({email:email,name:name,password:password,role:role,phone:phone,city:city,country:country});
         await data.save();
        return res.json({mess:"received",status:"200"}) 
     }
})
router.delete('/users/:id',(req,res)=>{
    const id=  req.params.id;
    console.log(id);
  
    usercurd.findByIdAndDelete(id).then((data)=>{
        if(!data)
        return res.json({messege:"wrong id"})
        else 
        return res.json({messege:"deleted sucessfully"})
    }).catch((e)=>{
        console.log(e);
    })
  })
  router.get('/users/:id',(req,res)=>{
      const id = req.params.id;
      usercurd.findById(id).then((data)=>{
          if(data)
          return res.json({messege:data});
          else
          return res.json({mess:"no data found"})
      })
  })


//   profilecurddata

router.post('/profile',async (req,res)=>{
    const {name,phone,city,country,urltwitter,urlgithub}=req.body;
  
    
    const exist = await profilecurd.findOne({email:email})
    if(exist)
    return res.json({status:"404"})

    else if( !name || !phone || !city || !country||!urltwitter||!urlgithub)
     return res.json({status:'404',messege:'please fill all feilds properly'})

     else{
         const data = await new profilecurd({email:email,name:name,password:password,role:role,phone:phone,city:city,country:country});
         await data.save();
        return res.json({mess:"received",status:"200"}).send('registerd sucessfully')
     }

})
router.patch('/profile',async (req,res)=>{
    const {name,phone,city,country,urltwitter,urlgithub}=req.body;
    profilecurd.find(phone).then((data)=>{
        console.log(data.id)
    })
})

router.post('/profile/changepassword',async (req,res)=>{
    const {oldpassword,newpassword}=req.body;
    if(!oldpassword||!newpassword)
        return res.json({messege:"please fill properly"})

    return res.json({messege:"password updated"});
})


// citycurddata operations

router.post('/cities',async (req,res)=>{
    const {city}=req.body;

    const data = new citycurd({city:city});
    await data.save();
    return res.json({messege:"data saved"})
})

router.get('/cities/:id',async (req,res)=>{
    const id= req.params.id;
  const ct = await citycurd.findById(id).then((data)=>{
        
        return data;

        
    }).catch((e)=>{
        console.log(e);
    })
    if(ct)
    return res.json({ct})

    else return res.json({mess:"not found"})
})

router.patch('/cities/:id',async (req,res)=>{
    const id = req.params.id;
    const {city}=req.body;
    citycurd.findByIdAndUpdate(id,{city:city}).then((data)=>{
        if(data)
        {
        return res.jsonp({mess:"updated city"})
        }
    }).catch((e)=>{
        console.log(e);
        return res.json({mess:"data not found"})
    })
})
router.delete('/cities/:id',async (req,res)=>{

    const id = req.params.id;
    citycurd.findByIdAndDelete(id).then((data)=>{
        return res.json({mess:"deleted"});
    }).catch((e)=>{
        return res.json({mess:"not found"})
    })
})
router.get('/cities/all',async (req,res)=>{

    citycurd.find({}).then((data)=>{
        if(data)
        return res.json({mess:data});

    }).catch((e)=>{
        console.log(e);
    })
})


module.exports = router;