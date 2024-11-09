"use client";
import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import {
  Button,
  FormHelperText,
  Input,
  InputLabel,
  Stack,
} from "@mui/material";
import { BiHide, BiShow } from "react-icons/bi";
import SignUpPresenter from './SignUpPresenter';

import toast from "react-hot-toast";

const SignUpModule = ({setAuthRoute}) => {
  const [signUpInfo, setSignUpInfo] = useState({
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const presenter = new SignUpPresenter({
    showError: (msg) => setMessage(msg),
    showSuccess: (msg) => setMessage(msg),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    presenter.handleSignUp(signUpInfo);
    setSignUpInfo({ username: "", phoneNumber: "", email: "", password: "" });
    setAuthRoute("login")
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignUpInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 max-w-md mx-auto font-Poppins"
      >
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            type="text"
            name="username"
            className="dark:text-white text-black"
            id="username"
            value={signUpInfo.username}
            onChange={handleChange}
            required
          />
        </FormControl>
        
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="email">Email address</InputLabel>
          <Input
            type="email"
            name="email"
            className="dark:text-white text-black"
            id="email"
            value={signUpInfo.email}
            onChange={handleChange}
            required
          />
        </FormControl>
        
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
          <Input
            type="text"
            name="phoneNumber"
            className="dark:text-white text-black"
            id="phoneNumber"
            value={signUpInfo.phoneNumber}
            onChange={handleChange}
            required
          />
        </FormControl>
        
        <div>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              className="dark:text-white text-black"
              id="password"
              value={signUpInfo.password}
              onChange={handleChange}
              required
            />
            {showPassword ? (
              <BiShow
                size={22}
                className="absolute bottom-[42px] right-2 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <BiHide
                size={22}
                className="absolute bottom-[42px] right-2 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
            <FormHelperText className="dark:text-white text-black">
              Minimum 6 characters
            </FormHelperText>
          </FormControl>
        </div>
        
        <div className="w-full mt-5">
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </div>
        
        {message && <p className="text-red-500 text-center">{message}</p>}
      </form>
    </>
  );
};

export default SignUpModule;