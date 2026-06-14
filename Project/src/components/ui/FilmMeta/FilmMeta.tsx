import { Movie } from "@/api/Movies";
import { FC, memo, useMemo } from "react";

import "./film-meta.scss";

export type FilmMetaMovie = Pick<
  Movie,
  "tmdbRating" | "releaseYear" | "genres" | "runtime"
>;

interface FilmMetaProps {
  movie: FilmMetaMovie;
  modificators?: string[];
}

export const FilmMeta: FC<FilmMetaProps> = memo(
  ({ movie: { genres, runtime, tmdbRating, releaseYear }, modificators }) => {
    const runtimeStr = useMemo(() => {
      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;
      return `${hours} ч ${minutes} мин`;
    }, [runtime]);

    const classNames = useMemo(() => {
      const modsString =
        modificators?.map((mod) => `film-meta--${mod}`).join(" ") ?? "";
      return `film-meta ${modsString}`.trim();
    }, [modificators]);

    const colorModififcator = useMemo(() => {
      if (tmdbRating > 7.5) {
        return "golden";
      } else if (tmdbRating > 6.3) {
        return "forest-green";
      } else if (tmdbRating > 4.2) {
        return "gray";
      } else {
        return "";
      }
    }, [tmdbRating]);

    return (
      <div className={classNames}>
        <span
          className={`film-meta__grade ${`film-meta__grade--${colorModififcator}`}`}
        >
          <svg className="film-meta-grade-icon" width="16" height="16">
            <use xlinkHref="/sprite.svg#icon-star" />
          </svg>
          {tmdbRating % 1 === 0 ? tmdbRating : tmdbRating.toFixed(1)}
        </span>
        <span className="film-meta__label">{releaseYear}</span>
        <span className="film-meta__label">{genres[0]}</span>
        <span className="film-meta__label">{runtimeStr}</span>
      </div>
    );
  },
);
