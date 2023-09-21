import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();

// //get method takes callbak (http route is /)
// app.get('/',(requset, response)=>{
//     console.log(requset);
//     return response.status(234).send("hello");
// });

//middleware for parsing requset body
app.use(express.json());

//===================================================================
//middleware to handle cors policy
//To allow all origins with defualt of cors
// app.use(cors());

//allow custom origins 
app.use(cors({
    origin:'http://localhost:3000',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['content-type'],
})
);
//==================================================================
//port
app.listen(PORT, () => {
    console.log(`App listening to port: ${PORT}`);
});

//mongo DB conncetion
mongoose.connect(mongoDBURL).then(() => {
    console.log("database connection success");
})
    .catch((error) => {
        console.log(error);
    });
app.use('/books', booksRoute);

//route to add new book(send data to mongo DB)


