const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



exports.registerUser = async ( req,res) =>{
    
    try {
        
        const { username, email, password }  = req.body;

        console.log( req.body);

        if(!username || !email || !password){

            return res.status(400).json({message:" All fields required "});



        }
            const hashed_password = await bcrypt.hash(password,10);
            
        const  query = " INSERT INTO users (username,email,password) VALUES (? ,? ,?) ";

        db.query(query,[username,email,hashed_password],(err,result)=>{

            if(err){
               return  res.status(500).json({error:err});
            }

            res.json({message:"user registeration success "});



        });



    } catch (error) {

        res.status(500).json({error_aaya:error.message});
        
    }










}


exports.loginUser= (req,res)=>{

    const { email,password} = req.body;

    const query = "SELECT * FROM users WHERE email = ?";

    db.query(query,[email],async(err,rslt)=>{

        if(err){
            return res.status(500).json({error:err});
        }

        if(rslt.length==0){
            return res.status(400).json({error:"no Such User found"});
        }

        const user = rslt[0];

        const isValidPassword = await bcrypt.compare(password,user.password);

        if(!isValidPassword){
            return res.status(401).json({error:"invalid credentials"});
        }
        
        const token = jwt.sign({id:user.id,email:user.email},"keyUser",{expiresIn:"1h"});

        res.json({message:"Login success",token:token})



    });




}



