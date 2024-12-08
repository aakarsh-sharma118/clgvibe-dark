import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// Reusable TextInput component for input fields
const TextInput = ({
  label, // Label for the input field
  name, // Name attribute for the input field
  value, // Value of the input field
  onChange, // Function to handle input change events
  onFocus, // Function to handle input focus events
  onBlur, // Function to handle input blur events
  focusedField, // The field currently focused, used for styling
  isEmpty, // Boolean indicating if the input field is empty
  type = "text", // Type of the input (defaults to "text")
  minLength = 2, // Minimum length for the input value (defaults to 2)
}) => {
  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Determine input type based on 'type' prop and 'showPassword' state
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="relative h-[37px]">
      {/* Input field with conditional styling */}
      <input
        type={inputType} // Dynamically set the type (e.g., text, password)
        name={name} // Sets the name attribute for the input
        minLength={minLength} // Sets the minimum length for input validation
        value={value} // Binds the value prop to the input value
        onChange={onChange} // Attaches the change event handler
        className={`w-full h-full bg-transparent border-b border-gray-400 outline-none text-gray-900 focus:border-black transition-all duration-300 input-field ${
          focusedField === name || !isEmpty ? "active" : "" // Adds 'active' class when input is focused or not empty
        }`}
        onFocus={() => onFocus(name)} // Calls the onFocus handler when input is focused
        onBlur={onBlur} // Calls the onBlur handler when input loses focus
        required // Makes the input field mandatory
      />
      {/* Label element for the input field */}
      <label
        htmlFor={name} // Associates the label with the input using the 'name' attribute
        className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 transition-all duration-300 ${
          focusedField === name || !isEmpty // Changes label styling based on focus or content
            ? "text-sm top-[-2px]" // Smaller, higher label when input is active
            : "text-base top-1/2" // Default styling for the label
        }`}
      >
        {label} {/* Displays the label text */}
      </label>
      {/* Show/Hide password toggle button */}
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)} // Toggle the password visibility
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye} // Toggle icon based on visibility state
          />
        </button>
      )}
    </div>
  );
};

export default TextInput; // Exports the TextInput component for use in other parts of the application
