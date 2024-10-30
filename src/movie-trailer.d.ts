declare module 'movie-trailer' {
  function movieTrailer(title: string, options?: {
    year?: string | number;
    id?: boolean;
    multi?: boolean;
    language?: string;
    tmdbId?: string | number;
  }): Promise<string | string[] | null>;

  export default movieTrailer;
}
