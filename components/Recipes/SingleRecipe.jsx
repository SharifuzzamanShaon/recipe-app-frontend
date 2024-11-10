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
  
  console.log("Recipe details:", data);
  if (error) return "Error loading recipe details";
  if (isLoading) return "Loading...";
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
      <div>
        <Image
          src={data?.strMealThumb}
          width={400}
          height={400}
          alt={data?.strMeal}
        />
      </div>
      <h2 className="text2xl font-semibold">{data?.strMeal}</h2>
      <p className="text-lg">
        {data?.strCategory} - {data?.strArea}
      </p>
      <p>{data?.strInstructions}</p>
      <div>
        <h3 className="font-semibold">Ingredients:</h3>
        <ul>
          {Object.keys(data)
            .filter((key) => key.startsWith("strIngredient") && data[key])
            .map((key, index) => (
              <li key={index}>
                {data[key]} - {data[`strMeasure${index + 1}`]}
              </li>
            ))}
        </ul>
      </div>
      <div className="mt-3">
        <a
          href={data?.strYoutube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#fde047] bg-[#713f12] px-4 py-2 rounded-md hover:bg-[#5d2c0b] transition-colors duration-200"
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
