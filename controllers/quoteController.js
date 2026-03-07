const db = require("../config/db");

exports.addQuote = (req,res) =>{

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

    const q = "SELECT * From quotes ";

    db.query(q,(err,rslt) => {

        if(err){
         
            return res.status(500).json({error:err});
        }

        res.json(rslt);



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




