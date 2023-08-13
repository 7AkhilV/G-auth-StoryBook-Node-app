const mongoose = require("mongoose");

// Define the schema for a Story
const StorySchema = new mongoose.Schema({
  // Title of the story
  title: {
    type: String,
    required: true,
    trim: true,
  },
  // Body content of the story
  body: {
    type: String,
    required: true,
  },
  // Status of the story (public or private)
  status: {
    type: String,
    default: "public",
    enum: ["public", "private"],
  },
  // Reference to the user who created the story
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // Timestamp for when the story was created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the "Story" model using the StorySchema
module.exports = mongoose.model("Story", StorySchema);
