"use client"; // Mark the component to be rendered on the client side
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for useRouter in Next.js 13+ (app directory)
import Link from "next/link";
import "./signUp.css"; // Your CSS file
import axios from "axios";

const SignUp = () => {
  const router = useRouter(); // Initialize router for client-side navigation
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form data
  const validateForm = () => {
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

 // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  const errors = validateForm();
  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
  } else {
    try {
      // Create a new object without confirmPassword
      const { confirmPassword, ...dataToSend } = formData; // Destructure to exclude confirmPassword
      const response = await axios.post("/api/register", dataToSend);
      console.log("User registered:", response.data);
      // Redirect to the login page after successful sign-up
      router.push("/login");
    } catch (error) {
      console.log("Something went wrong:", error);
    }
  }
};


  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={formErrors.username ? "input-error" : ""}
          />
          {formErrors.username && (
            <p className="error-message">{formErrors.username}</p>
          )}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={formErrors.email ? "input-error" : ""}
          />
          {formErrors.email && (
            <p className="error-message">{formErrors.email}</p>
          )}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={formErrors.password ? "input-error" : ""}
          />
          {formErrors.password && (
            <p className="error-message">{formErrors.password}</p>
          )}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={formErrors.confirmPassword ? "input-error" : ""}
          />
          {formErrors.confirmPassword && (
            <p className="error-message">{formErrors.confirmPassword}</p>
          )}
        </div>

        <button type="submit" className="signup-button">
          Sign Up
        </button>
        <div className="already-account">
          <p>
            Already have an account? <Link href="/login">Login here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
