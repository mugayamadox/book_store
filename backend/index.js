import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js";
const app = express();

app.use(express.json());

//define default route
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to MERN stack");
});

//create route for adding a book
app.post( '/book', async (request, response)=>{
    try{
        if( !request.body.title||
            !request.body.author||
            !request.body.publishYear
        ){
            return response.status(400).send({message: 'Add the title, author and publishYear',});

        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };

        const book = await Book.create(newBook);

        return response.status(200).send(book);
    }
    catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
});

//create route for fetching books in the database
app.get( '/book', async (request, response)=>{
  try{
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data:books});

  }catch(error){
    console.log(error.message);
    response.status(500).send({message: error.message})
  }

});

//connect to database
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("successfully connected to database");
    app.listen(PORT, () => {
      console.log(`listening at ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
