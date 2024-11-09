"use client";
import { useEffect, useState } from "react";
import Hero from "../components/Hero/Hero";
import RecipesList from "../components/Recipes/RecipesList";
export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {/* {isClient ? <Hero /> : "Loading..."}
      {isClient ? <RecipesList /> : "Loading..."} */}
      <h3>Jeo</h3>
    </div>
  );
}
