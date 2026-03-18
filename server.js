const db= require("./config/db");

const authRoutes = require("./routes/authRoutes")
const quoteRoutes = require ("./routes/quoteRoutes");
const express = require("express");
const cors = require("cors");

const rate_limit = require('express-rate-limit');


const auth_limiter  = rate_limit({

    windowMs:15*60*1000,
    max:10,
    message:' too many requests please try again later'

});


const api_limiter = rate_limit({

    windowMs:15*60*1000,
    max:12,
    message:'too many CRUD CALLS please try again later'


})






require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api",api_limiter);

app.use("/api/auth",auth_limiter);


app.use("/api/auth",authRoutes);

app.use("/api/quotes",quoteRoutes);

app.get("/",(req,res)=>{
    res.send("QUOTES API IN ACTION");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`SERVER RUNNNING ON PORT ${PORT}`);
});



