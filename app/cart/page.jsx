"use client"
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

  return (
    <div className="bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto mt-10">
        <h1 className="text-4xl mb-6">Your Cart</h1>
        <div className="space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.idMeal}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row items-center"
              >
                <img
                  src={item.strMealThumb}
                  alt={item.strMeal}
                  className="w-24 h-24 rounded-md"
                />
                <div className="ml-4">
                  <h2 className="text-2xl font-bold">{item.strMeal}</h2>
                  <p className="text-gray-600">{item.strCategory}</p>
                  <p className="text-gray-600">{item.strArea}</p>
                  <a
                    href={item.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Recipe Source
                  </a>
                  <p className="mt-2 text-sm text-gray-500">
                    {item.strInstructions.slice(0, 100)}...
                  </p>
                </div>
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
