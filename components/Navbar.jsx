"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import AuthModal from "./CustomModal/AuthModal";
import toast from "react-hot-toast";

const Navbar = () => {
  const [openAuthModal, setAuthModal] = useState(false);
  const [authRoute, setAuthRoute] = useState("");
  const [user, setUser] = useState(null);
  const [refreshNav, setRefreshNav] = useState(false);
  useEffect(() => {
    // Retrieve logged-in user data from localStorage
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      // Parse the stored user data and set the user state
      setUser(JSON.parse(loggedInUser));
    }
  }, [refreshNav]);

  const handleSignUp = () => {
    setAuthModal(true);
    setAuthRoute("signup");
  };

  const handleLogin = () => {
    setAuthModal(true);
    setAuthRoute("login");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("isLoggedIn");
    setUser(null); // Clear user state
    toast.success("Logout Success");
  };

  const handleLoginSuccess = (loggedInUserData) => {
    setUser(loggedInUserData);
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUserData));
    localStorage.setItem("isLoggedIn", true);
    setAuthModal(false);
    toast.success("Login successful!");
  };

  return (
    <>
      <nav className="fixed z-50 w-full bg-white md:absolute md:bg-transparent">
        <div className="container m-auto px-2 md:px-12 lg:px-7">
          <div className="flex flex-wrap items-center justify-between py-3 gap-6 md:py-4 md:gap-0">
            <input
              type="checkbox"
              name="toggle_nav"
              id="toggle_nav"
              className="peer hidden"
            />
            <div className="w-full px-6 flex justify-between lg:w-max md:px-0 z-30">
              <Link
                href="/"
                aria-label="logo"
                className="flex space-x-2 items-center"
              >
                <span className="text-2xl font-bold text-yellow-900 ">
                  Tailus <span className="text-yellow-700 ">Feedus</span>
                </span>
              </Link>

              <div className="flex items-center lg:hidden max-h-10">
                <label
                  role="button"
                  htmlFor="toggle_nav"
                  aria-label="hamburger"
                  id="hamburger"
                  className="relative w-10 h-auto p-2"
                >
                  <div
                    id="line"
                    className="m-auto h-0.5 w-6 rounded bg-yellow-900  transition duration-300"
                  ></div>
                  <div
                    id="line2"
                    className="m-auto mt-2 h-0.5 w-6 rounded bg-yellow-900  transition duration-300"
                  ></div>
                </label>
              </div>
            </div>

            <label
              role="button"
              htmlFor="toggle_nav"
              className="hidden peer-checked:block fixed w-full h-full left-0 top-0 z-10 bg-yellow-200  bg-opacity-30 backdrop-blur backdrop-filter"
            ></label>
            <div className="hidden peer-checked:flex w-full flex-col lg:flex lg:flex-row justify-end z-30 items-center gap-y-6 p-6 rounded-xl bg-white lg:gap-y-0 lg:p-0 md:flex-nowrap lg:bg-transparent lg:w-7/12">
              <div className="text-gray-600 lg:pr-4 w-full">
                <ul className="tracking-wide font-medium text-sm flex flex-col gap-y-6 lg:gap-y-0 lg:flex-row w-full">
                  <li>
                    <Link
                      href="/all-recipes"
                      className="block md:px-4 transition hover:text-yellow-700"
                    >
                      <span>All recipes</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cart"
                      className="block md:px-4 transition hover:text-yellow-700"
                    >
                      <span>Cart</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="w-full min-w-max space-y-2 border-yellow-200 lg:space-y-0 sm:w-max lg:border-l ">
                {user ? (
                  // If user is logged in, show their name and a logout button
                  <div className="space-x-4 flex items-center">
                    <span className="text-sm text-yellow-900">
                      Hello, {user.username || user.email}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
                    >
                      <span className="block text-yellow-900 font-semibold text-sm">
                        Logout
                      </span>
                    </button>
                  </div>
                ) : (
                  // If user is not logged in, show Sign Up and Login buttons
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={handleSignUp}
                      title="Start buying"
                      className="w-full py-3 px-6 text-center rounded-full transition active:bg-yellow-200 focus:bg-yellow-100 sm:w-max"
                    >
                      <span className="block text-yellow-800 font-semibold text-sm">
                        Sign up
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={handleLogin}
                      title="Start buying"
                      className="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
                    >
                      <span className="block text-yellow-900 font-semibold text-sm">
                        Login
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {
            <AuthModal
              authRoute={authRoute}
              setAuthRoute={setAuthRoute}
              setAuthModal={setAuthModal}
              // handleLoginSuccess={handleLoginSuccess}
              openAuthModal={openAuthModal}
              setRefreshNav={setRefreshNav}
            />
          }
        </div>
      </nav>
    </>
  );
};

export default Navbar;
