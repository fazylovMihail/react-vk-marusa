import drama from "./drama-image.jpg";
import comedy from "./comedy-image.jpg";
import mystery from "./mystery-image.jpg";
import family from "./family-image.jpg";
import history from "./history-image.jpg";
import thriller from "./thriller-image.jpg";
import fantasy from "./fantasy-image.jpg";
import adventure from "./adventure-image.jpg";
import animation from "./animation-image.jpg";
import documentary from "./documentary-image.jpg";
import horror from "./horror-image.jpg";
import music from "./music-image.jpg";
import romance from "./romance-image.jpg";
import scifi from "./sci-fi-image.jpg";
import standUp from "./stand-up-image.jpg";
import tvMovie from "./tv-movie-image.jpg";
import western from "./western-image.jpg";
import action from "./action-image.jpg";
import war from "./war-image.jpg";
import crime from "./crime-image.jpg";

export const genresImages = {
  drama,
  comedy,
  mystery,
  family,
  history,
  thriller,
  fantasy,
  adventure,
  animation,
  documentary,
  horror,
  music,
  romance,
  scifi,
  "stand-up": standUp,
  "tv-movie": tvMovie,
  western,
  action,
  war,
  crime,
} as const;

export type GenreType = keyof typeof genresImages | "none";
