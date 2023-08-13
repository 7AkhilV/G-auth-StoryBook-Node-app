const express = require("express");
const passport = require("passport");
const router = express.Router();

// Route to initiate Google OAuth 2.0 authentication
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// Callback route for handling Google OAuth 2.0 authentication results
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Redirect to the dashboard upon successful authentication
    res.redirect("/dashboard");
  }
);

// Route to log out the user and end the session
router.get("/logout", (req, res, next) => {
  // Call the `logout` method to end the user's session
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    // Redirect the user to the home page after logging out
    res.redirect("/");
  });
});

// Export the router to make it available for other parts of the application
module.exports = router;
