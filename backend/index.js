import express, { response } from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import router from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

app.use(cors())
app.use(express.json())

app.use('/books', router)

  

app.get("/", (req, res) => {
    console.log(req)
    return res.status(234).send('Welcome to MERN stack tutorial')
})

mongoose.connect("mongodb://localhost:27017").then(
    ()=>{
        console.log('App is connected')
        app.listen(PORT, ()=>{
            console.log(`App is listing: ${PORT}`)
        });
        
    }
).catch((error)=>{console.log(error);})