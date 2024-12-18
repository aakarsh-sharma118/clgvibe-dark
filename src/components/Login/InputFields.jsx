import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

/**
 * Reusable InputFields component for handling text, password, checkbox, and radio inputs.
 * Automatically manages focus, blur, and input value internally, or uses an external value if provided.
 *
 * Props:
 * @param {string} label - The label for the input field.
 * @param {string} name - The name attribute for the input field.
 * @param {any} value - The value of the input field (managed externally if provided).
 * @param {string} type - The type of the input field (e.g., "text", "password", "checkbox", "radio"). Defaults to "text".
 * @param {array} options - For select dropdown, the array of options to display.
 * @param {number} minLength - Minimum length for text inputs. Defaults to 2.
 * @param {function} onChange - Function to handle input value changes externally.
 * @param {string} className - Custom classes to style the component.
 * @param {boolean} required - If true, the input is required. Defaults to false.
 * @param {string} error - Error message to be displayed if there's an error.
 */
const InputFields = ({
  label,
  name,
  value,
  type = "text",
  options = [],
  minLength = 2,
  onChange,
  required = false,
  className = "",
  error = "",
}) => {
  // State for managing the input value internally
  const [inputValue, setInputValue] = useState(value || "");
  // State for tracking focus
  const [isFocused, setIsFocused] = useState(false);
  // State for toggling password visibility (only for password fields)
  const [showPassword, setShowPassword] = useState(false);

  // Sync external value changes with internal state
  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  // Determine the actual input type (toggle between "text" and "password" if applicable)
  const inputType = type === "password" && showPassword ? "text" : type;

  // Check if the input field is empty
  const isEmpty = !inputValue.trim();

  // Handle input changes
  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue); // Update internal state
    if (onChange) onChange(e); // Notify parent if onChange is provided
  };

  // Render for dropdown (select) input type
  if (type === "select") {
    return (
      <>
        <div className={`relative ${className}`}>
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
          <select
            name={name}
            value={inputValue}
            onChange={handleChange}
            className="w-full h-full bg-transparent border-b border-gray-400 outline-none text-gray-900 focus:border-black transition-all duration-300"
            required={required}
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        {/* Error message */}
        {error && error !== "" && (
          <p className="text-red-500 text-xs !mt-1">{error}</p>
        )}
      </>
    );
  }

  // Render for checkbox and radio input types
  if (type === "checkbox" || type === "radio") {
    return (
      <>
        <div className={`flex items-center space-x-2 ${className}`}>
          <input
            type={type}
            name={name}
            checked={inputValue === "true"}
            onChange={(e) =>
              handleChange({
                ...e,
                target: { ...e.target, value: e.target.checked.toString() },
              })
            }
            className="form-checkbox w-5 h-5 text-gray-900 border-gray-400 focus:ring-black transition-all duration-300"
          />
          <label htmlFor={name} className="text-gray-900">
            {label}
          </label>
        </div>
        {/* Error message */}
        {error && error !== "" && (
          <p className="text-red-500 text-xs !mt-1">{error}</p>
        )}
      </>
    );
  }

  // Render for text and password input types
  return (
    <>
      <div className={`relative h-[50px] ${className}`}>
        {/* Input Field */}
        <input
          id={name}
          type={inputType}
          name={name}
          minLength={minLength}
          value={inputValue}
          onChange={handleChange} // Handle changes internally
          onFocus={() => setIsFocused(true)} // Track focus state
          onBlur={() => setIsFocused(false)} // Track blur state
          className={`w-full h-full bg-transparent border-b border-gray-400 outline-none text-gray-900 focus:border-black transition-all duration-300 ${
            isFocused || !isEmpty ? "active" : ""
          }`}
          required={required}
        />
        {/* Label */}
        <label
          htmlFor={name}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 transition-all duration-300 ${
            isFocused || !isEmpty ? "text-sm top-[-2px]" : "text-base top-1/2"
          }`}
        >
          {label}
        </label>
        {/* Show/Hide Password Toggle */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)} // Toggle password visibility
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        )}
      </div>
      {/* Error message */}
      {error && error !== "" && (
        <p className="text-red-500 text-xs !mt-1">{error}</p>
      )}
    </>
  );
};

export default InputFields;
