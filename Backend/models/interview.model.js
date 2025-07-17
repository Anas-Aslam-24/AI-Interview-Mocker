import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
    },
    company: {
      type: String,
    },
    jobDescription: {
      type: String,
    },
    skills: {
      type: String,
    },
    difficulty: {
      type: String,
    },
    experience: {
      type: String,
    },

    questions: [
      {
        type: String,
      },
    ],

    results: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
        rating: { type: Number, required: true },
        feedback: { type: String, required: true },
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
