"use client";
import HttpKit from "@/common/helpers/HttpKit";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState, useEffect, useRef } from "react";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const loaderRef = useRef(null);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["recipes"],
      queryFn: ({ pageParam = 1 }) => HttpKit.getAllRecipies(pageParam,2), // Fetch 10 recipes per page
      getNextPageParam: (lastPage) => {
        // If there are more meals, return the next page number, else return false to stop pagination
        return lastPage.meals.length > 0 ? lastPage.page + 1 : false;
      },
    });

  useEffect(() => {
    if (data) {
      const allRecipes = data.pages.flatMap((page) => page.meals);
      setRecipes(allRecipes);
    }
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage && hasNextPage) {
          fetchNextPage(); // Trigger fetch for next page when the loader is in view
        }
      },
      { rootMargin: "200px" }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [isFetchingNextPage, fetchNextPage, hasNextPage]);

  // Stop requesting if there are no more pages
  useEffect(() => {
    if (!hasNextPage) {
      // Optional: You can unobserve the loader here to stop further requests
      if (loaderRef.current) {
        const observer = new IntersectionObserver(() => {});
        observer.unobserve(loaderRef.current);
      }
    }
  }, [hasNextPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-8 mt-10">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          All Recipes
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {recipes?.map((recipe, index) => (
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
              </div>
            </div>
          ))}
        </div>
        {isFetchingNextPage && (
          <div className="text-center mt-4 text-gray-500">Loading more...</div>
        )}
        <div ref={loaderRef} className="h-12"></div>
      </div>
    </div>
  );
};

export default AllRecipes;
