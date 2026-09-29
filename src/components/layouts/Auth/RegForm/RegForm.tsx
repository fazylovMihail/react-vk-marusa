import { fetchUserReg } from "@/api/User";
import { Button, Input, Logo } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FC, FormHTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface RegFormProps extends FormHTMLAttributes<HTMLFormElement> {
  onClose: () => void;
  onOpenLoginForm: () => void;
}

const FormDataScheme = z
  .object({
    email: z.string(),
    name: z.string(),
    surname: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof FormDataScheme>;

export const RegForm: FC<RegFormProps> = ({ onClose, onOpenLoginForm }) => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(FormDataScheme),
  });

  const regMutation = useMutation({
    mutationFn: (data: FormData) =>
      fetchUserReg(data.email, data.name, data.surname, data.password),
    onSuccess: () => onClose(),
  });

  const onSubmit = (data: FormData) => regMutation.mutate(data);

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="auth-form__content">
        <div className="auth-form__inner">
          <Logo blockName="auth-form" modify="black" width={157} height={35} />
          <h2 className="auth-form__title">Регистрация</h2>
          <div className="auth-form__inputs">
            <Input
              {...register("email")}
              modificators={["white"]}
              type="email"
              name="email"
              id="input-reg-email"
              placeholder="Электронная почта"
              iconId="icon-email"
              autoComplete="email"
            />
            <Input
              {...register("name")}
              modificators={["white"]}
              type="text"
              name="name"
              id="input-reg-name"
              placeholder="Имя"
              iconId="icon-user"
            />
            <Input
              {...register("surname")}
              modificators={["white"]}
              type="text"
              name="surname"
              id="input-reg-surname"
              placeholder="Фамилия"
              iconId="icon-user"
            />
            <Input
              {...register("password")}
              modificators={["white"]}
              type="password"
              name="password"
              id="input-reg-password"
              placeholder="Пароль"
              iconId="icon-password"
            />
            <Input
              {...register("confirmPassword")}
              modificators={["white"]}
              type="password"
              name="confirm"
              id="input-reg-confirm-password"
              placeholder="Подтвердите пароль"
              iconId="icon-password"
            />
          </div>
          <Button
            className="btn btn--cornflower auth-form__submit-btn"
            type="submit"
          >
            Создать аккаунт
          </Button>
          <Button
            className="link link--black"
            type="button"
            onClick={onOpenLoginForm}
          >
            У меня есть пароль
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
