import { Button, Input, Logo } from "@/components/ui";
import { FC, FormHTMLAttributes } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchUserLogin } from "@/api/User";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { queryClient } from "@/api/queryClient";
import { useAppDispatch } from "@/app/store";

interface LoginFormProps extends FormHTMLAttributes<HTMLFormElement> {
  onClose: () => void;
  onOpenRegForm: () => void;
}

const FormDataSheme = z.object({
  email: z.email("Введите корректный email"),
  password: z.string().min(1, "Поле обязательно для заполнения"),
});

type FormData = z.infer<typeof FormDataSheme>;

export const LoginForm: FC<LoginFormProps> = ({ onClose, onOpenRegForm }) => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(FormDataSheme),
  });

  const loginMutation = useMutation({
    mutationFn: (data: FormData) => fetchUserLogin(data.email, data.password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      onClose();
    },
  });

  const onSubmit = (data: FormData) => loginMutation.mutate(data);

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="auth-form__content">
        <div className="auth-form__inner">
          <Logo blockName="auth-form" modify="black" width={157} height={35} />
          <div className="auth-form__inputs">
            <Input
              {...register("email")}
              modificators={["white"]}
              type="email"
              name="email"
              id="input-login-email"
              placeholder="Электронная почта"
              iconId="icon-email"
              autoComplete="email"
            />
            <Input
              {...register("password")}
              modificators={["white"]}
              type="password"
              name="password"
              id="input-login-password"
              placeholder="Пароль"
              iconId="icon-password"
            />
          </div>
          <Button
            className="btn btn--cornflower auth-form__submit-btn"
            type="submit"
          >
            Войти
          </Button>
          <Button
            className="link link--black"
            type="button"
            onClick={onOpenRegForm}
          >
            Регистрация
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
    </form>
  );
};
