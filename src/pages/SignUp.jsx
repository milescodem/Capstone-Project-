import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import React from "react";
import "./SignUp.css";

export default function SignUp() {
  return (
    <div className="signup-page">
      <div className="signup-card">

        <div className="signup-header">
          <h1>Create Account</h1>
          <p>Sign up to get started.</p>
        </div>

        <form className="signup-form">

          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Create a password" />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
            />
          </div>

          <button className="signup-btn" type="submit">
            Create Account
          </button>

        </form>

        <div className="signup-footer">
          Already have an account? <a href="/login">Login</a>
        </div>

      </div>
    </div>
  );  }