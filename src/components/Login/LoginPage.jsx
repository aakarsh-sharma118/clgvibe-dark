import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { LoginCarouselData } from "../../constants";
import { colleges } from "../../constants";
import Carousel from "../design/Carousel";

// Reusable TextInput component for input fields
const TextInput = ({
  label,
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  focusedField,
  isEmpty,
  type = "text",
  minLength = 4,
}) => (
  <div className="relative h-[37px]">
    <input
      type={type}
      name={name}
      minLength={minLength}
      value={value}
      onChange={onChange}
      className={`w-full h-full bg-transparent border-b border-gray-400 outline-none text-gray-900 focus:border-black transition-all duration-300 input-field ${
        focusedField === name || !isEmpty ? "active" : ""
      }`}
      onFocus={() => onFocus(name)}
      onBlur={onBlur}
      required
    />
    <label
      className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 transition-all duration-300 ${
        focusedField === name || !isEmpty
          ? "text-sm top-[-2px]"
          : "text-base top-1/2"
      }`}
    >
      {label}
    </label>
  </div>
);

const LoginPage = (props) => {
  // State for managing the currently focused input field
  const [focusedField, setFocusedField] = useState(null);

  // State for toggling between login and sign-up forms
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(
    props.isLoginPage
  );

  // State to store login form input values
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  // State to store sign-up form input values
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

  // State to track the current step in the multi-step sign-up process
  const [currentStep, setCurrentStep] = useState(1);

  // Effect to handle falling stars animation
  useEffect(() => {
    const container = document.querySelector(".falling-stars-container");

    if (container) {
      const createStar = () => {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${3 + Math.random() * 2}s`;
        container.appendChild(star);

        setTimeout(() => {
          if (star?.parentNode) star.remove();
        }, 5000);
      };

      const interval = setInterval(createStar, 200);
      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, []);

  // Handle input changes for both forms
  const handleInputChange = (e) => {
    const { name, value } = e?.target ?? {};
    if (!name) return; // Skip if `name` is not defined

    if (isLoginFormVisible) {
      setLoginFormData((prev) => ({ ...prev, [name]: value ?? "" }));
    } else {
      setSignUpFormData((prev) => ({ ...prev, [name]: value ?? "" }));
    }
  };

  // Handle input focus
  const handleInputFocus = (field) => {
    if (field) setFocusedField(field); // Ensure `field` is not null or undefined
  };

  // Handle input blur
  const handleInputBlur = () => setFocusedField(null);

  // Check if a field is empty
  const isFieldEmpty = (field) => {
    if (!field) return true;

    if (isLoginFormVisible) {
      return !loginFormData?.[field]?.trim();
    } else {
      return !signUpFormData?.[field]?.trim();
    }
  };

  // Form submission handler for login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
  };

  // Form submission handler for sign-up
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(3)
  };

  // Validate step 1 form
  const isStep1Valid = () => {
    const { fullName, email, password, confirmPassword } = signUpFormData;
    return (
      fullName &&
      email &&
      password &&
      confirmPassword &&
      password === confirmPassword
    );
  };

  return (
    <main className="w-full min-h-screen flex justify-center bg-white sm:bg-background-gradient sm:p-8 sm:items-center p-0">
      {/* Main container for the login page */}
      <div className="relative w-full lg:max-w-[1020px] sm:h-full lg:h-[640px] bg-white rounded-[3.3rem] sm:shadow-[0_60px_40px_-30px_rgba(0,0,0,0.27)] flex">
        {/* Form Section */}
        <div className="flex-1 p-8">
          {/* Container for falling stars animation */}
          <div className="falling-stars-container"></div>

          {/* Conditional rendering for login and sign-up forms */}
          {isLoginFormVisible ? (
            // Login form
            <form
              className="max-w-[260px] w-full mx-auto h-full pb-[10rem] sm:pb-0 flex flex-col justify-evenly transition-opacity duration-300"
              onSubmit={handleLoginSubmit}
            >
              <div className="flex items-center space-x-4 mb-6">
                {/* Back button */}
                <Link
                  to="/"
                  className="text-2xl sm:text-xl text-black hover:text-gray-800"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
              </div>
              <div className="mb-6">
                {/* Welcome back message */}
                <h2 className="font-Abel text-2xl font-semibold text-black">
                  Welcome Back
                </h2>
                <h6 className="text-gray-500 text-sm">Not registered yet?</h6>
                {/* Button to switch to sign-up form */}
                <button
                  type="button"
                  onClick={() => setIsLoginFormVisible(false)}
                  className="text-[#0d5ffd] text-sm font-semibold hover:text-[#4a2c75] transition"
                >
                  Sign up
                </button>
              </div>
              {/* Login form fields */}
              <div className="space-y-6">
                <TextInput
                  label="Username"
                  name="username"
                  value={loginFormData.username}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  focusedField={focusedField}
                  isEmpty={isFieldEmpty("username")}
                />
                <TextInput
                  label="Password"
                  name="password"
                  type="password"
                  value={loginFormData.password}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  focusedField={focusedField}
                  isEmpty={isFieldEmpty("password")}
                />
                {/* Sign in button */}
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
            // Step 1 of the Sign-up form
            <form
              className="max-w-[260px] w-full mx-auto h-full pb-[10rem] sm:pb-0 flex flex-col justify-evenly transition-opacity duration-300"
              onSubmit={handleSignUpSubmit}
            >
              <div className="flex items-center space-x-4 mb-6">
                {/* Back button */}
                <Link
                  to="/"
                  className="text-2xl sm:text-xl text-black hover:text-gray-800"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
              </div>
              {/* Sign-up form title */}
              <div className="mb-6">
                <h2 className="font-Abel text-2xl font-semibold text-black">
                  Welcome Aboard
                </h2>
                <h6 className="text-gray-500 text-sm">
                  And start you journey..
                </h6>
              </div>
              {/* Form fields for step 1 */}
              <div className="space-y-6">
                <TextInput
                  label="Full Name"
                  name="fullName"
                  value={signUpFormData.fullName}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  focusedField={focusedField}
                  isEmpty={isFieldEmpty("fullName")}
                />
                <TextInput
                  label="Email"
                  name="email"
                  type="email"
                  value={signUpFormData.email}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  focusedField={focusedField}
                  isEmpty={isFieldEmpty("email")}
                />
                <TextInput
                  label="Password"
                  name="password"
                  type="password"
                  value={signUpFormData.password}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  focusedField={focusedField}
                  isEmpty={isFieldEmpty("password")}
                />
                <TextInput
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={signUpFormData.confirmPassword}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  focusedField={focusedField}
                  isEmpty={isFieldEmpty("confirmPassword")}
                />
                {/* Step 1 Next button */}
                <button
                  type="submit"
                  className={`w-full h-[43px] ${
                    isStep1Valid()
                      ? "bg-[#0F0C17] hover:bg-[#4a2c75]"
                      : "bg-gray-400"
                  } text-white rounded-xl font-semibold transition-all ${
                    !isStep1Valid() && "cursor-not-allowed"
                  }`}
                  disabled={!isStep1Valid()}
                  onClick={() => setCurrentStep(2)}
                >
                  Next
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
            // Step 2: Select Your Gender
            <form
              className="max-w-[260px] w-full mx-auto h-full pb-[10rem] sm:pb-0 flex flex-col justify-evenly transition-opacity duration-300"
              onSubmit={handleSignUpSubmit}
            >
              <div className="flex items-center space-x-4 mb-6">
                {/* Back button to return to Step 1 */}
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-2xl sm:text-xl text-black hover:text-gray-800"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
              </div>
              {/* Sign-up Step 2 form title */}
              <div className="mb-6">
                <h2 className="font-Abel text-2xl font-semibold text-black">
                  Step 2
                </h2>
                <h6 className="text-gray-500 text-sm">You are nearly there!</h6>
              </div>
              {/* College options */}
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
                  </select>
                </div>

                {/* Gender options */}
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
                {/* Agree Terms checkbox */}
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
                {/* Step 2 Next button */}
                <button
                  type="submit"
                  className={`w-full h-[43px] ${
                    signUpFormData.agreeTerms
                      ? "bg-[#0F0C17] hover:bg-[#4a2c75]"
                      : "bg-gray-400"
                  } text-white rounded-xl font-semibold transition-all ${
                    !signUpFormData.agreeTerms && "cursor-not-allowed"
                  }`}
                  disabled={!signUpFormData.agreeTerms}
                >
                  Submit
                </button>
                <p className="mt-4 text-gray-500 text-sm">
                  Completing your profile helps us personalize your experience
                  and keep you updated.
                </p>
              </div>
            </form>
          ) : (
            // Other steps or final form submission
            <div className="max-w-[260px] w-full mx-auto h-full pb-[10rem] sm:pb-0 flex flex-col justify-evenly transition-opacity duration-300">
              {/* Additional form steps or content can be added here */}
              <h2 className="font-Abel text-2xl font-semibold text-black">
                Thank you for signing up!
              </h2>
              <p className="text-gray-500">
                Please check your email for confirmation.
              </p>
              <button
                className="mt-4 w-full h-[43px] bg-[#0F0C17] text-white rounded-xl font-semibold hover:bg-[#4a2c75] transition-all"
                onClick={() => setIsLoginFormVisible(true)}
              >
                Return to Login
              </button>
            </div>
          )}
        </div>

        {/* Carousel Section */}
        <div className="sm:block sm:w-full lg:w-[55%] h-full">
          {/* Displaying the carousel */}
          <Carousel carouselData={LoginCarouselData} />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
