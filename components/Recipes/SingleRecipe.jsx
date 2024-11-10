import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { addToCart } from "@/utils/ItemAddToCart";
const SingleRecipe = ({ recipeId, setIsOpen }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recipe-details"],
    queryFn: () => HttpKit.getRecipeDetails(recipeId),
  });

  if (error) return "Error loading recipe details";
  if (isLoading) return "Loading...";
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
      <div className="flex justify-center items-center">
        <Image
        className="rounded-lg shadow-lg border-4"
          src={data?.strMealThumb}
          width={300}
          height={300}
          alt={data?.strMeal}
        />
      </div>
      <h2 className="text-3xl font-semibold text-[#713f12]">{data?.strMeal}</h2>
      <div className="border-t-2 border-t-[#fde047] my-4"></div>
      <p className="text-lg">
        {data?.strCategory} - {data?.strArea}
      </p>
      <p>{data?.strInstructions}</p>
      <div className="p-4">
        <h3 className="font-semibold text-xl mb-3">Ingredients:</h3>
        <ul className="flex flex-wrap gap-3">
          {Object.keys(data)
            .filter((key) => key.startsWith("strIngredient") && data[key])
            .map((key, index) => (
              <li
                key={index}
                className="bg-[#fde047] p-2 rounded-lg shadow-md flex items-center justify-between w-full sm:w-auto"
              >
                <span className="font-semibold">{data[key]}</span> -{" "}
                <span className="text-gray-600">
                  {data[`strMeasure${index + 1}`]}
                </span>
              </li>
            ))}
        </ul>
      </div>
      <div className="mt-3">
        <a
          href={data?.strYoutube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#fde047] bg-[#713f12] px-2 py-2 rounded-md hover:bg-[#5d2c0b] transition-colors duration-200"
        >
          Watch the recipe video on YouTube
        </a>
        <button
          onClick={() => addToCart(data)}
          className="mt-4 w-full px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleRecipe;
