import  express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js'

const app = express();

// //get method takes callbak (http route is /)
// app.get('/',(requset, response)=>{
//     console.log(requset);
//     return response.status(234).send("hello");
// });

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
app.use(express.json());
app.use('/books',booksRoute);

//route to add new book(send data to mongo DB)


