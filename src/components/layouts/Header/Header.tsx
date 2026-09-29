import { useLocation } from "react-router-dom";
import { Button } from "../../ui/Button";
import { CustomLink, Logo, SearchForm } from "@/components";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { toogleForm } from "@/app/features/authFormSlice";
import { profileSelector } from "@/app/features/profileSlice";
import { useState } from "react";

import "./header.scss";

export const Header = () => {
  const {
    profile: { name },
    isAuth,
  } = useAppSelector(profileSelector);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const handleOpenLoginForm = () => dispatch(toogleForm("login"));

  const handleOpenOpenSearchModal = () => {
    setIsOpenSearch(true);
  };
  const handleCloseOpenSearchModal = () =>
    setTimeout(() => setIsOpenSearch(false), 200);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <CustomLink
            className="header__logo"
            to={"/"}
            aria-label="Ссылка на главную страницу"
          >
            <Logo blockName="header" modify="white" width={144} height={32} />
          </CustomLink>
          <div className="header__middle">
            <CustomLink
              className={`link link--without-icon ${location.pathname === "/" || location.pathname.startsWith("/films") ? "link--special" : ""}`}
              to={"/"}
              aria-label="Ссылка на главную страницу"
            >
              <span className="link__label">Главная</span>
            </CustomLink>
            <CustomLink
              className={`link ${location.pathname.startsWith("/genres") ? "link--special" : ""}`}
              to={"/genres"}
              aria-label="Ссылка на страницу жанров"
            >
              <svg className="link__icon" width={24} height={24}>
                <use xlinkHref="/sprite.svg#icon-genres" />
              </svg>
              <span className="link__label">Жанры</span>
            </CustomLink>
            <SearchForm
              id="search-form"
              isOpen={isOpenSearch}
              onOpen={handleOpenOpenSearchModal}
              onClose={handleCloseOpenSearchModal}
            />
          </div>
          <Button
            className="link link--icon"
            id="open-search-form"
            type="button"
            aria-label="Кнопка для открытия формы поиска"
            onClick={handleOpenOpenSearchModal}
          >
            <svg className="link__icon" width={24} height={24}>
              <use xlinkHref="/sprite.svg#icon-search" />
            </svg>
          </Button>
          {isAuth ? (
            <CustomLink
              className={`link ${location.pathname.startsWith("/profile") ? "link--special" : ""}`}
              to={"/profile"}
            >
              <svg className="link__icon" width={24} height={24}>
                <use xlinkHref="/sprite.svg#icon-user" />
              </svg>
              <span className="link__label">{name}</span>
            </CustomLink>
          ) : (
            <Button
              className="link"
              type="button"
              aria-label="Кнопка входа"
              onClick={handleOpenLoginForm}
            >
              <svg className="link__icon" width={24} height={24}>
                <use xlinkHref="/sprite.svg#icon-user" />
              </svg>
              <span className="link__label">Войти</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
