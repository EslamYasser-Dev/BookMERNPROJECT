import mongoose, { Mongoose } from "mongoose";

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: Number,
    required: true,
  },
  publishYear: { 
    type: String, 
    required: true 
    },
},{timeStamps:true}
);

export const Book = mongoose.model("Cat", bookSchema);
