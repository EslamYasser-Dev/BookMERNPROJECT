import  express from "express";
import { PORT } from "./config.js";

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