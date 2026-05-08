import { ErrorLabel, FilmCard, Loader } from "@/components/ui";
import "./top-films.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchTopMovies } from "@/api/Movies";

export const TopFilms = () => {
  const { data, error, status } = useQuery({
    queryFn: fetchTopMovies,
    queryKey: ["top-movies"],
  });

  switch (status) {
    case "pending":
      return <Loader />;
    case "error":
      return <ErrorLabel message={error?.message} />;
    case "success":
      return (
        <section className="top-films">
          <div className="container">
            <h2 className="top-films__heading">Топ 10 фильмов</h2>
            <ul className="top-films__list">
              {data.map(({ id, title, posterUrl }) => (
                <li key={id} className="top-films__list-item">
                  <FilmCard id={id} title={title} imgUrl={posterUrl}></FilmCard>
                </li>
              ))}
            </ul>
          </div>
        </section>
      );
  }
};
