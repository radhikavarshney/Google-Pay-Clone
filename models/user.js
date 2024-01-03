const mongoose=require("mongoose");
const transactionSchema=require("./transaction.js")
const userSchema=new mongoose.Schema({
    phoneNum:{
        type:Number,
        require:true,
        unique:true,
    },

    initialAmount:{
        type:Number,
        required:true,
        default:0
    },

    transactions:[transactionSchema]
},{timestamps:true}
);

module.exports= mongoose.model("User",userSchema);