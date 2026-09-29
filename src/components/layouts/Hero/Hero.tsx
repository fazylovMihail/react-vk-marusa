import {
  fetchAddFavoriteMovie,
  fetchDeleteFavoritesMovie,
  Movie,
} from "@/api/Movies";
import {
  Button,
  CustomLink,
  FilmMeta,
  type SearchCardMovie,
} from "@/components/ui";
import { FC, memo, useCallback, useMemo } from "react";
import { Location } from "react-router-dom";

import "./hero.scss";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/api/queryClient";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  closeViewer,
  isOpenViewerSelector,
  openViewer,
} from "@/app/features/viewerSlice";
import { Viewer } from "../Viewer";
import { profileSelector } from "@/app/features/profileSlice";

export type HeroMovie = Pick<
  Movie,
  keyof SearchCardMovie | "id" | "plot" | "trailerUrl" | "backdropUrl"
>;

interface HeroProps {
  movie: HeroMovie;
  refetch?: () => void;
  location: Location;
  modificators?: string[];
}

export const Hero: FC<HeroProps> = memo(
  ({ movie, refetch, location, modificators }) => {
    const isViewerOpen = useAppSelector(isOpenViewerSelector);
    const profile = useAppSelector(profileSelector);
    const dispatch = useAppDispatch();

    const isFavorite = useMemo(() => {
      const favorites = profile.profile?.favorites || [];
      return favorites.some((fav) => String(fav) === String(movie.id));
    }, [profile.profile?.favorites, movie.id]);

    const toggleFavorite = useMutation({
      mutationFn: () =>
        isFavorite
          ? fetchDeleteFavoritesMovie(movie.id)
          : fetchAddFavoriteMovie(movie.id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["favorites"] });
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      },
    });

    const handleToggleFavorites = useCallback(() => {
      toggleFavorite.mutate();
    }, [toggleFavorite]);

    const handleOpenViewer = useCallback(() => {
      dispatch(openViewer());
    }, [dispatch]);

    const handleCloseViewer = useCallback(() => {
      dispatch(closeViewer());
    }, [dispatch]);

    const mods = modificators?.map((mod) => `hero--${mod}`).join(" ") ?? "";
    const classNames = `hero ${mods}`.trim();

    return (
      <>
        <section className={classNames}>
          <div className="container">
            <div className="hero__wrapper">
              <div className="hero__inner">
                <div className="hero__heading">
                  <FilmMeta movie={movie} />
                  <h2 className="hero__title">{movie.title}</h2>
                  <p className="hero__desc">{movie.plot}</p>
                </div>
                <div className="hero__actions">
                  <Button
                    className="btn btn--cornflower hero__btn hero__btn--wide-2x"
                    type="button"
                    onClick={handleOpenViewer}
                  >
                    Трейлер
                  </Button>

                  {location.pathname === "/" && (
                    <CustomLink
                      className="btn btn--with-border hero__btn hero__btn--wide"
                      to={`films/${movie.id}`}
                    >
                      О фильме
                    </CustomLink>
                  )}

                  <Button
                    className={`btn btn--with-border btn--mini ${isFavorite ? "btn--liked" : ""} hero__btn`}
                    type="button"
                    disabled={toggleFavorite.isPending}
                    onClick={handleToggleFavorites}
                  >
                    <svg className="btn__icon" width="24" height="24">
                      <use xlinkHref="/sprite.svg#icon-like" />
                    </svg>
                  </Button>

                  {location.pathname === "/" && (
                    <Button
                      className="btn btn--with-border btn--mini hero__btn"
                      type="button"
                      onClick={refetch}
                    >
                      <svg className="btn__icon" width="24" height="24">
                        <use xlinkHref="/sprite.svg#icon-refetch" />
                      </svg>
                    </Button>
                  )}
                </div>
              </div>
              {movie.posterUrl ? (
                <img
                  src={movie.posterUrl}
                  alt="Обложка фильма"
                  className="hero__image"
                />
              ) : (
                <div className="hero__stub">
                  <p className="hero__stub-text">{movie.title}</p>
                </div>
              )}
            </div>
          </div>
        </section>
        {isViewerOpen && movie.trailerUrl && (
          <Viewer videoUrl={movie.trailerUrl} onClose={handleCloseViewer} />
        )}
      </>
    );
  },
);
