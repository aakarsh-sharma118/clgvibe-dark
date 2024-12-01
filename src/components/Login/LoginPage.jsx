import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faMortarBoard } from "@fortawesome/free-solid-svg-icons";
import { LoginCarouselData } from "../../constants";
import { colleges } from "../../constants";
import Carousel from "../design/Carousel";

const LoginPage = (props) => {
  const [focusedField, setFocusedField] = useState(null);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(props.isLoginPage);

  // State for login form
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  // State for sign-up form
  const [signUpFormData, setSignUpFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    gender: "",
    college: "",
    agreeTerms: false,
    applyForCollege: false,
  });

  // Step tracking for the sign-up form
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const container = document.querySelector(".falling-stars-container");
    const createStar = () => {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = `${Math.random() * 100}vw`;
      star.style.animationDuration = `${3 + Math.random() * 2}s`;
      container.appendChild(star);
      setTimeout(() => star.remove(), 5000);
    };
    const interval = setInterval(createStar, 200);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isLoginFormVisible) {
      setLoginFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setSignUpFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleInputFocus = (field) => setFocusedField(field);
  const handleInputBlur = () => setFocusedField(null);

  const isFieldEmpty = (field) => {
    if (isLoginFormVisible) {
      return !loginFormData[field]?.trim();
    } else {
      return !signUpFormData[field]?.trim();
    }
  };

  return (
    <main className="w-full min-h-screen flex justify-center bg-white sm:bg-background-gradient sm:p-8 sm:items-center p-0">
      <div className="relative w-full lg:max-w-[1020px] sm:h-full lg:h-[640px] bg-white rounded-[3.3rem] sm:shadow-[0_60px_40px_-30px_rgba(0,0,0,0.27)] flex">
        {/* Form Section */}
        <div className="flex-1 p-8">
          <div className="falling-stars-container"></div>

          {isLoginFormVisible ? (
            <form className="max-w-[260px] w-full mx-auto h-full pb-[10rem] sm:pb-0 flex flex-col justify-evenly transition-opacity duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <Link
                  to="/"
                  className="text-2xl sm:text-xl text-black hover:text-gray-800"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
                {/* <FontAwesomeIcon
                  icon={faMortarBoard}
                  className="text-black hidden sm:block text-xl"
                />
                <h2 className="font-Lexend text-4xl sm:text-xl text-black">
                  Clgvibe
                </h2> */}
              </div>
              <div className="mb-6">
                <h2 className="font-Abel text-2xl font-semibold text-black">
                  Welcome Back
                </h2>
                <h6 className="text-gray-500 text-sm">Not registered yet?</h6>
                <button
                  type="button"
                  onClick={() => setIsLoginFormVisible(false)}
                  className="text-[#0d5ffd] text-sm font-semibold hover:text-[#4a2c75] transition"
                >
                  Sign up
                </button>
              </div>
              <div className="space-y-6">
                <div className="relative h-[37px]">
                  <input
                    type="text"
                    name="username"
                    minLength="4"
                    value={loginFormData.username}
                    onChange={handleInputChange}
                    className={`w-full h-full bg-transparent border-b border-gray-400 outline-none text-gray-900 focus:border-black transition-all duration-300 input-field ${
                      focusedField === "username" || !isFieldEmpty("username")
                        ? "active"
                        : ""
                    }`}
                    onFocus={() => handleInputFocus("username")}
                    onBlur={handleInputBlur}
                    required
                  />
                  <label
                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 transition-all duration-300 ${
                      focusedField === "username" || !isFieldEmpty("username")
                        ? "text-sm top-[-2px]"
                        : "text-base top-1/2"
                    }`}
                    onFocus={() => handleInputFocus("username")}
                    onBlur={handleInputBlur}
                  >
                    Username
                  </label>
                </div>
                <div className="relative h-[37px]">
                  <input
                    type="password"
                    name="password"
                    minLength="4"
                    value={loginFormData.password}
                    onChange={handleInputChange}
                    className={`w-full h-full bg-transparent border-b border-gray-400 outline-none text-gray-900 focus:border-black transition-all duration-300 input-field ${
                      focusedField === "password" || !isFieldEmpty("password")
                        ? "active"
                        : ""
                    }`}
                    onFocus={() => handleInputFocus("password")}
                    onBlur={handleInputBlur}
                    required
                  />
                  <label
                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 transition-all duration-300 ${
                      focusedField === "password" || !isFieldEmpty("password")
                        ? "text-sm top-[-2px]"
                        : "text-base top-1/2"
                    }`}
                    onFocus={() => handleInputFocus("password")}
                    onBlur={handleInputBlur}
                  >
                    Password
                  </label>
                </div>
                <button className="w-full h-[43px] bg-[#0F0C17] text-white rounded-xl font-semibold hover:bg-[#4a2c75] transition-all">
                  Sign In
                </button>
                <p className="text-sm text-gray-400">
                  Forgotten your password or login details?
                  <Link
                    to="/forgot-password"
                    className="text-[#0d5ffd] hover:text-[#4a2c75] transition"
                  >
                    {" "}
                    Get help{" "}
                  </Link>
                  Signing in
                </p>
              </div>
            </form>
          ) : currentStep === 1 ? (
            <form className="max-w-[260px] w-full mx-auto h-full pb-[10rem] sm:pb-0 flex flex-col justify-evenly transition-opacity duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <Link
                  to="/"
                  className="text-2xl sm:text-xl text-black hover:text-gray-800"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
                {/* <FontAwesomeIcon
                  icon={faMortarBoard}
                  className="text-black hidden sm:block text-xl"
                />
                <h2 className="font-Lexend text-4xl sm:text-xl text-black">
                  Clgvibe
                </h2> */}
              </div>
              <div className="mb-6">
                <h2 className="font-Abel text-2xl font-semibold text-black">
                  Welcome Aboard
                </h2>
              </div>
              <div className="space-y-6">
                <div className="relative h-[37px]">
                  <input
                    type="text"
                    name="fullName"
                    minLength="4"
                    value={signUpFormData.fullName}
                    onChange={handleInputChange}
                    className={`w-full h-full bg-transparent border-b border-gray-400 outline-none text-gray-900 focus:border-black transition-all duration-300 input-field ${
                      focusedField === "fullName" || !isFieldEmpty("fullName")
                        ? "active"
                        : ""
                    }`}
                    onFocus={() => handleInputFocus("fullName")}
                    onBlur={handleInputBlur}
                    required
                  />
                  <label
                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 transition-all duration-300 ${
                      focusedField === "fullName" || !isFieldEmpty("fullName")
                        ? "text-sm top-[-2px]"
                        : "text-base top-1/2"
                    }`}
                    onFocus={() => handleInputFocus("fullName")}
                    onBlur={handleInputBlur}
                  >
                    Full Name
                  </label>
                </div>
                <div className="relative h-[37px]">
                  <input
                    type="email"
                    name="email"
                    value={signUpFormData.email}
                    onChange={handleInputChange}
                    className={`w-full h-full bg-transparent border-b border-gray-400 outline-none text-gray-900 focus:border-black transition-all duration-300 input-field ${
                      focusedField === "email" || !isFieldEmpty("email")
                        ? "active"
                        : ""
                    }`}
                    onFocus={() => handleInputFocus("email")}
                    onBlur={handleInputBlur}
                    required
                  />
                  <label
                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 transition-all duration-300 ${
                      focusedField === "email" || !isFieldEmpty("email")
                        ? "text-sm top-[-2px]"
                        : "text-base top-1/2"
                    }`}
                    onFocus={() => handleInputFocus("email")}
                    onBlur={handleInputBlur}
                  >
                    Email
                  </label>
                </div>
                <div className="relative h-[37px]">
                  <input
                    type="password"
                    name="password"
                    minLength="4"
                    value={signUpFormData.password}
                    onChange={handleInputChange}
                    className={`w-full h-full bg-transparent border-b border-gray-400 outline-none text-gray-900 focus:border-black transition-all duration-300 input-field ${
                      focusedField === "password" || !isFieldEmpty("password")
                        ? "active"
                        : ""
                    }`}
                    onFocus={() => handleInputFocus("password")}
                    onBlur={handleInputBlur}
                    required
                  />
                  <label
                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 transition-all duration-300 ${
                      focusedField === "password" || !isFieldEmpty("password")
                        ? "text-sm top-[-2px]"
                        : "text-base top-1/2"
                    }`}
                    onFocus={() => handleInputFocus("password")}
                    onBlur={handleInputBlur}
                  >
                    Password
                  </label>
                </div>
                <div className="relative h-[37px]">
                  <input
                    type="password"
                    name="confirmPassword"
                    minLength="4"
                    value={signUpFormData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full h-full bg-transparent border-b border-gray-400 outline-none text-gray-900 focus:border-black transition-all duration-300 input-field ${
                      focusedField === "confirmPassword" ||
                      !isFieldEmpty("confirmPassword")
                        ? "active"
                        : ""
                    }`}
                    onFocus={() => handleInputFocus("confirmPassword")}
                    onBlur={handleInputBlur}
                    required
                  />
                  <label
                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 transition-all duration-300 ${
                      focusedField === "confirmPassword" ||
                      !isFieldEmpty("confirmPassword")
                        ? "text-sm top-[-2px]"
                        : "text-base top-1/2"
                    }`}
                    onFocus={() => handleInputFocus("confirmPassword")}
                    onBlur={handleInputBlur}
                  >
                    Confirm Password
                  </label>
                </div>
                <button
                  type="button"
                  className="w-full h-[43px] bg-[#0F0C17] text-white rounded-xl font-semibold hover:bg-[#4a2c75] transition-all"
                  onClick={() => setCurrentStep(2)}
                >
                  Move to Step 2
                </button>
                <p className="text-sm text-gray-400">
                  Already Have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLoginFormVisible(true)}
                    className="text-[#0d5ffd] text-sm font-semibold hover:text-[#4a2c75] transition"
                  >
                    Log In
                  </button>
                </p>
              </div>
            </form>
          ) : currentStep === 2 ? (
            <form className="max-w-[260px] w-full mx-auto h-full pb-[10rem] sm:pb-0 flex flex-col justify-evenly transition-opacity duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-2xl sm:text-xl text-black hover:text-gray-800"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
              </div>
              <h2 className="text-2xl font-semibold text-black mb-6">
                Step 2: Complete Your Profile
              </h2>
              <div className="space-y-6">
                <div className="relative h-[37px]">
                  <select
                    name="college"
                    value={signUpFormData.college}
                    onChange={handleInputChange}
                    className="w-full h-full bg-transparent border-b border-gray-400 outline-none text-gray-900 focus:border-black transition-all duration-300 input-field"
                    required
                  >
                    {colleges.map((college, index) => (
                      <option key={index} value={college}>
                        {college}
                      </option>
                    ))}
                    {/* Add more options as needed */}
                  </select>
                </div>
                <div className="relative h-[37px]">
                  <select
                    name="gender"
                    value={signUpFormData.gender}
                    onChange={handleInputChange}
                    className="w-full h-full bg-transparent border-b border-gray-400 outline-none text-gray-900 focus:border-black transition-all duration-300 input-field"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="relative h-[37px]">
                  <label className="inline-flex items-center text-gray-500">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={signUpFormData.agreeTerms}
                      onChange={(e) =>
                        setSignUpFormData({
                          ...signUpFormData,
                          agreeTerms: e.target.checked,
                        })
                      }
                      className="mr-2"
                      required
                    />
                    I agree to the terms and conditions
                  </label>
                </div>
                <div className="relative h-[37px]">
                  <label className="inline-flex items-center text-gray-500">
                    <input
                      type="checkbox"
                      name="applyForCollege"
                      checked={signUpFormData.applyForCollege}
                      onChange={(e) =>
                        setSignUpFormData({
                          ...signUpFormData,
                          applyForCollege: e.target.checked,
                        })
                      }
                      className="mr-2"
                    />
                    Apply for College
                  </label>
                </div>
                <button className="w-full h-[43px] bg-[#0F0C17] text-white rounded-xl font-semibold hover:bg-[#4a2c75] transition-all">
                  Submit
                </button>
                <p className="mt-4 text-gray-500 text-sm">
                  Completing your profile helps us personalize your experience
                  and keep you updated.
                </p>
              </div>
            </form>
          ) : null}
        </div>

        {/* Carousel Section */}
        <div className="hidden lg:block lg:w-[55%] h-full">
          <Carousel carouselData={LoginCarouselData} />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
