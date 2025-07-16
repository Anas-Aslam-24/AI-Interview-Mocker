import { Button } from "./components/ui/button"
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Signup from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Home from "./components/pages/Home";

import InterviewSetupPage from "./components/InterviewSetupPage";

function App() {
  

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/interview" element={<InterviewSetupPage />} />
      </Routes>
    </div>
  );
}

export default App
