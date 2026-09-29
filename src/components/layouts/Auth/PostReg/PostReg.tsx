import { Button, Logo } from "@/components/ui";
import { FC } from "react";

interface PostReg {
  onClose: () => void;
  onOpenLoginForm: () => void;
}

export const PostReg: FC<PostReg> = ({ onClose, onOpenLoginForm }) => {
  return (
    <div className="auth-form">
      <div className="auth-form__content">
        <div className="auth-form__inner">
          <Logo blockName="auth-form" modify="black" width={157} height={35} />
          <h2 className="auth-form__title">Регистрация завершена</h2>
          <p className="auth-form__text">
            Используйте вашу электронную почту для входа
          </p>
          <Button
            className="btn btn--cornflower auth-form__submit-btn"
            type="submit"
            onClick={onOpenLoginForm}
          >
            Войти
          </Button>
        </div>
        <Button
          className="btn btn--close auth-form__close-btn"
          type="button"
          aria-label="Кнопка закрытия формы"
          onClick={onClose}
        >
          <svg className="btn__icon" width="24" height="24">
            <use xlinkHref="/sprite.svg#icon-close" />
          </svg>
        </Button>
      </div>
    </div>
  );
};
