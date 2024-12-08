import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import TextInput from "./TextInput";

const ForgotPassword = (props) => {
  // State variables
  const [step, setStep] = useState(1); // Tracks the current step in the password reset process
  const [email, setEmail] = useState(""); // Stores the email input value
  const [otp, setOtp] = useState(""); // Stores the OTP input value
  const [password, setPassword] = useState(""); // Stores the new password input value
  const [confirmPassword, setConfirmPassword] = useState(""); // Stores the confirm password input value
  const [formErrors, setFormErrors] = useState({}); // Stores validation error messages
  const [timer, setTimer] = useState(120); // 2-minute timer for OTP expiration
  const [focusedField, setFocusedField] = useState(null); // Tracks which input field is focused

  // Function to validate email format using a regular expression
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Effect hook to manage the OTP timer countdown when step 2 is active
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  // Handle input change for any input field
  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  // Handle input focus and set the focused field state
  const handleInputFocus = (field) => {
    if (field) setFocusedField(field);
  };

  // Handle input blur and reset the focused field state
  const handleInputBlur = () => setFocusedField(null);

  // Handle form submission logic for different steps
  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      // Step 1: Email validation
      if (!email) {
        setFormErrors({ email: "Email is required" });
      } else if (!isEmailValid(email)) {
        setFormErrors({ email: "Invalid email format" });
      } else {
        setFormErrors({});
        setStep(2); // Move to step 2 (OTP verification)
        setTimer(120); // Reset the timer for OTP expiration
      }
    } else if (step === 2) {
      // Step 2: OTP validation
      if (!otp) {
        setFormErrors({ otp: "OTP is required" });
      } else {
        setFormErrors({});
        setStep(3); // Move to step 3 (password reset)
      }
    } else if (step === 3) {
      // Step 3: Password and confirm password validation
      if (!password || !confirmPassword) {
        setFormErrors({
          password: "Password and confirm password are required",
        });
      } else if (password !== confirmPassword) {
        setFormErrors({ password: "Passwords do not match" });
      } else {
        setFormErrors({});
        setStep(4); // Move to step 4 (success message)
      }
    }
  };

  // Handle OTP resend logic (resetting the timer)
  const handleResendOtp = () => {
    setTimer(120); // Reset the timer
    setFormErrors({ otp: "OTP has been resent. Please check your email." }); // Optionally display a message
  };

  return (
    <form
      className="max-w-[260px] w-full mx-auto h-full pb-[10rem] sm:pb-0 flex flex-col justify-evenly transition-opacity duration-300"
      onSubmit={handleForgotPasswordSubmit}
    >
      {/* Back button */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => props.moveBackToLogIn && props.moveBackToLogIn()}
          className="text-2xl sm:text-xl text-black hover:text-gray-800"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>

      {/* Form title */}
      <div className="mb-6">
        <h2 className="font-Abel text-2xl font-semibold text-black">
          Reset Your Password
        </h2>
        <h6 className="text-gray-500 text-sm">
          Follow the steps to reset your password.
        </h6>
      </div>

      {/* Step 1: Email input */}
      {step === 1 && (
        <div className="space-y-6">
          <TextInput
            label="Email"
            name="email"
            value={email}
            onChange={(e) => handleInputChange(e, setEmail)}
            onFocus={() => handleInputFocus("email")}
            onBlur={handleInputBlur}
            focusedField={focusedField}
            isEmpty={!email}
          />
          {formErrors.email && (
            <p className="text-red-500 text-xs !mt-1" key={formErrors.email}>
              {formErrors.email}
            </p>
          )}
          <button
            type="submit"
            className="w-full h-[43px] bg-[#0F0C17] hover:bg-color-hover text-white rounded-xl font-semibold transition-all"
          >
            Generate OTP
          </button>
        </div>
      )}

      {/* Step 2: OTP input and timer */}
      {step === 2 && (
        <div className="space-y-6">
          <TextInput
            label="Enter OTP"
            name="otp"
            value={otp}
            onChange={(e) => handleInputChange(e, setOtp)}
            onFocus={() => handleInputFocus("otp")}
            onBlur={handleInputBlur}
            focusedField={focusedField}
            isEmpty={!otp}
          />
          {formErrors.otp && (
            <p className="text-red-500 text-xs !mt-1" key={formErrors.otp}>
              {formErrors.otp}
            </p>
          )}
          <p className="text-gray-500 text-sm">
            Resend OTP in {Math.floor(timer / 60)}:
            {("0" + (timer % 60)).slice(-2)}
          </p>
          <button
            type="submit"
            className="w-full h-[43px] bg-[#0F0C17] hover:bg-color-hover text-white rounded-xl font-semibold transition-all"
          >
            Verify OTP
          </button>
          <button
            type="button"
            onClick={handleResendOtp}
            className="w-full h-[43px] bg-gray-300 hover:bg-gray-400 text-black rounded-xl font-semibold transition-all"
          >
            Resend OTP
          </button>
        </div>
      )}

      {/* Step 3: Password reset */}
      {step === 3 && (
        <div className="space-y-6">
          <TextInput
            label="New Password"
            name="password"
            type="password"
            minLength="8"
            value={password}
            onChange={(e) => handleInputChange(e, setPassword)}
            onFocus={() => handleInputFocus("password")}
            onBlur={handleInputBlur}
            focusedField={focusedField}
            isEmpty={!password}
          />
          <TextInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            minLength="8"
            value={confirmPassword}
            onChange={(e) => handleInputChange(e, setConfirmPassword)}
            onFocus={() => handleInputFocus("confirmPassword")}
            onBlur={handleInputBlur}
            focusedField={focusedField}
            isEmpty={!confirmPassword}
          />
          {formErrors.password && (
            <p className="text-red-500 text-xs !mt-1" key={formErrors.password}>
              {formErrors.password}
            </p>
          )}
          <button
            type="submit"
            className="w-full h-[43px] bg-[#0F0C17] hover:bg-color-hover text-white rounded-xl font-semibold transition-all"
          >
            Reset Password
          </button>
        </div>
      )}

      {/* Step 4: Success message */}
      {step === 4 && (
        <div className="space-y-6">
          <p className="text-gray-500 text-sm">Password reset successfully!</p>
          <button
            type="submit"
            onClick={() => props.moveBackToLogIn && props.moveBackToLogIn()}
            className="w-full h-[43px] bg-[#0F0C17] hover:bg-color-hover text-white rounded-xl font-semibold transition-all"
          >
            Go back to Log In
          </button>
        </div>
      )}
    </form>
  );
};

export default ForgotPassword;
