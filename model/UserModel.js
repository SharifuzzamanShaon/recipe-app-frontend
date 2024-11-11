// models 
export default class UserModel {
  static saveUserData(userData) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    users.push(userData);

    // Save the updated users to localStorage
    localStorage.setItem("users", JSON.stringify(users));
  }

  static validate(userData) {
    const { username, phoneNumber, email, password } = userData;

    // Check for missing fields
    if (!username || !phoneNumber || !email || !password) {
      return "All fields are required";
    }
    if (username.length < 3) {
      return "Username must be at least 3 characters long";
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return "Phone number must be 10-15 digits";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }

    return null; 
  }

  static getAllUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }
}
