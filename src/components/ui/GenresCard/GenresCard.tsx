import { FC, memo } from "react";
import { Link } from "react-router-dom";

import "./genres-card.scss";

interface GenresCardProps {
  genre: string;
  imgUrl: string;
}

export const GenresCard: FC<GenresCardProps> = memo(({ genre, imgUrl }) => {
  return (
    <Link to={`/genres/${genre}`} className="genres-card">
      <img
        src={imgUrl}
        alt="Изображение, соответствуюшее жанру"
        className="genres-card__image"
        width={290}
        height={220}
      />
      <span className="genres-card__text">{genre}</span>
    </Link>
  );
});
