import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

//find
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json({count: book.length, data: book});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})
// update
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(404).json({message: 'book not found'})
        }
        return res.status(200).send({message: 'Book updated successfully'})
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

//delete
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message: 'book not found'})
        }
        return res.status(200).send({message: 'Book deleted successfully'})
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

// all book
router.get('/', async (req, res) => {
    try {
        const book = await Book.find({});
        return res.status(200).json({count: book.length, data: book});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})
//create
router.post('/', async (req, res)=> {
    try {
        if(!req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message: 'send all required field'
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook);
        return res.status(201).send(book)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})        
    }
})

export default router;
