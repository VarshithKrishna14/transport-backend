import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();
const router = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

router.use(cors(corsOptions));

const API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

async function run(data) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(data);
  const response = await result.response;
  return response.text();
}

//Hey there! Welcome to Project Tech. We have a great beginner course on web development that will teach you the basics of coding.  Would you like to learn more about it?  We also have a vibrant community of students who can help you on your coding journey!

router.post("/", async (req, res) => {
  try {
    const {prompt,codeSnippet} = req.body;
    console.log(prompt);
    console.log(req.body.prompt)
    const processedData = await run(`Act as a transport assistant named Prayog, a chatbot that interacts with users to provide real-time updates and assistance related to transport services in India. Given the prompt: ${prompt}, assist the user accordingly. Provide clean and crisp responses focused on transportation services, such as driving licenses, registrations, permits, taxes, fees, acts, rules, forms, procedures, and other related information.you should provide a general response for the query and dont repeat the question in the output`);
    res.send({ result: processedData });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
    console.log("Running")
  try {
    res.send("Running");
  } catch (error) {
    console.error(error);
  }
});

export { router as chatbot };