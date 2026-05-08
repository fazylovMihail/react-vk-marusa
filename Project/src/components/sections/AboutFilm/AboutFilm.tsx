import { Movie } from "@/api/Movies";
import { FC, memo } from "react";

import "./about-film.scss";

interface AboutFilmProps {
  movie: Movie;
}

export const AboutFilm: FC<AboutFilmProps> = memo(({ movie }) => {
  return (
    <section className="about-film">
      <div className="container">
        <h2 className="about-film__heading">О фильме</h2>
        <ul className="about-film__list">
          {movie.language && (
            <li className="about-film__list-item">
              <span className="about-film__prop-name">Язык оригинала</span>
              <span className="about-film__prop-value">{movie.language}</span>
            </li>
          )}
          {movie.budget && (
            <li className="about-film__list-item">
              <span className="about-film__prop-name">Бюджет</span>
              <span className="about-film__prop-value">
                {movie.budget} руб.
              </span>
            </li>
          )}
          {movie.revenue && (
            <li className="about-film__list-item">
              <span className="about-film__prop-name">Выручка</span>
              <span className="about-film__prop-value">
                {movie.revenue} руб.
              </span>
            </li>
          )}
          {movie.director && (
            <li className="about-film__list-item">
              <span className="about-film__prop-name">Режиссёр</span>
              <span className="about-film__prop-value">{movie.director}</span>
            </li>
          )}
          {movie.production && (
            <li className="about-film__list-item">
              <span className="about-film__prop-name">Продакшен</span>
              <span className="about-film__prop-value">{movie.production}</span>
            </li>
          )}
          {movie.awardsSummary && (
            <li className="about-film__list-item">
              <span className="about-film__prop-name">Награды</span>
              <span className="about-film__prop-value">
                {movie.awardsSummary}
              </span>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
});
