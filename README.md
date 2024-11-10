# Recipe App

## New Features Implemented

### 1. User Authentication with LocalStorage
- Users can sign-up and log-in to the system.
- Upon successful login, the user information and login status are stored in `localStorage`.
- When the user logs out, the login information is removed from `localStorage`, ensuring that the user is logged out and no session data is retained.

### 2. All Recipes Page with Client-Side Pagination
- Implemented client-side pagination to fetch and display recipes as users interact with the page (e.g., by scrolling or clicking "Load More").
- This approach minimizes the initial data load and retrieves more data on demand, resulting in faster load times and a smoother browsing experience.
- Since the API doesn’t support pagination parameters like `page=1&limit=10`, a fixed set of recipes is loaded initially, and more are fetched on demand. Pagination is managed entirely on the client side.

### 3. Cart Functionality for Adding Recipes
- Users can add recipes to the cart from both the "All Recipes" page and the home page recipe list.
- A utility function is used to add items to the cart.
- If the user is not logged in, the cart data is saved in `localStorage`.
- If the user is logged in, the cart items are stored in the `cartInfo` property of the user's object.

### 4. Additional Features
- **React Hot Toast**: Integrated instant, customizable toast notifications.
- **Material UI**: Used for modern, responsive design elements.
- **Not Found Page**: Added a custom 404 page to handle missing routes and provide a better user experience.

## Issues and Solutions

### 1. Search Bar Not Functioning
- **Fix**: Search recipes by name when the search button is clicked.

### 2. Recipe Details (Modal)
- **Problems**:
  1. Not displaying content properly.
  2. Closing function not working.
  3. Required props were not passed in.
- **Solution**:
  - Passed the required props to the `<SingleRecipe />` component.
  - Removed unnecessary component inside the Modal in the RecipesList component.

### 3. Recipe Details HTTP Request
- **Problem**: 
  - Mixing async/await and `.then`. The `axios.get` request returns a promise, but the `response.data.meals` is executed before the promise resolves, resulting in undefined response data.
- **Solution**:
  - Fixed the issue by using `.then()` properly:
    ```javascript
    axios.get(...).then(response => {
      return response.data.meals ? response.data.meals[0] : null;
    });
    ```
  - Alternatively, used `async/await`:
    ```javascript
    getRecipeDetails: async (id) => {
      try {
        const response = await axios.get(`${BASE_URL}/lookup.php`, { params: { i: id } });
        return response.data.meals ? response.data.meals[0] : null;
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        throw error;
      }
    }
    ```

### 4. Not Found Page
- **Fix**: Added a custom "Not Found" page to handle 404 errors, which is displayed when users navigate to a non-existent route.

## Time Estimates

Here’s a rough time estimate for each task:

### 1. User Authentication with LocalStorage
- **Time Estimate**: 2-3 hours  
  Includes implementing sign-up, login, and handling `localStorage` for session persistence.

### 2. All Recipes Page with Client-Side Pagination
- **Time Estimate**: 3 hours  
  Implementing pagination logic, dynamic loading of data, and managing client-side behavior.

### 3. Cart Functionality for Adding Recipes
- **Time Estimate**: 2-3 hours  
  Adding recipes to the cart, storing them in `localStorage` or user object depending on login status.

### 4. Additional Features (React Hot Toast, Material UI, Not Found Page)
- **Time Estimate**: 2-3 hours  
  Integrating React Hot Toast for notifications, Material UI for design, and adding a custom 404 page.

### 5. Issues and Solutions
- **Time Estimate**: 4-6 hours  
  Debugging and fixing issues related to the search bar, modal, recipe details HTTP request, and 404 page.

### 6. Server Deployment
- **Time Estimate**: 1 hour  
  Deploying the app to a server, configuring environment variables, ensuring proper build processes, and handling any deployment issues.

---

### Total Time Estimate (Including Server Deployment)
**16-20 hours** (approximately 2-3 days, depending on the complexity and any unforeseen issues).

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
