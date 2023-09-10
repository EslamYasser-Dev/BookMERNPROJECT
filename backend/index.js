import  express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();
app.use(express.json());

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

//route to add new book(send data to mongo DB)
app.post('/books', async (requset,response)=>{
    try {
        //ensure that all fields are not null
        if(!requset.body.title||!requset.body.author||!requset.body.publishYear){
            return response.status(400).send({
                message:'Send all required info fields: Title, Auther and Publish Year',
            });
        }
        //save the data in an Object 
        const newBook = {
            title: requset.body.title,
            author: requset.body.author,
            publishYear:requset.body.publishYear
        }

        //save the data(newBook) in a variable called book from Book type 
        const book = await Book.create(newBook);

        //send them to mongo
        return response.status(201).send(book);


    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});


//Route to Get All Books from Database(mongo)
app.get('/books', async(request, response)=>{
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count:books.length, //this to return count of books inside object {count:5,data:{....}}
            data:books
        });
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});


//Method to get spicefic book (search)
app.get('/books/:id', async(request, response)=>{
    try {
        const {id} = request.params;

        const book = await Book.findById(id); // we used params here 
        return response.status(200).json(book);
       
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//route to update a book
app.put('/books/:id', async(request, response)=>{
    try {
        if(!requset.body.title||!requset.body.author||!requset.body.publishYear){
            return response.status(400).send({
                message:'Send all required info fields: Title, Auther and Publish Year',
            });
        }
            const {id} = request.params;
            const result =await Book.findByIdAndUpdate(id, request.body);
            if(!result){
                return response.status(404).json({message:'Book not found'})
            }
            return response.status(200).send({message:'Book has been Updated Successfully'})
        }
    catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//Route to Delete a book
app.delete('/books/:id',async(request,response)=>{
    try {
        const {id}= request.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){return response.status(404).send({message:"book is not found"}); 
    }
        return response.status(200).send({message:"Book Deleted Successfully"});
        

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message}); 
    }
});



