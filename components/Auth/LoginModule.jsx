"use client";
import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import { Button, Input, InputLabel } from "@mui/material";
import { BiHide, BiShow } from "react-icons/bi";
import toast from "react-hot-toast";

const LoginModule = ({ setAuthModal,setRefreshNav }) => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const storedUserData = JSON.parse(localStorage.getItem("users"));
    if (!storedUserData || !Array.isArray(storedUserData)) {
      toast.error("No users found. Please sign up first.");
      return;
    }
    // Check email and password
    const user = storedUserData.find(
      (user) =>
        user.email === loginInfo.email && user.password === loginInfo.password
    );
    console.log(user);
    if (user) {
      const cartData = JSON.parse(localStorage.getItem("cart")) || [];
      
      const userWithCartInfo = {
        ...user, 
        cartInfo: cartData, 
      };
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("loggedInUser", JSON.stringify(userWithCartInfo)); // Store user info
      toast.success("Login successful!");
      setRefreshNav(true)
      setAuthModal(false);
    } else {
      toast.error("Invalid email or password.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleLogin}
        className="space-y-4 p-4 max-w-md mx-auto font-Poppins"
      >
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="email">Email address</InputLabel>
          <Input
            type="email"
            name="email"
            className="text-black"
            id="email"
            value={loginInfo.email}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="password" className="text-black">
            Password
          </InputLabel>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            className="text-black relative"
            id="password"
            value={loginInfo.password}
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
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginModule;
