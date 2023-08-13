const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");

// Load environment variables from config.env file
dotenv.config({ path: "./config/config.env" });

// Initialize Passport configuration
require("./config/passport")(passport);

// Connect to the database
connectDB();

const app = express();

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware to override HTTP methods (used for PUT and DELETE)
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// Middleware for logging requests in development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Load Handlebars helpers and configure template engine
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require("./helpers/hbs");

app.engine(
  ".hbs",
  exphbs({
    helpers: {
      formatDate,
      stripTags,
      truncate,
      editIcon,
      select,
    },
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// Configure session middleware using MongoDB store
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// Initialize Passport and session middleware
app.use(passport.initialize());
app.use(passport.session());

// Middleware to make user data available in templates
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Route handlers
app.use("/", require("./routes/index")); // Home page and other basic routes
app.use("/auth", require("./routes/auth")); // Authentication routes
app.use("/stories", require("./routes/stories")); // Story-related routes

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
