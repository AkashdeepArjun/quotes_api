const db = require("../config/db");

exports.addQuote = (req,res) =>{

    console.log(" REQUEST BODY IS ", req.body);

    const {quote} = req.body;



    const user_id = req.user.id;

    const query = "INSERT INTO quotes (user_id,quote) VALUES (?,?)";

    db.query(query,[user_id,quote],(err,rslt)=>{

        if(err){
            return res.status(500).json({error:err});
        }
        res.json({message:"Quote created",id:rslt.insertId});

    })

}

exports.getQuotes = (req,res) =>{

    const dataset_size_query = "SELECT COUNT(*) as total  FROM quotes";

    let dataset_size=0;

    console.log("REQUEST QUERY IS ",req.query);

    const url_search  = req.query.search;

    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 10;

    const sortBy = req.query.sortBy || "created_at";

    const order = req.query.order || "DESC";

    const startDate= req.query.startDate;

    const endDate = req.query.endDate;


    // console.log(" START DATE FOUND :",startDate ," END DATE FOUND :",endDate);

    const offset = (page -1 ) * limit;

    var q = `SELECT * From quotes  ORDER BY ${sortBy} ${order}  LIMIT ? OFFSET ? `;


    if(startDate && endDate){

    
    q = `SELECT * From quotes  WHERE DATE(created_at) BETWEEN '${startDate}' AND '${endDate}' ORDER BY ${sortBy} ${order}   LIMIT ? OFFSET ? `;


    }



    var v = [limit,offset];


    if(url_search){

        q=`SELECT * from quotes WHERE quote LIKE ?  ORDER BY ${sortBy} ${order}  LIMIT ? OFFSET ? `;

        if(startDate && endDate){


        q=`SELECT * from quotes WHERE  quote LIKE ?  AND  DATE(created_at) BETWEEN '${startDate}' AND '${endDate}'  ORDER BY ${sortBy} ${order}  LIMIT ? OFFSET ? `;
        



        }


        
        v=[`%${url_search}%`,limit,offset];

    }

    console.log("SEARCH PARAM  VALUE ",url_search);


    db.query(dataset_size_query,[],(err,result)=>{

        console.log("TOTAL SIZE IS ",result[0].total);
        dataset_size =result[0].total;


    });

    db.query(q,v,(err,rslt) => {

        if(err){
         
            return res.status(500).json({error:err});
        }

        // console.log(" total DATA FOUND ",rslt);
        res.json({data:rslt,dataset_size:dataset_size});



    })

}

exports.deleteQuote = (req,res) => {

    const quote_id  = req.params.id;
    const user_id = req.user.id ;

    const q = "DELETE FROM quotes where user_id = ? AND id = ?";

    db.query(q,[user_id,quote_id],(err,result)=>{

        if(err){
            return res.status(500).json({error:err});
        }
        if(result.affectedRows===0){
            return res.status(403).json({message:"Access denied"});
        }

        res.json({message:"Quote deleted"});



    });






}

exports.updateQuote =(req,res) => {


    const quote_id = req.params.id;
    const { quote } = req.body;
    const user_id = req.user.id;

    const query = "UPDATE quotes SET quote = ?  WHERE  id = ? AND user_id = ?";

    db.query(query,[quote, quote_id,user_id],(err,rslt)=>{

        if(err){
            return res.status(500).json({error:err});
        }
        
        if(rslt.affectedRows===0){
            return res.status(403).json({error:"not authorized "});
        }
        res.json({message:"Quote updated"});


    })








}




