import { CustomLink } from "../CustomLink";
import { FC, memo } from "react";

import "./film-card.scss";

interface FilmCard {
  id: number;
  title: string;
  imgUrl: string | null | undefined;
  modificators?: string[];
}

export const FilmCard: FC<FilmCard> = memo(
  ({ id, title, imgUrl, modificators }) => {
    const classNames = `film-card ${modificators ? modificators.map((mod) => `film-card--${mod}`).join(" ") : ""}`;

    return (
      <CustomLink
        to={`/films/${id}`}
        className={`${classNames} ${!imgUrl ? "film-card--without-image" : ""}`}
      >
        <h3 className={`film-card__title ${imgUrl ? "visually-hidden" : ""}`}>
          {title}
        </h3>
        {imgUrl && (
          <img
            src={imgUrl}
            alt="Обложка фильма"
            className="film-card__image"
            width="224"
            height="336"
          />
        )}
      </CustomLink>
    );
  },
);
