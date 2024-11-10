"use client";
import HttpKit from "@/common/helpers/HttpKit";
import { addToCart } from "@/utils/ItemAddToCart";
import React, { useState, useEffect } from "react";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await HttpKit.getAllRecipies();
        setRecipes(res.meals);
        setDisplayedRecipes(res.meals.slice(0, visibleCount));
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const loadMoreRecipes = () => {
    const newVisibleCount = visibleCount + 8;
    setDisplayedRecipes(recipes.slice(0, newVisibleCount));
    setVisibleCount(newVisibleCount);
  };
  return (
    <div className="bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-8 mt-10">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          All Recipes
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {displayedRecipes.map((recipe, index) => (
            <div
              key={index}
              className="recipe-card bg-white border rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {recipe.strMeal}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{recipe.strArea}</p>
                <a
                  href={`/recipe/${recipe.idMeal}`}
                  className="text-yellow-500 mt-4 inline-block text-sm font-semibold transition-colors hover:text-yellow-700"
                >
                  View Recipe
                </a>
                <button
                  onClick={() => addToCart(recipe)}
                  className="mt-4 w-full px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          {visibleCount < recipes.length ? (
            <button
              onClick={loadMoreRecipes}
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Load More
            </button>
          ) : (
            <p className="text-gray-500">No more recipes to load</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllRecipes;
