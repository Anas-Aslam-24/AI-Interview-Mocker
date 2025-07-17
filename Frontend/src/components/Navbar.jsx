import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "@/utils/utils";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/slices/authSlice";

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
    }
  };


  return (
    <div className="w-full bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-200/60 backdrop-blur-sm">
      <div className="flex items-center justify-between mx-auto max-w-10/12 h-16">
        <div>
          <NavLink to="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Interview
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Mocker
              </span>
            </h1>
          </NavLink>
        </div>

        {/* <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li className="cursor-pointer">
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? "#059669" : "inherit",
                })}
                className="hover:text-emerald-600 transition-all duration-200 hover:scale-105 text-slate-700"
              >
                Home
              </NavLink>
            </li>

            <li className="cursor-pointer">
              <NavLink
                to="/jobs"
                style={({ isActive }) => ({
                  color: isActive ? "#059669" : "inherit",
                })}
                className="hover:text-emerald-600 transition-all duration-200 hover:scale-105 text-slate-700"
              >
                Feedback
              </NavLink>
            </li>
            <li className="cursor-pointer">
              <NavLink
                to="/browse"
                style={({ isActive }) => ({
                  color: isActive ? "#059669" : "inherit",
                })}
                className="hover:text-emerald-600 transition-all duration-200 hover:scale-105 text-slate-700"
              >
                How it Works?
              </NavLink>
            </li>
          </ul>
        </div> */}

        <div>
          {!user ? (
            <div className="flex items-center gap-2">
              <NavLink to="/login">
                <Button
                  variant="outline"
                  className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200"
                >
                  Login
                </Button>
              </NavLink>

              <NavLink to="/signup">
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                  Signup
                </Button>
              </NavLink>
            </div>
          ) : (
            <div className="flex gap-5">
              <NavLink to="/dashboard">
                <Button
                  variant="outline"
                  className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200"
                >
                  Dashboard
                </Button>
              </NavLink>

              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer h-10 w-10 ring-2 ring-emerald-200 hover:ring-emerald-300 transition-all duration-200">
                    <AvatarImage
                      src={user?.profile.profilePhoto}
                      alt="@shadcn"
                    />
                    {/* <AvatarFallback>NA</AvatarFallback> */}
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className="w-80 p-4 bg-white/95 backdrop-blur-md border-emerald-200/60 shadow-xl">
                  <div>
                    <div className="flex gap-2 space-y-2 items-start">
                      <Avatar className="h-10 w-10 ring-2 ring-emerald-200">
                        <AvatarImage
                          src={user?.profile.profilePhoto}
                          alt="@shadcn"
                        />
                        {/* <AvatarFallback>NA</AvatarFallback> */}
                      </Avatar>

                      <div>
                        <h4 className="font-medium text-slate-800">
                          {user?.fullname}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {user?.profile.bio}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col my-2 mt-2 text-slate-600 gap-4">
                      <div className="flex w-fit items-center gap-6 cursor-pointer group">
                        <User2 className="text-emerald-500 group-hover:text-emerald-600 transition-colors duration-200" />
                        <Button
                          onClick={() => {
                            navigate("/profile");
                          }}
                          variant="link"
                          className="cursor-pointer p-0 h-auto text-slate-700 hover:text-emerald-600 transition-colors duration-200"
                        >
                          View Profile
                        </Button>
                      </div>

                      <div className="flex w-fit items-center gap-6 cursor-pointer group">
                        <LogOut className="text-amber-500 group-hover:text-amber-600 transition-colors duration-200" />
                        <Button
                          onClick={logoutHandler}
                          variant="link"
                          className="cursor-pointer p-0 h-auto text-slate-700 hover:text-amber-600 transition-colors duration-200"
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
