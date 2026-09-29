import { Button, ErrorLabel, FilmCard, Loader } from "@/components/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchDeleteFavoritesMovie, fetchFavoritesMovies } from "@/api/Movies";
import { useCallback, useMemo, useState } from "react";
import { useAppSelector } from "@/app/store";
import { profileSelector } from "@/app/features/profileSlice";

import "./profile.scss";
import { queryClient } from "@/api/queryClient";
import { fetchUserLogout } from "@/api/User";

type ProfileWindows = "favorites" | "settings";

export const Profile = () => {
  const {
    profile: { name, surname, email },
  } = useAppSelector(profileSelector);

  const { data, error, status } = useQuery({
    queryFn: fetchFavoritesMovies,
    queryKey: ["favorites"],
  });

  const deleteFavotiteMutate = useMutation({
    mutationFn: (id: number) => fetchDeleteFavoritesMovie(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const logoutMutate = useMutation({
    mutationFn: fetchUserLogout,
    onSuccess: () => {
      queryClient.clear();
      window.location.href = "/";
    },
  });

  const [profileWindow, setProfileWindow] =
    useState<ProfileWindows>("favorites");

  const handleOpenFavorites = useCallback(
    () => setProfileWindow("favorites"),
    [setProfileWindow],
  );

  const handleOpenSettings = useCallback(
    () => setProfileWindow("settings"),
    [setProfileWindow],
  );

  const handleLogout = () => logoutMutate.mutate();

  const initials = useMemo(() => {
    return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase();
  }, [name, surname]);

  switch (status) {
    case "pending":
      return <Loader />;
    case "error":
      return <ErrorLabel message={error.message} />;
    case "success":
      return (
        <section className="profile">
          <div className="container">
            <h1 className="profile__heading">Мой аккаунт</h1>
            <div className="profile__actions">
              <Button
                className={`link ${profileWindow === "favorites" ? "link--special" : ""} link--always-icon`}
                onClick={handleOpenFavorites}
              >
                <svg
                  className="link__icon"
                  width={24}
                  height={24}
                  aria-hidden={true}
                >
                  <use xlinkHref="/sprite.svg#icon-like" />
                </svg>
                <span className="link__label">Избранные фильмы</span>
                <span className="link__label-mini">Избранное</span>
              </Button>
              <Button
                className={`link ${profileWindow === "settings" ? "link--special" : ""} link--always-icon`}
                onClick={handleOpenSettings}
              >
                <svg
                  className="link__icon"
                  width={24}
                  height={24}
                  aria-hidden={true}
                >
                  <use xlinkHref="/sprite.svg#icon-user" />
                </svg>
                <span className="link__label">Настройка аккаунта</span>
                <span className="link__label-mini">Настройки</span>
              </Button>
            </div>
            {profileWindow === "favorites" ? (
              <ul className="profile__list">
                {data.map(({ id, posterUrl, title }) => (
                  <li key={id} className="profile__list-item">
                    <FilmCard
                      id={id}
                      imgUrl={posterUrl}
                      title={title}
                      modificators={["favorites"]}
                    />
                    <Button
                      className="profile__item-delete"
                      onClick={() => deleteFavotiteMutate.mutate(id)}
                    >
                      <svg
                        className="film-card__delete-icon"
                        width={24}
                        height={24}
                      >
                        <use xlinkHref="/sprite.svg#icon-reset" />
                      </svg>
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <ul className="profile__info">
                  <li className="profile__info-item">
                    <div className="profile__card">
                      <div className="profile__card-avatar">{initials}</div>
                      <div className="profile__card-inner">
                        <span className="profile__card-label">Имя Фамилия</span>
                        <h3 className="profile__card-title">{`${name} ${surname}`}</h3>
                      </div>
                    </div>
                  </li>
                  <li className="profile__info-item">
                    <div className="profile__card">
                      <div className="profile__card-avatar">
                        <svg
                          className="profile__card-icon"
                          width={24}
                          height={24}
                        >
                          <use xlinkHref="/sprite.svg#icon-email" />
                        </svg>
                      </div>
                      <div className="profile__card-inner">
                        <span className="profile__card-label">
                          Электронная почта
                        </span>
                        <h3 className="profile__card-title">{email}</h3>
                      </div>
                    </div>
                  </li>
                </ul>
                <Button
                  className="btn btn--cornflower profile__logout"
                  type="button"
                  onClick={handleLogout}
                  disabled={logoutMutate.isPending}
                >
                  Выйти из аккаунта
                </Button>
              </>
            )}
          </div>
        </section>
      );
  }
};
