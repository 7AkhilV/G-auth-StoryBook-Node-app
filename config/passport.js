const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function (passport) {
  // Configure Google OAuth 2.0 Strategy for Passport.js
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback", // Callback URL for Google OAuth
      },
      async (accessToken, refreshToken, profile, done) => {
        // Create a new user object with data from the Google profile
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };

        try {
          // Check if a user with the same Google ID already exists in the database
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            // If user exists, authenticate and pass the user to the next step
            done(null, user);
          } else {
            // If user doesn't exist, create a new user in the database and pass it
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  // Serialize user object into a unique identifier (used for session management)
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user object from the identifier (used to retrieve user from session)
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err, null);
    }
  });
};
