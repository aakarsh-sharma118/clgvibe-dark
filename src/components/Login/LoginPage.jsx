import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { genders, isEmailValid, LoginCarouselData } from "../../constants";
import ForgotPassword from "./ForgotPassword";
import { colleges } from "../../constants";
import Carousel from "./Carousel";
import InputFields from "./InputFields";

const LoginPage = (props) => {
  // State for toggling between login and Forgot Password forms
  const [forgotPassword, setForgotPassword] = useState(false);

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
    firstName: "",
    lastName: "",
    gender: "",
    college: "",
    agreeTerms: false,
    applyForCollege: false,
  });

  // State to track form-specific error messages
  const [formErrors, setFormErrors] = useState({});

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

  // Effect to set `applyForCollege` to `true` when the `college` field value is "Apply for your College"
  useEffect(() => {
    if (signUpFormData?.college && signUpFormData.college === "Apply for your College") {
      setSignUpFormData((prev) => ({
        ...prev,
        applyForCollege: true,
      }));
    }
  }, [signUpFormData?.college]);

  // Handle input changes for both forms
  const handleInputChange = (e) => {
    const { name, value } = e?.target ?? {};
    if (!name) return; // Skip if `name` is not defined

    if (isLoginFormVisible) {
      setLoginFormData((prev) => ({ ...prev, [name]: value ?? "" }));
    } else {
      setSignUpFormData((prev) => ({ ...prev, [name]: value ?? "" }));
    }
    setFormErrors({});
  };

  // Form submission handler for login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Additional login validation logic can be added here
  };

  // Form submission handler for sign-up
  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    const { email, password, confirmPassword, agreeTerms } = signUpFormData;

    // Validation logic
    const errors = {};
    if (!email?.trim()) errors.email = "Email is required.";
    else if (!isEmailValid(email)) errors.email = "Invalid email format.";
    if (!password?.trim()) errors.password = "Password is required.";
    if (password?.trim() !== confirmPassword?.trim())
      errors.confirmPassword = "Passwords do not match.";
    if (!agreeTerms) errors.agreeTerms = "You must agree to the terms.";

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setCurrentStep(3);
    }
  };

  // Validate step 1 form
  const isStep1Valid = () => {
    const { firstName, lastName, college } = signUpFormData;
    const errors = {};

    // Validation logic
    if (!firstName?.trim()) {
      errors.firstName = "First Name is required.";
    } else if (firstName.trim().length < 2) {
      errors.firstName = "Please enter at least 2 characters.";
    }

    if (!lastName?.trim()) {
      errors.lastName = "Last Name is required.";
    } else if (lastName.trim().length < 2) {
      errors.lastName = "Please enter at least 2 characters.";
    }

    if (!college?.trim()) {
      errors.college = "You must select your College.";
    }

    setFormErrors(errors);

    // If the form is valid then setting the step here.
    if (Object.keys(errors).length === 0) {
      setCurrentStep(2);
    }
  };

  return (
    <main className="w-full min-h-screen flex justify-center bg-softBeige sm:bg-background-gradient sm:p-8 sm:items-center p-0">
      {/* Main container for the login page */}
      <div className="relative w-full lg:max-w-[1020px] sm:h-full lg:h-[640px] bg-softBeige rounded-[3.3rem] sm:shadow-[0_60px_40px_-30px_rgba(0,0,0,0.27)] flex">
        {/* Form Section */}
        <div className="flex-1 p-8">
          {/* Container for falling stars animation */}
          <div className="falling-stars-container"></div>

          {/* Conditional rendering for login, forgot password and sign-up forms */}
          {forgotPassword ? (
            <ForgotPassword
              moveBackToLogIn={() => setForgotPassword(false)}
              timerDuration="120"
            />
          ) : isLoginFormVisible ? (
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
                  className="text-color-link text-sm font-semibold hover:text-color-hover transition"
                >
                  Sign up
                </button>
              </div>
              {/* Login form fields */}
              <div className="space-y-6">
                {/* Username Input Field */}
                <InputFields
                  label="Username"
                  name="username"
                  value={loginFormData.username}
                  onChange={handleInputChange}
                  required={true}
                />

                {/* Password Input Field */}
                <InputFields
                  label="Password"
                  name="password"
                  type="password"
                  minLength="8"
                  value={loginFormData.password}
                  onChange={handleInputChange}
                  required={true}
                />
                {/* Sign in button */}
                <button className="w-full h-[43px] bg-[#0F0C17] text-white rounded-xl font-semibold hover:bg-color-hover transition-all">
                  Sign In
                </button>
                <p className="text-sm text-gray-400">
                  Forgotten your password or login details?{" "}
                  <button
                    onClick={() => setForgotPassword(true)}
                    className="text-color-link hover:text-color-hover transition"
                  >
                    Get help
                  </button>{" "}
                  Signing in
                </p>
              </div>
            </form>
          ) : currentStep === 1 ? (
            // Step 1 of sign-up form
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
                {/* First Name Input Field */}
                <InputFields
                  label="First Name"
                  name="firstName"
                  value={signUpFormData.firstName}
                  onChange={handleInputChange}
                  required={true}
                />
                {/* Validation errors */}
                {formErrors.firstName &&
                  formErrors.firstName &&
                  formErrors.firstName !== "" && (
                    <p
                      className="text-red-500 text-xs !mt-1"
                      key={formErrors.firstName}
                    >
                      {formErrors.firstName}
                    </p>
                  )}

                {/* Last Name Input Field */}
                <InputFields
                  label="Last Name"
                  name="lastName"
                  value={signUpFormData.lastName}
                  onChange={handleInputChange}
                  required={true}
                />
                {/* Validation errors */}
                {formErrors.lastName &&
                  formErrors.lastName &&
                  formErrors.lastName !== "" && (
                    <p
                      className="text-red-500 text-xs !mt-1"
                      key={formErrors.lastName}
                    >
                      {formErrors.lastName}
                    </p>
                  )}

                {/* College options */}
                <InputFields
                  name="college"
                  type="select"
                  value={signUpFormData.college}
                  options={colleges} // Pass the array of colleges
                  onChange={handleInputChange}
                  className="h-[37px]"
                  required={true}
                />

                {/* Validation errors */}
                {formErrors.college &&
                  formErrors.college &&
                  formErrors.college !== "" && (
                    <p
                      className="text-red-500 text-xs !mt-1"
                      key={formErrors.college}
                    >
                      {formErrors.college}
                    </p>
                  )}

                {/* Gender options */}
                <InputFields
                  name="gender"
                  value={signUpFormData.gender}
                  onChange={handleInputChange}
                  type="select"
                  options={genders}
                  className="input-field"
                />

                {/* Continue To Step 2 button */}
                <button
                  className="w-full h-[43px] bg-[#0F0C17] hover:bg-color-hover text-white rounded-xl font-semibold transition-all"
                  onClick={isStep1Valid}
                >
                  Next
                </button>
                <p className="text-sm text-gray-400">
                  Already Have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLoginFormVisible(true)}
                    className="text-color-link text-sm font-semibold hover:text-color-hover transition"
                  >
                    Log In
                  </button>
                </p>
              </div>
            </form>
          ) : currentStep === 2 ? (
            // Step 2 of the sign-up process - additional user details
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
                  Step 2 : Additional Details
                </h2>
                <h6 className="text-gray-500 text-sm">You are nearly there!</h6>
              </div>
              <div className="space-y-6">
                {/* Email Input Field */}
                <InputFields
                  label="Email"
                  name="email"
                  value={signUpFormData.email}
                  onChange={handleInputChange}
                  required={true}
                />
                {/* Validation errors */}
                {formErrors.email &&
                  formErrors.email &&
                  formErrors.email !== "" && (
                    <p
                      className="text-red-500 text-xs !mt-1"
                      key={formErrors.email}
                    >
                      {formErrors.email}
                    </p>
                  )}

                {/* Password Input Field */}
                <InputFields
                  label="Password"
                  name="password"
                  type="password"
                  minLength="8"
                  value={signUpFormData.password}
                  onChange={handleInputChange}
                  required={true}
                />
                {/* Validation errors */}
                {formErrors.password &&
                  formErrors.password &&
                  formErrors.password !== "" && (
                    <p
                      className="text-red-500 text-xs !mt-1"
                      key={formErrors.password}
                    >
                      {formErrors.password}
                    </p>
                  )}

                {/* Confirm Password Input Field */}
                <InputFields
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  minLength="8"
                  value={signUpFormData.confirmPassword}
                  onChange={handleInputChange}
                  required={true}
                />
                {/* Validation errors */}
                {formErrors.confirmPassword &&
                  formErrors.confirmPassword &&
                  formErrors.confirmPassword !== "" && (
                    <p
                      className="text-red-500 text-xs !mt-1"
                      key={formErrors.confirmPassword}
                    >
                      {formErrors.confirmPassword}
                    </p>
                  )}

                {/* Agree Terms checkbox */}
                <InputFields
                  label="I agree to the terms and conditions"
                  name="agreeTerms"
                  value={signUpFormData.agreeTerms.toString()} // Convert boolean to string for the InputFields component
                  type="checkbox"
                  onChange={() =>
                    setSignUpFormData((prev) => ({
                      ...prev,
                      agreeTerms: !prev.agreeTerms, // Toggle the checkbox value
                    }))
                  }
                  className="text-sm"
                />
                {/* Validation errors */}
                {formErrors.agreeTerms &&
                  formErrors.agreeTerms &&
                  formErrors.agreeTerms !== "" && (
                    <p
                      className="text-red-500 text-xs !mt-1"
                      key={formErrors.agreeTerms}
                    >
                      {formErrors.agreeTerms}
                    </p>
                  )}
                {/* Step 2 Next button */}
                <button
                  type="submit"
                  className={`w-full h-[43px] ${
                    signUpFormData.agreeTerms
                      ? "bg-[#0F0C17] hover:bg-color-hover"
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
                Sign-up Complete!
              </h2>
              <p className="text-gray-500">
                Thank you for signing up! You can now log in to your account.
                Please check your email for confirmation.
              </p>
              <button
                className="mt-4 w-full h-[43px] bg-[#0F0C17] text-white rounded-xl font-semibold hover:bg-color-hover transition-all"
                onClick={() => setIsLoginFormVisible(true)}
              >
                Return to Login
              </button>
            </div>
          )}
        </div>

        {/* Carousel Section to Displaying the carousel  */}
        <div className="sm:block sm:w-full lg:w-[55%] h-full">
          <Carousel carouselData={LoginCarouselData} />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
