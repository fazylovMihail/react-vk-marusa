import z from "zod";
import { getUrl } from "./queryClient";

export const MovieScheme = z.object({
  id: z.number(),
  title: z.string(),
  originalTitle: z.string(),
  plot: z.string(),
  releaseDate: z.string().nullish(),
  releaseYear: z.number().nullish(),
  runtime: z.number(),
  tmdbRating: z.number(),

  director: z.string().nullable(),
  cast: z.array(z.string()),

  genres: z.array(z.string()),
  keywords: z.array(z.string()),

  production: z.string().nullable(),
  budget: z.string().nullable(),
  revenue: z.string().nullable(),

  language: z.string(),
  languages: z.array(z.string()),
  countriesOfOrigin: z.array(z.string()),

  posterUrl: z.string().nullable(),
  backdropUrl: z.string().nullable(),
  trailerUrl: z.string().nullable(),
  trailerYoutubeId: z.string().nullish(),
  homepage: z.string().nullable(),

  status: z.string(),
  awardsSummary: z.string().nullable(),
  searchL: z.string().nullable(),
});

export type Movie = z.infer<typeof MovieScheme>;

export const MovieListScheme = z.array(MovieScheme);

export type MovieList = z.infer<typeof MovieListScheme>;

export async function fetchMovies(filterPath: string): Promise<MovieList> {
  const response = await fetch(getUrl(`/movie?${filterPath}`));
  const data = await response.json();
  return MovieListScheme.parse(data);
}

export async function fetchMovie(id: number): Promise<Movie> {
  const response = await fetch(getUrl(`/movie/${id}`));
  const data = await response.json();
  return MovieScheme.parse(data);
}

export async function fetchRandomMovie(): Promise<Movie> {
  const response = await fetch(getUrl("/movie/random"));
  const data = await response.json();
  return MovieScheme.parse(data);
}

export async function fetchTopMovies(): Promise<MovieList> {
  const response = await fetch(getUrl("/movie/top10"));
  const data = await response.json();
  return MovieListScheme.parse(data);
}

export async function fetchFavoritesMovies(): Promise<MovieList> {
  const response = await fetch(getUrl("/favorites"), {
    credentials: "include",
  });
  const data = await response.json();
  return MovieListScheme.parse(data);
}

export async function fetchAddFavoriteMovie(id: number): Promise<void> {
  await fetch(getUrl(`/favorites`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id: String(id) }),
  });
}

export async function fetchDeleteFavoritesMovie(id: number): Promise<void> {
  await fetch(getUrl(`/favorites/${id}`), {
    method: "DELETE",
    credentials: "include",
  });
}
