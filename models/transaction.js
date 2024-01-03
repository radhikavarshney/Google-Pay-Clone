const mongoose= require("mongoose");

const transactionSchema= new mongoose.Schema({
    from:String,
    to:String,
    amount:Number,
    cashbacked:{
        type:Number,
        default:0
    },
    timestamp:{type:Date, default:Date.now}
});

module.exports=transactionSchema;