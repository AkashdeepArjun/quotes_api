const mysql = require("mysql2");

// const db = mysql.createConnection({
//     ur
//     host:process.env.DB_HOST,
//     user:process.env.DB_USER,
//     password:process.env.DB_PASSWORD,
//     database:process.env.DB_DATABASE,
//     port:process.env.DB_PORT,
//     ssl:{
//         rejectUnauthorized: false
//     }
// });
//
    const db = mysql.createConnection(process.env.DB_URL);

db.connect(err=>{

    if(err){

        console.log("DATABASE CONNECTION FAILED!!");

    }else{
        console.log("DATABASE CONNECTION SUCCESSFUL");
    }
});


module.exports = db;


