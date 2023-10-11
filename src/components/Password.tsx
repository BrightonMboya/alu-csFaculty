import React, { useState } from "react";
import Input from "./Input";

export default function Password({
  password,
  setPassword,
  label,
  placeholder,
}: any) {
  const [isMinLengthValid, setIsMinLengthValid] = useState(false);
  const [isSpecialCharValid, setIsSpecialCharValid] = useState(false);
  const [isUppercaseValid, setIsUppercaseValid] = useState(false);

  const handlePasswordChange = (e: any) => {
    const newPassword = e.target.value;

    // Regular expressions to check for criteria
    const minLengthRegex = /.{12,}/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    const uppercaseRegex = /[A-Z]/;

    // Check if the password meets the criteria
    const isMinLength = minLengthRegex.test(newPassword);
    const isSpecialChar = specialCharRegex.test(newPassword);
    const isUppercase = uppercaseRegex.test(newPassword);

    setIsMinLengthValid(isMinLength);
    setIsSpecialCharValid(isSpecialChar);
    setIsUppercaseValid(isUppercase);

    setPassword(newPassword);
  };

  const getValidationStyle = (isValid: boolean) => {
    return isValid ? "text-green font-medium" : "text-red-500";
  };

  return (
    <div className="container mx-auto mt-5 rounded-lg bg-white">
      <div className="mb-4">
        <label htmlFor="password" className="mb-2 block">
          {label}
        </label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder={placeholder}
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      {password.length > 0 && (
        <>
          <div className="mb-2 flex flex-col">
            <span className={`mr-2 ${getValidationStyle(isMinLengthValid)}`}>
              Min length (at least 12 characters)
            </span>
            <span className={`mr-2 ${getValidationStyle(isSpecialCharValid)}`}>
              Special character
            </span>
            <span className={`mr-2 ${getValidationStyle(isUppercaseValid)}`}>
              Uppercase letter (A-Z)
            </span>
          </div>
          <div
            className={`password-strength ${
              isMinLengthValid && isSpecialCharValid && isUppercaseValid
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            Password strength:{" "}
            {isMinLengthValid && isSpecialCharValid && isUppercaseValid
              ? "Strong"
              : "Weak"}
          </div>
        </>
      )}
    </div>
  );
}
