import Image from "next/image";
import React from "react";

const RecipeCard = ({ recipe, handleDetailsOpen }) => {

  return (
    <div
      onClick={() => handleDetailsOpen(recipe?.idMeal)}
      className="group space-y-6 border border-gray-100  rounded-3xl bg-white  px-4 py-4 text-center shadow hover:cursor-pointer hover:shadow-xl transition duration-200 shadow-gray-600/10"
    >
      {recipe?.strMealThumb && (
        <Image
          className="mx-auto rounded-2xl"
          src={recipe?.strMealThumb}
          alt="Recipe Image"
          loading="lazy"
          width={500}
          height={500}
        />
      )}
      <h3 className="text-2xl font-semibold text-gray-800">
        {recipe?.strMeal}
      </h3>
      <p>{recipe.strInstructions ? recipe.strInstructions?.slice(0, 50) + "..." : ""}</p>
      <div className="relative mx-auto flex items-center justify-center invisible  group-hover:visible">
        <button className="mt-4 w-full px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold transition-colors">
          Click to see details
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
