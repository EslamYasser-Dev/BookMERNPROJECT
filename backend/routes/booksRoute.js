import { Book } from "../models/bookModel.js";
import express from 'express';

const router = express.Router();

router.post('/', async (request,response)=>{
    try {
        //ensure that all fields are not null
        if(!request.body.title||!request.body.author||!request.body.publishYear){
            return response.status(400).send({
                message:'Send all required info fields: Title, Auther and Publish Year',
            });
        }
        //save the data in an Object 
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear:request.body.publishYear
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
router.get('/', async(request, response)=>{
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count:books.length, //this to return count of books inside object {count:5,data:{....}}
            data:books,
        });
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});


//Method to get spicefic book (search)
router.get('/:id', async(request, response)=>{
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
router.put('/:id', async(request, response)=>{
    try {
        if(!request.body.title||!request.body.author||!request.body.publishYear){
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
router.delete('/:id',async(request,response)=>{
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

export default router;
