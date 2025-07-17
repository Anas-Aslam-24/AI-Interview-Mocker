
import Interview from "../models/interview.model.js";

// Create a new interview
export const registerInterview = async (req, res) => {
  try {
    const {
      jobTitle,
      company,
      jobDescription,
      skills,
      difficulty,
      experience,
      questions,
      answers,
    } = req.body;


    const userId = req.id; // middleware authentication



    const newInterview = new Interview({
      jobTitle,
      company,
      jobDescription,
      skills,
      difficulty,
      experience,
      questions,
      answers, 
      user:userId
    });
    

    const savedInterview = await newInterview.save();
    res.status(201).json({
      success: true,
      message: "Interview created successfully",
      interview: savedInterview,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// Update feedback and rating after completion
export const updateFeedbackAndRating = async (req, res) => {
  try {
    const { interviewId, intResult } = req.body;
    // console.log(req.body)
    

    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res
        .status(404)
        .json({ success: false, message: "Interview not found" });
    }

    

    interview.results = intResult;
   
   

    await interview.save();

    res.status(200).json({
      success: true,
      message: "Feedback and rating updated successfully",
      interview,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// Optional: Get all interviews of a user
export const getUserInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ user: req.id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, interviews });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};
