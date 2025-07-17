import {createSlice} from "@reduxjs/toolkit";

export const interviewSlice = createSlice({
  name: "interview",
  initialState: {
    questions: [],
    answers: [],
  },
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setAnswers: (state, action) => {
      state.answers = action.payload;
    },
  },
});

export const { setQuestions, setAnswers } = interviewSlice.actions;

export default interviewSlice.reducer;
