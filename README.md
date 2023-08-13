# G-auth-StoryBook-Node-app
  StoryBooks Blog App

live: https://storybook-node-app.onrender.com/

A Node.js web application for creating, editing, and managing stories.
Users can log in via Google authentication and share their stories publicly or privately.

## Features

- User authentication with Google OAuth 2.0.
- Create, edit, and delete stories.
- Publish stories as public or keep them private.
- View a list of public stories.
- Search for stories by title.
- User dashboard to manage your own stories.

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- Passport.js (for authentication)
- Handlebars (view engine)
- HTML, CSS
- JavaScript (ES6+)
- Google OAuth 2.0

## Prerequisites

- Node.js and npm are required to run this application.
- MongoDB database (connection URI should be specified in `config/config.env`).

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/storybooks-blog-app.git
   cd storybooks-blog-app

2. Install dependencies:
    `npm install`

3. Create an OAuth 2.0 client ID:

- Go to the Google Developers Console.
- Create a new project and enable the Google+ API.
- Create credentials (OAuth client ID) for a Web application.
- Set the authorized redirect URI to `http://localhost:3000/auth/google/callback`.

4. Create a configuration file:

- Rename `config/config.env.example` to `config/config.env`.
- Add your MongoDB connection URI and Google OAuth client ID and secret.

5. Start the application:
   npm start

6. Open your browser and navigate to http://localhost:3000.

## Usage
- Access the app in your browser and log in using your Google account.
- Create new stories, edit existing stories, and manage your profile.
- Stories can be set as public or private.
- Search for stories by title from the public stories page.

