"use client";
import React, { useState } from "react";
import { signIn } from 'next-auth/react';
import Link from "next/link";
import "./login.css"; // Ensure this CSS file exists

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const result = await signIn('credentials', {
      redirect: false, // Prevent automatic redirect
      email,
      password,
    });
  
    console.log('Login result:', result); // Add this for debugging
  
    if (result?.error) {
      // Set error if login fails
      setError(result.error);
    } else if (result?.ok) {
      // Redirect if login is successful
      window.location.href = '/display';
    }
  };
  

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
        <div className="no-account">
          <p>
            Don't have an account? <Link href="/signup">Sign up here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
