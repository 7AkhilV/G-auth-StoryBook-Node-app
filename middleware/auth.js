module.exports = {
  // Middleware to ensure that a user is authenticated
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      // If the user is authenticated, continue to the next middleware or route handler
      return next();
    } else {
      // If the user is not authenticated, redirect them to the home page
      res.redirect("/");
    }
  },

  // Middleware to ensure that a user is a guest (not authenticated)
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      // If the user is not authenticated, continue to the next middleware or route handler
      return next();
    } else {
      // If the user is authenticated, redirect them to the dashboard
      res.redirect("/dashboard");
    }
  },
};
