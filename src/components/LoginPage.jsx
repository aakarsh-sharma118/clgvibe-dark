import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faMortarBoard } from '@fortawesome/free-solid-svg-icons';
import { LoginCarouselData } from "../constants";
import Carousel from "./design/Carousel";

const LoginPage = () => {
  const [focusedField, setFocusedField] = useState(null); // Track focused input field
  const [username, setUsername] = useState(""); // Store username input value
  const [password, setPassword] = useState(""); // Store password input value

  // Handle input focus/blur
  const handleInputFocus = (field) => setFocusedField(field);
  const handleInputBlur = () => setFocusedField(null);

  // Handle username and password change
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-sky p-8 bg-background-gradient">
      {/* Main Content */}
      <div className="relative w-full max-w-[1020px] h-[640px] bg-white rounded-[3.3rem] shadow-[0_60px_40px_-30px_rgba(0,0,0,0.27)]">
        <div className="absolute inset-0 w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8">
          {/* Login Form */}
          <div className="absolute w-full sm:w-[45%] md:w-[40%] h-full top-0 left-0 grid grid-rows-1">
            <form className="max-w-[260px] w-full mx-auto h-full flex flex-col justify-evenly transition-opacity duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <Link to="/" className="text-xl text-black hover:text-gray-800">
                  <FontAwesomeIcon icon={faArrowLeft}/>
                </Link>
                <FontAwesomeIcon icon={faMortarBoard} className="text-black" />
                <h4 className="font-Lexend text-xl text-black">Clgvibe</h4>
              </div>

              <div className="mb-6">
                <h2 className="font-Abel text-2xl font-semibold text-black">
                  Welcome Back
                </h2>
                <h6 className="text-gray-500 text-sm">Not registered yet?</h6>
                <Link
                  to="/signup"
                  className="text-[#0d5ffd] text-sm font-semibold hover:text-[#71c5fd] transition"
                >
                  Sign up
                </Link>
              </div>

              <div className="space-y-6">
                {/* Username Input */}
                <div className="relative h-[37px]">
                  <input
                    type="text"
                    minLength="4"
                    value={username} // Bind value to state
                    onChange={handleUsernameChange} // Handle input changes
                    className={`w-full h-full bg-transparent border-b border-gray-400 outline-none text-gray-900 focus:border-black transition-all duration-300 input-field ${
                      focusedField === "username" || username ? "active" : ""
                    }`}
                    onFocus={() => handleInputFocus("username")}
                    onBlur={handleInputBlur}
                    required
                  />
                  <label
                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 transition-all duration-300 ${
                      focusedField === "username" || username
                        ? "text-sm top-[-2px]"
                        : "text-base top-1/2"
                    }`}
                  >
                    Username
                  </label>
                </div>

                {/* Password Input */}
                <div className="relative h-[37px]">
                  <input
                    type="password"
                    minLength="4"
                    value={password} // Bind value to state
                    onChange={handlePasswordChange} // Handle input changes
                    className={`w-full h-full bg-transparent border-b border-gray-400 outline-none text-gray-900 focus:border-black transition-all duration-300 input-field ${
                      focusedField === "password" || password ? "active" : ""
                    }`}
                    onFocus={() => handleInputFocus("password")}
                    onBlur={handleInputBlur}
                    required
                  />
                  <label
                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 transition-all duration-300 ${
                      focusedField === "password" || password
                        ? "text-sm top-[-2px]"
                        : "text-base top-1/2"
                    }`}
                  >
                    Password
                  </label>
                </div>

                <button className="w-full h-[43px] bg-black text-white rounded-xl font-semibold hover:bg-[#71d1fd] transition-all">
                  Sign In
                </button>

                <p className="text-sm text-gray-400">
                  Forgotten your password or login details?
                  <Link
                    to="/forgot-password"
                    className="text-[#0d5ffd] hover:text-[#71d5fd] transition"
                  >
                    Get help
                  </Link>{" "}
                  Signing in
                </p>
              </div>
            </form>
          </div>

          {/* Carousel */}
          <div className="hidden sm:block sm:w-[55%] h-full">
            <Carousel carouselData={LoginCarouselData} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
