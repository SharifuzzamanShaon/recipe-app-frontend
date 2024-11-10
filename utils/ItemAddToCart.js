export const addToCart = (recipe) => {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn) {
    // User is logged in, get the logged-in user info
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const cartInfo = loggedInUser.cartInfo || [];
    const itemInCart = cartInfo.find((item) => item.idMeal === recipe.idMeal);
    if (!itemInCart) {
      // Add the recipe to cartInfo
      cartInfo.push(recipe);
      // Update the user's cartInfo in locaStorage
      loggedInUser.cartInfo = cartInfo;
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      alert(`${recipe.strMeal} has been added to your cart.`);
    } else {
      alert(`${recipe.strMeal} is already in your cart.`);
    }
  } else {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemInCart = cart.find((item) => item.idMeal === recipe.idMeal);

    if (!itemInCart) {
      // Add the new recipe to the cart
      cart.push(recipe);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${recipe.strMeal} has been added to your cart.`);
    } else {
      alert(`${recipe.strMeal} is already in your cart.`);
    }
  }
};