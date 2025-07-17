import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    jobTitle:{
        type:String
    },
    company: {
      type:String,
    },
    jobDescription: {
      type:String,
    },
    skills: {
      type:String,
    },
    difficulty:{
      type: String,
    },
    experience: {
      type:String
    },
   
    feedback: {
      type: String,
    },
    rating: {
      type: Number,
    },
    questions: [
      {
        type: String,
      },
    ],
    answers: [
      {
        type: String,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;
