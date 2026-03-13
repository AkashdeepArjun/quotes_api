const express = require("express");
const router =  express.Router();
const {addQuote,getQuotes,deleteQuote,updateQuote} = require("../controllers/quoteController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/",verifyToken,addQuote);
router.get("/",verifyToken,getQuotes);
router.delete("/:id",verifyToken,deleteQuote);
router.put("/:id",verifyToken,updateQuote);
module.exports = router;

