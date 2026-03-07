const mysql = require("mysql2");

const db = mysql.createConnection({
    host:"localhost",
    user:"akash",
    password:"akash@mysql",
    database:"quotes_app"
});

db.connect(err=>{

    if(err){

        console.log("DATABASE CONNECTION FAILED!!");

    }else{
        console.log("DATABASE CONNECTION SUCCESSFUL");
    }
});


module.exports = db;


