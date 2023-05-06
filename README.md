

# CN_SKILLTEST_FRONTEND_2

CN_SKILLTEST_FRONTEND_2 is a web application that serves as an IMDB clone, allowing users to search for movies, view details about them and add them to their favourites list. The front-end of this project is developed using React and it uses the OMDB API to fetch movie data.

## Features

The CN_SKILLTEST_FRONTEND_2 provides the following features:

- Search: Users can search for movies by title.
- Movie details: Users can view details about a movie, including the title, plot, release date, and rating.
- Favourites list: Users can add movies to their favourites list and view them later.

## Installation

To install and use this web application, follow these steps:

1. Clone the repository to your local machine using the following command:

```
git clone https://github.com/s166harth/CN_SKILLTEST_FRONTEND_2.git
```

2. Navigate to the project directory and install the dependencies:

```
cd CN_SKILLTEST_FRONTEND_2
npm install
```

3. Start the server:

```
npm start
```

This will start the server on `http://localhost:3000`.

## Usage

To use the application, open it in your web browser by navigating to `http://localhost:3000`. You can search for movies by entering a title into the search bar. Clicking on a movie in the search results will take you to the movie details page, where you can view more information about the movie. To add a movie to your favourites list, click the "Add to Favourites" button on the movie details page.

## API Key

This application uses the OMDB API to fetch movie data. To use this feature, you will need to obtain an API key from the [OMDB website](http://www.omdbapi.com/). Once you have obtained your API key, add it to the `src/apiKey.js` file in the following format:

```
export const OMDB_API_KEY = 'your-api-key';
```

## Contributing

Contributions to this project are welcome! To contribute, please fork the repository and create a pull request with your changes.
