# Movie Library Frontend

## Overview
This is the frontend for the Movie Library web application. It allows users to sign up, sign in, search for movies, create and manage movie lists, and view movie details.

## Features

- User authentication (Sign Up, Sign In)
- Movie search using the OMDB API
- Create, read, update, delete movie lists
- Add movies to lists
- View movie details
- Responsive and user-friendly interface

## Technologies Used 

- React.js
- React Router
- Context API for state management
- OMDB API for movie data

## Getting Started

### Prerequisites
- Node.js and NPM


### Installation

1. Clone the Repository:
   ```sh
       https://github.com/garvit74/fasal-frontend.git
       cd fasal-frontend

2. Install dependencies:
   ```sh
       npm install or npm i

3. Create a .env file in the root directory and add your OMDB API key:
   ```env
   REACT_APP_OMDB_API_KEY=your_omdb_api_key

4. Start the development server:
   ```sh
   npm start

## Routes
| Path                  | Component         | Description                          |
|-----------------------|-------------------|--------------------------------------|
| `/signup`             | `SignUp`          | User registration page               |
| `/`                   | `Home`            | Home page showing user movie lists   |
| `/signin`             | `SignIn`          | User login page                      |
| `/search`             | `Search`          | Search for movies using OMDB API     |
| `/create-list`        | `CreateList`      | Create a new movie list              |
| `/list/:listId`       | `ListDetails`     | View details of a specific movie list|
| `/movie/:movieId`     | `MovieDetails`    | View details of a specific movie     |
| `/addMovies/:listId`  | `AddMovieToList`  | Add movies to a specific list        |


## Screenshots 

### 1. Signup Page
![Sign Up Page](https://github.com/garvit74/fasal-frontend/blob/main/Screenshots/signup.png)
### 2. Sign In Page
![Sign In Page](https://github.com/garvit74/fasal-frontend/blob/main/Screenshots/signin.png)
### 3. Home Page
![Home Page](https://github.com/garvit74/fasal-frontend/blob/main/Screenshots/Home%20Page.png)
### 4. Search Page
![Search Page](https://github.com/garvit74/fasal-frontend/blob/main/Screenshots/Search%20Page.png)
### 5. Create List Page
![Create List](https://github.com/garvit74/fasal-frontend/blob/main/Screenshots/Create%20List.png)
### 6. List Details Page
![List Details Page](https://github.com/garvit74/fasal-frontend/blob/main/Screenshots/List%20Details.png)
### 7. Movie Details Page
![Movie Details Page](https://github.com/garvit74/fasal-frontend/blob/main/Screenshots/Movie%20Details%20Page.png)
### 8. Add Movies to List Page
![Add Movies to List](https://github.com/garvit74/fasal-frontend/blob/main/Screenshots/AddMovietolist.png)

## Conclusion

This frontend provides a complete user interface for the Movie Library application, handling user authentication, movie searches, and list management. Ensure the backend is running and accessible for the full functionality of the application.
