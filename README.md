# Recipe App

# Recipe Application Issues and Solutions

This document outlines some issues encountered in the Recipe Application and provides solutions to fix them.

---

## 1. Search Bar Not Functioning
### Issue
The search bar is not working as expected when trying to search recipes by name upon clicking the search button.

### Solution
- Implement the "Search Recipes by Name" functionality to handle the search button click event properly.

---

## 2. Recipe Details (Modal)
### Issues
- Content within the modal is not displaying correctly.
- The close function for the modal is not working.
- Required props were not passed to the `<SingleRecipe />` component.

### Solution
- Ensure all necessary props are passed to the `<SingleRecipe />` component.
- Remove any unnecessary components inside the modal within the `RecipesList` component to clean up and improve functionality.

---

## 3. Recipe Details HTTP Request
### Issue
The `getRecipeDetails` function is mixing `async/await` and `.then` syntax, which causes the `axios.get` request to return a promise that does not resolve before attempting to access `response.data.meals`. This results in `response` being undefined and the function returning an undefined value.

### Solution
- **Option 1**: Use a `.then` chain correctly:
    ```javascript
    return axios.get(...).then(response => {
      return response.data.meals ? response.data.meals[0] : null;
    });
    ```
- **Option 2**: Use `async/await` (Implemented Solution):
    ```javascript
    getRecipeDetails: async (id) => {
      try {
        const response = await axios.get(`${BASE_URL}/lookup.php`, {
          params: { i: id },
        });
        return response.data.meals ? response.data.meals[0] : null;
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        throw error;
      }
    };
    ```

This solution properly handles asynchronous operations and ensures that the recipe details are retrieved correctly.

---
