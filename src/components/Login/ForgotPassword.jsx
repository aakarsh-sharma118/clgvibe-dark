import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import InputFields from "./InputFields";
import { isEmailValid } from "../../constants";

const ForgotPassword = (props) => {
  // State to manage the current step of the form
  const [step, setStep] = useState(1);

  // State to hold user inputs
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State to manage form error messages
  const [formErrors, setFormErrors] = useState({});

  // Timer state for OTP resend countdown
  const [timer, setTimer] = useState(props.timerDuration);

  // State to handle the resend OTP spinner
  const [isResendingOtp, setIsResendingOtp] = useState(false);

  // Effect to handle OTP countdown timer
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  // Function to handle OTP resend logic
  const handleResendOtp = () => {
    setIsResendingOtp(true);
    setTimeout(() => {
      setTimer(props.timerDuration); // Reset the timer
      setIsResendingOtp(false); // Stop the spinner
      setFormErrors({ otp: "OTP has been resent. Please check your email." });
    }, 2000); // Simulated delay
  };

  // Function to handle form submission
  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();

    // Step 1: Validate email
    if (step === 1) {
      if (!email) {
        setFormErrors({ email: "Email is required" });
      } else if (!isEmailValid(email)) {
        setFormErrors({ email: "Invalid email format" });
      } else {
        setFormErrors({});
        setStep(2);
        setTimer(props.timerDuration);
      }
    }

    // Step 2: Validate OTP
    else if (step === 2) {
      if (!otp) {
        setFormErrors({ otp: "OTP is required" });
      } else {
        setFormErrors({});
        setStep(3);
      }
    }

    // Step 3: Validate passwords
    else if (step === 3) {
      if (!password || !confirmPassword) {
        setFormErrors({
          password: "Password and confirm password are required",
        });
      } else if (password !== confirmPassword) {
        setFormErrors({ password: "Passwords do not match" });
      } else {
        setFormErrors({});
        setStep(4);
      }
    }
  };

  // Function to handle user input changes and clear error messages
  const handleInputChange = (setter, field) => (e) => {
    const value = e.target.value;
    setter(value);
    if (value.trim()) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }
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

      {/* Heading */}
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
          <InputFields
            label="Email"
            name="email"
            value={email}
            onChange={handleInputChange(setEmail, "email")}
          />
          {formErrors.email && (
            <p className="text-red-500 text-xs !mt-1">{formErrors.email}</p>
          )}
          <button
            type="submit"
            className="w-full h-[43px] bg-[#0F0C17] hover:bg-color-hover text-white rounded-xl font-semibold transition-all"
          >
            Generate OTP
          </button>
        </div>
      )}

      {/* Step 2: OTP input */}
      {step === 2 && (
        <div className="space-y-6">
          <InputFields
            label="Enter OTP"
            name="otp"
            value={otp}
            onChange={handleInputChange(setOtp, "otp")}
          />
          {formErrors.otp && (
            <p className="text-red-500 text-xs !mt-1">{formErrors.otp}</p>
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
            disabled={timer > 0 || isResendingOtp}
            className={`w-full h-[43px] rounded-xl font-semibold transition-all ${
              timer > 0 || isResendingOtp
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-300 hover:bg-gray-400 text-black"
            }`}
          >
            {isResendingOtp ? "Resending..." : "Resend OTP"}
          </button>
        </div>
      )}

      {/* Step 3: Password reset */}
      {step === 3 && (
        <div className="space-y-6">
          <InputFields
            label="New Password"
            name="password"
            type="password"
            minLength="8"
            value={password}
            onChange={handleInputChange(setPassword, "password")}
          />
          <InputFields
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            minLength="8"
            value={confirmPassword}
            onChange={handleInputChange(setConfirmPassword, "confirmPassword")}
          />
          {formErrors.password && (
            <p className="text-red-500 text-xs !mt-1">{formErrors.password}</p>
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
