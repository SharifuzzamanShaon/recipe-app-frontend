// models/UserModel.js
export default class UserModel {
  // Save user data to localStorage
  static saveUserData(userData) {
    // Retrieve existing users from localStorage or initialize an empty array if none exist
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Add new user to the users array
    users.push(userData);

    // Save the updated users array back to localStorage
    localStorage.setItem("users", JSON.stringify(users));
  }

  // Validate user data
  static validate(userData) {
    const { username, phoneNumber, email, password } = userData;

    // Check for missing fields
    if (!username || !phoneNumber || !email || !password) {
      return "All fields are required";
    }

    // Check username length
    if (username.length < 3) {
      return "Username must be at least 3 characters long";
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }

    // Validate phone number (basic format: only digits and length 10-15)
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return "Phone number must be 10-15 digits";
    }

    // Check password length
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }

    return null; // No errors
  }

  // Retrieve all users
  static getAllUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }
}
