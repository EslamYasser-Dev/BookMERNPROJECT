import  express from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

//get method takes callbak (http route is /)
app.get('/',(requset, response)=>{
    console.log(requset);
    return response.status(234).send("hello");
});

//port
app.listen(PORT,()=>{
    console.log(`App listening to port: ${PORT}`);
});

//mongo DB conncetion
mongoose.connect(mongoDBURL).then(()=>{
    console.log("database connection success");
})
.catch((error)=>{
    console.log(error);
});