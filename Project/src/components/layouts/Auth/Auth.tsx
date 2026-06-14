import { authFormSelector, toogleForm } from "@/app/features/authFormSlice";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { LoginForm } from "./LoginForm";
import { RegForm } from "./RegForm";
import { useEffect } from "react";
import { PostReg } from "./PostReg";

import "./auth-form.scss";

export const Auth = () => {
  const authForm = useAppSelector(authFormSelector);
  const dispatch = useAppDispatch();

  const handleClose = () => dispatch(toogleForm("none"));
  const handleOpenLoginForm = () => dispatch(toogleForm("login"));
  const handleOpenRegForm = () => dispatch(toogleForm("reg"));

  useEffect(() => {
    const handleKeydownEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeydownEsc);

    return () => window.removeEventListener("keydown", handleKeydownEsc);
  }, [handleClose]);

  switch (authForm) {
    case "login":
      return (
        <LoginForm onClose={handleClose} onOpenRegForm={handleOpenRegForm} />
      );
    case "reg":
      return (
        <RegForm onClose={handleClose} onOpenLoginForm={handleOpenLoginForm} />
      );
    case "post-reg":
      return (
        <PostReg onClose={handleClose} onOpenLoginForm={handleOpenLoginForm} />
      );
  }
};
