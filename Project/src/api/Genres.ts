import z from "zod";
import { getUrl } from "./queryClient";
import { genresImages, type GenreType } from "@/assets/images";
import {} from "@/assets/images/genres";

const GenreScheme = z.object({
  name: z.string(),
  imgUrl: z.string(),
});

export type Genre = z.infer<typeof GenreScheme>;

const GenresListScheme = z.array(GenreScheme);

type GenresList = z.infer<typeof GenresListScheme>;

export async function fetchGenres(): Promise<GenresList> {
  const response = await fetch(getUrl("/movie/genres"));

  if (!response.ok) throw new Error("Ошибка сервера.");

  const data: string[] = await response.json();
  const result = data.map((genre) => ({
    name: genre,
    imgUrl: genresImages[genre as keyof typeof genresImages] || "",
  }));

  return GenresListScheme.parse(result);
}
