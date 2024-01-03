const express= require ("express");
const mongoose= require("mongoose");
const dotenv=require("dotenv");

const app=express();

//routes
const userRoute=require("./routes/users.js");
const transferRoute=require("./routes/transfer.js")

dotenv.config();
const PORT= process.env.PORT

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("MongoDB says HI!!");
}).catch((e)=>{
    console.log(e);
});

app.use(express.json());

app.use("/api/user",userRoute);
app.use("/api/transfer",transferRoute);

app.listen(PORT,()=>{
    console.log(`Backend is running on ${PORT}`);
})