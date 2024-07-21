import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { chatbot } from "./Routes/chatbot.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000,()=>{
    console.log("server at 3000");
})

app.use("/chatbot",chatbot);
