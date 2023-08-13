const mongoose = require("mongoose");

// Define the schema for a User
const UserSchema = new mongoose.Schema({
  // Google ID associated with the user
  googleId: {
    type: String,
    required: true,
  },
  // Display name of the user
  displayName: {
    type: String,
    required: true,
  },
  // First name of the user
  firstName: {
    type: String,
    required: true,
  },
  // Last name of the user
  lastName: {
    type: String,
    required: true,
  },
  // URL of the user's profile image
  image: {
    type: String,
  },
  // Timestamp for when the user was created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the "User" model using the UserSchema
module.exports = mongoose.model("User", UserSchema);
