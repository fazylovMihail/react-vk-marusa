import z from "zod";
import { getUrl } from "./queryClient";

export const UserScheme = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.email(),
  favorites: z.array(z.string()),
});

export type User = z.infer<typeof UserScheme>;

export async function fetchUserLogin(
  email: string,
  password: string,
): Promise<void> {
  const response = await fetch(getUrl("/auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!response.ok) throw new Error("Неверные авторизационные данные");
}

export async function fetchUserReg(
  email: string,
  name: string,
  surname: string,
  password: string,
): Promise<void> {
  const response = await fetch(getUrl("/user"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, surname }),
  });

  if (!response.ok) throw new Error("Неверные регистрационные данные");
}

export async function fetchUserProfile(): Promise<User> {
  const response = await fetch(getUrl("/profile"), { credentials: "include" });

  if (!response.ok) throw new Error("Не удалось загрузить профиль");

  const data = await response.json();
  return UserScheme.parse(data);
}

export async function fetchUserLogout(): Promise<void> {
  await fetch(getUrl("/auth/logout"), { credentials: "include" });
}
