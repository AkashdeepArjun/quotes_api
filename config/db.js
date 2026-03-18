const mysql = require("mysql2");


    const db = mysql.createConnection(process.env.DB_URL);

db.connect(err=>{

    if(err){

        console.log("DATABASE CONNECTION FAILED!!");

    }else{
        console.log("DATABASE CONNECTION SUCCESSFUL");
    }
});


module.exports = db;


