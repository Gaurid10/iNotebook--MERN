const express = require('express');
const User = require('../models/User')
const router = express.Router();
const {body , validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Harryisgoodb$y";


//ROUTE 1  :create a user using:POST "/api/bc//createuser" not required auth
router.post('/create' , [
    body('name' , 'Enter a valid name').isLength({min: 3}),
    body('email' , 'Enter a valid email').isEmail(),
    body('password' , 'Password must be atlest 5 characters').isLength({min: 5}),
], async (req,res) =>{
  let success = false;

    //if there are errrors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    
    //check whether the user with same email exists already

    try{
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({success ,error: "Sorry a user with this email already exists"})
    }
    
    const salt = await bcrypt.genSalt(10);;
    const secPass = await bcrypt.hash(req.body.password , salt);

    //create user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
    });
    
    const data = {
      user:{
        id:user.id
      }
    }
    const autotoken = jwt.sign(data, JWT_SECRET);
    //res.json(user)
    success = true;
    res.json({success , autotoken})
    
    //res.json(user)
    } catch(error){
      console.error(error.message);
      res.status(500).send("Internet Server Error");
    }
})

//*** */ ROUTE 2  : Authentic a user using:POST "/api/abc/create" no login required'
router.post('/login1' , [
  body('email' , 'Enter a valid email').isEmail(),
  body('password' , 'Password cannot be blank').exists(),

], async (req,res) =>{
 let success = false;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const {email , password} = req.body;
  try{
    let user = await User.findOne({email});
    if(!user){
      success = false
      return res.status(400).json({error:"Plase try to login with correct Credentials"});
    }
    
    const passwordCompare  = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      success = false
      return res.status(400).json({success ,error:"Plase try to login with correct Credentials"});
    }

    const data = {
      user:{
        id: user.id
      }
    }

    const authtoken =  jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success ,authtoken})

  }catch (error){

    console.error(error.message);
    res.status(500).send("Internet Server Error");
  }
  

});

// ROUTE 3  : Get Loggedin user details using: POST"/api/auth/getuser" Login required
router.post('/getuser' ,fetchuser , async (req,res) =>{
   
try{
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)

}catch (error){
  
  console.error(error.message);
  res.status(500).send("Internet Server Error");
}

});

module.exports = router