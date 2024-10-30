import { makeAutoObservable } from "mobx";
import { Movie } from './moviesStore';

class FavoritesStore {
  favorites: Movie[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addFavorite(movie: Movie) {
    this.favorites.push(movie);
  }

  removeFavorite(movieId: string) {
    this.favorites = this.favorites.filter(movie => movie.imdbID !== movieId);
  }
}

export const favoritesStore = new FavoritesStore();
