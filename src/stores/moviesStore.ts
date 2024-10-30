import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import movieTrailer from 'movie-trailer';

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Plot?: string;
  Genre?: string;
  Director?: string;
  imdbRating?: string;
  trailerURL?: string;
}

class MoviesStore {
  movies: Movie[] = [];
  currentMovie: Movie | null = null;
  searchQuery: string = "";

  constructor() {
    makeAutoObservable(this);
    this.fetchMovies();
  }

  async fetchMovies() {
    const queryParams = this.searchQuery
      ? `s=${this.searchQuery}`
      : `s=movie&y=2023`;

    try {
      const response = await axios.get(`http://www.omdbapi.com/?${queryParams}&apikey=7e59b8de`);
      const fetchedMovies: Movie[] = response.data.Search || [];

      runInAction(() => {
        this.movies = fetchedMovies;
      });

      const detailedMoviesPromises = fetchedMovies.map((movie) => {
        const res = this.fetchMovieDetails(movie.imdbID)
        return res
      });
      await Promise.all(detailedMoviesPromises);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }

  async fetchMovieDetails(imdbID: string) {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=7e59b8de`);
      const movieDetails = response.data;

      const trailerURL = await this.fetchTrailer(movieDetails.Title, movieDetails.Year);

      runInAction(() => {
        const index = this.movies.findIndex(movie => movie.imdbID === imdbID);

        if (index !== -1) {
          this.movies[index] = { ...this.movies[index], ...movieDetails, trailerURL };
        }

      });
    } catch (error) {
      console.error(`Error fetching details for movie ${imdbID}:`, error);
    }
  }


  async fetchTrailer(title: string, year?: string) {
    try {
      const trailerURL = await movieTrailer(title, { year });

      if (trailerURL) {
        const urlParams = new URL(trailerURL as string);
        const videoId = urlParams.searchParams.get('v');

        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Error fetching trailer for ${title}:`, error);
      return null;
    }
  }

  async fetchMovieById(imdbID: string) {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=7e59b8de`);
      const movieDetails = response.data;

      const trailerURL = await this.fetchTrailer(movieDetails.Title, movieDetails.Year);

      this.currentMovie = { ...movieDetails, trailerURL };
    } catch (error) {
      console.error(`Error fetching details for movie ${imdbID}:`, error);
    }
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
    this.fetchMovies();
  }

  setCurrentMovie(movie: Movie) {
    this.currentMovie = movie;
  }
}

export const moviesStore = new MoviesStore();
