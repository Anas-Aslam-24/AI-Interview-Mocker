import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";

import userRoute from "./routes/user.route.js";
import interviewRoute from "./routes/interview.route.js";

dotenv.config();

//Middlewrae
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://ai-interview-mocker-4c0e.onrender.com",
  ],
  credentials: true,
};

app.use(cors(corsOptions));


//APIs

app.get('/',(req,res)=>{
  res.send("API IS Running!");
})

app.use("/api/v1/user", userRoute);
app.use("/api/v1/interview", interviewRoute);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`server is running on port ${PORT}`);
});
