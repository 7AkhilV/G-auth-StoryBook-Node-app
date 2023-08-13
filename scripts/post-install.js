const fs = require("fs-extra");

try {
  // Copy the example environment file to create a new environment configuration file
  fs.copySync("./config/config.env.example", "./config/config.env");
  console.log("Environment file created successfully.");
} catch (err) {
  // Display an error message if copying the file fails
  console.error(err);
}
