const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const Story = require("../models/Story");

// Route to the home page (login) for guests
router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

// Route to the dashboard for authenticated users
router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    // Retrieve stories associated with the authenticated user from the database
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render("dashboard", {
      name: req.user.firstName,
      stories,
    });
  } catch (err) {
    console.error(err);
    // Render an error page if there's an issue retrieving stories
    res.render("error/500");
  }
});

// Export the router to make it available for other parts of the application
module.exports = router;
