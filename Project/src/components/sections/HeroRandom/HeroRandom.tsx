import { useQuery } from "@tanstack/react-query";
import { fetchRandomMovie } from "@/api/Movies";
import { useLocation } from "react-router-dom";
import { ErrorLabel, Hero, Loader } from "@/components";

export const HeroRandom = () => {
  const location = useLocation();
  const { data, error, status, refetch } = useQuery({
    queryFn: fetchRandomMovie,
    queryKey: ["random-movie"],
  });

  switch (status) {
    case "pending":
      return <Loader />;
    case "error":
      return <ErrorLabel message={error.message} />;
    case "success":
      return <Hero movie={data} refetch={refetch} location={location} />;
  }
};
