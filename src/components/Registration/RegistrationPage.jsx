import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { colleges } from "../../constants";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    retypePassword: "",
    firstName: "",
    lastName: "",
    gender: "",
    college: "",
    agreeTerms: false,
    applyForCollege: false,
  });

  const [errors, setErrors] = useState({
    password: "",
    retypePassword: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Clear the error message when the user starts typing in password or retypePassword fields
    if (name === "password" || name === "retypePassword") {
      setErrors({
        password: "",
        retypePassword: "",
      });
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Check if password and retypePassword match
    if (formData.password !== formData.retypePassword) {
      newErrors.password = "Passwords do not match!";
      newErrors.retypePassword = "Passwords do not match!";
    }

    if (Object.keys(newErrors).length === 0) {
      // If no errors, submit form data
      console.log("Form Data Submitted:", formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="bg-background-gradient min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="relative mb-6">
          <Link
            to="/"
            className="absolute left-0 text-xl text-black hover:text-gray-800"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h2 className="text-2xl font-bold text-[#4a2c75] text-center">
            Registration Now!
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* First Name and Last Name */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="pl-5 w-full h-10 border rounded focus:outline-none focus:ring-2 focus:ring-[#4a2c75] bg-white text-black placeholder:text-gray-400"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="pl-5 w-full h-10 border rounded focus:outline-none focus:ring-2 focus:ring-[#4a2c75] bg-white text-black placeholder:text-gray-400"
            />
          </div>

          {/* Email */}
          <div className="relative mb-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <i className="fa fa-envelope"></i>
            </span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="pl-5 w-full h-10 border rounded focus:outline-none focus:ring-2 focus:ring-[#4a2c75] bg-white text-black placeholder:text-gray-400"
            />
          </div>

          {/* Password */}
          <div className="relative mb-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <i className="fa fa-lock"></i>
            </span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="pl-5 w-full h-10 border rounded focus:outline-none focus:ring-2 focus:ring-[#4a2c75] bg-white text-black placeholder:text-gray-400"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>

          {/* Re-type Password */}
          <div className="relative mb-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <i className="fa fa-lock"></i>
            </span>
            <input
              type="password"
              name="retypePassword"
              placeholder="Re-type Password"
              value={formData.retypePassword}
              onChange={handleChange}
              required
              className="pl-5 w-full h-10 border rounded focus:outline-none focus:ring-2 focus:ring-[#4a2c75] bg-white text-black placeholder:text-gray-400"
            />
            {errors.retypePassword && (
              <span className="text-red-500 text-sm">
                {errors.retypePassword}
              </span>
            )}
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="inline-flex items-center mr-4 text-black">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                className="mr-2 bg-white border-gray-300 text-[#4a2c75] focus:ring-[#4a2c75]"
                required
              />
              Male
            </label>
            <label className="inline-flex items-center mr-4 text-black">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                className="mr-2 bg-white border-gray-300 text-[#4a2c75] focus:ring-[#4a2c75]"
                required
              />
              Female
            </label>
            <label className="inline-flex items-center text-black">
              <input
                type="radio"
                name="gender"
                value="Others"
                checked={formData.gender === "Others"}
                onChange={handleChange}
                className="mr-2 bg-white border-gray-300 text-[#4a2c75] focus:ring-[#4a2c75]"
                required
              />
              Others
            </label>
          </div>

          {/* College Dropdown */}
          <div className="relative mb-4">
            <select
              name="college"
              value={formData.college}
              onChange={handleChange}
              required
              className="pl-5 w-full h-10 border rounded focus:outline-none focus:ring-2 focus:ring-[#4a2c75] bg-white text-black placeholder:text-gray-400"
            >
              <option value="">Select a College</option>
              {colleges.map((college, index) => (
                <option key={index} value={college}>
                  {college}
                </option>
              ))}
            </select>
          </div>

          {/* Terms & Apply for College */}
          <div className="mb-4">
            <label className="inline-flex items-center text-black">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mr-2 bg-white border-gray-300 text-[#4a2c75] focus:ring-[#4a2c75]"
              />
              I agree with terms and conditions
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center text-black">
              <input
                type="checkbox"
                name="applyForCollege"
                checked={formData.applyForCollege}
                onChange={handleChange}
                className="mr-2 bg-white border-gray-300 text-[#4a2c75] focus:ring-[#4a2c75]"
              />
              I want to apply for my college
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#4a2c75] text-white w-full h-10 rounded hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#4a2c75]"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
