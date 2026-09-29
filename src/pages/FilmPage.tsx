import { fetchMovie } from "@/api/Movies";
import { AboutFilm, ErrorLabel, Hero, Loader } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";

export const FilmPage = () => {
  const location = useLocation();

  const { filmId } = useParams<{ filmId: string }>();
  const idAsNumber = Number(filmId);

  const { data, error, status } = useQuery({
    queryFn: () => fetchMovie(idAsNumber),
    queryKey: ["movie", filmId],
  });

  switch (status) {
    case "pending":
      return <Loader />;
    case "error":
      return <ErrorLabel message={error.message} />;
    case "success":
      return (
        <>
          <Hero movie={data} location={location} modificators={["films"]} />
          <AboutFilm movie={data} />
        </>
      );
  }
};
