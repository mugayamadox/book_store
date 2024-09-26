import express from "express";
import {Book} from "../models/bookModel.js";

const router = express.Router();
//create route for adding a book
router.post("/", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response
          .status(400)
          .send({ message: "Add the title, author and publishYear" });
      }
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };
  
      const book = await Book.create(newBook);
  
      return response.status(200).send(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  //create route for fetching books in the database
router.get("/", async (request, response) => {
    try {
      const books = await Book.find({});
      return response.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  //create route for fetching a book by ID in the database
router.get("/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const book = await Book.findById(id);
      return response.status(200).json({ book });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  //update book using id
router.put("/:id", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response
          .status(400)
          .json({ message: "include all required fields!" });
      }
      const { id } = request.params;
      const result = await Book.findByIdAndUpdate(id, request.body);
      if (!result) {
        return response.status(404).json({ message: "Book not found" });
      }
      return response.status(200).json({ message: "Book updated successfuly" });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ mesaage: error.message });
    }
  });
  
  //route to delete book
router.delete('/:id', async (request, response)=>{
    try{ 
      const {id} = request.params;
      const result = await Book.findByIdAndDelete(id);
      if(!result){
        return response.status(404).json({message: "Book not found"});
      }
      return response.status(200).json({message: "Book successfully deleted"});
  
    } catch(error){
      console.log(error.message);
      response.status(400).send({message: error.message});
    }
  });

export default router;