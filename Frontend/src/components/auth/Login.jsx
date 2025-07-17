import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { setUser } from "@/redux/slices/authSlice";



const Login = () => {
  const { loading } = useSelector((store) => store.auth);
  

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const USER_API_ENDPOINT = "http://localhost:3000/api/v1/user";

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  function changeEventHandler(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  async function submitHandler(e) {
    e.preventDefault(); // prevent default form submission

    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate('/')
        toast.success(res.data.message || "Login successful");
        // Navigate or store user info if needed
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-stone-100 pt-20 pb-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Form Container with Header Inside */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-emerald-100">
              Log in to your InterviewMocker account
            </p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={submitHandler} className="space-y-5">
              {/* Full Name */}

              {/* Email */}
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium text-sm">
                  Email Address
                </Label>
                <Input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="Enter your email"
                  className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg h-11 transition-all duration-200 bg-slate-50 focus:bg-white"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium text-sm">
                  Password
                </Label>
                <Input
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="Create a strong password"
                  className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg h-11 transition-all duration-200 bg-slate-50 focus:bg-white"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                {loading ? (
                  <Button
                    disabled
                    className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-medium shadow-lg opacity-75 cursor-not-allowed"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    Log In
                  </Button>
                )}
              </div>

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-slate-200">
                <span className="text-slate-600 text-sm">
                  Don't have an account?{" "}
                  <NavLink
                    to="/signup"
                    className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200 hover:underline"
                  >
                    Sign up now
                  </NavLink>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
