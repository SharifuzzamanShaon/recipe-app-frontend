"use client";
import React, { useEffect, useState } from "react";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    const guestCart = localStorage.getItem("cart");
    if (loggedInUser) {
      const userCart = JSON.parse(loggedInUser).cartInfo;
      setCartItems(userCart);
    } else if (guestCart) {
      setCartItems(JSON.parse(guestCart));
    }
  }, []);
  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.idMeal !== itemId);
    setCartItems(updatedCart);
    // Update cart in localStorage
    if (user) {
      const updatedUser = { ...user, cartInfo: updatedCart };
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    } else {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
        <div className="space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.idMeal}
                className="bg-white shadow-lg rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4 hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.strMealThumb}
                    alt={item.strMeal}
                    className="w-24 h-24 rounded-md object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {item.strMeal}
                    </h2>
                    <p className="text-gray-600">{item.strCategory}</p>
                    <p className="text-gray-600">{item.strArea}</p>
                    <a
                      href={item.strSource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm mt-2"
                    >
                      Recipe Source
                    </a>
                    <p className="mt-2 text-sm text-gray-500">
                      {item.strInstructions.slice(0, 100)}...
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.idMeal)}
                  className="text-red-500 hover:text-red-700 font-semibold transition-colors mt-2 md:mt-0"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
