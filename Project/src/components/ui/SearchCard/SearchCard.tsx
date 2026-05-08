import { Movie } from "@/api/Movies";
import { FC } from "react";
import { CustomLink, FilmMeta, type FilmMetaMovie } from "@/components";

import "./search-card.scss";

export type SearchCardMovie = Pick<
  Movie,
  "posterUrl" | keyof FilmMetaMovie | "title" | "id"
>;

interface SearchCardProps {
  movie: SearchCardMovie;
}

export const SearchCard: FC<SearchCardProps> = ({ movie }) => {
  return (
    <CustomLink to={`/films/${movie.id}`} className="search-card">
      {movie.posterUrl && (
        <img
          src={movie.posterUrl}
          alt="Постер фильма"
          className="search-card__image"
          width={40}
          height={52}
        />
      )}
      <div className="search-card__inner">
        <FilmMeta movie={movie} modificators={["mini"]} />
        <p className="search-card__title">{movie.title}</p>
      </div>
    </CustomLink>
  );
};
