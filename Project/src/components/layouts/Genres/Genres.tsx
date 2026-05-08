import { fetchGenres } from "@/api/Genres";
import { ErrorLabel, Loader } from "@/components/ui";
import { GenresCard } from "@/components";
import { useQuery } from "@tanstack/react-query";

import "./genres.scss";

export const Genres = () => {
  const { data, error, status } = useQuery({
    queryFn: fetchGenres,
    queryKey: ["genres"],
  });

  switch (status) {
    case "pending":
      return <Loader />;
    case "error":
      return <ErrorLabel message={error.message} />;
    case "success":
      return (
        <section className="genres">
          <div className="container">
            <h1 className="genres__heading">Жанры фильмов</h1>
            <ul className="genres__list">
              {data.map(({ imgUrl, name }) => (
                <li key={name} className="genres__list-item">
                  <GenresCard genre={name} imgUrl={imgUrl} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      );
  }
};
