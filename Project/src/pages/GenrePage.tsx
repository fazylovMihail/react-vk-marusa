import { fetchMovies } from "@/api/Movies";
import { CustomLink, ErrorLabel, FilmCard, Loader } from "@/components";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";

export const GenrePage = () => {
  const { genreName } = useParams();
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    error,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies", genreName],
    enabled: !!genreName,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchMovies(`genre=${genreName}&count=10&page=${pageParam}`),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 10 ? allPages.length + 1 : undefined,
  });

  const movies = useMemo(() => {
    if (!data) return [];
    return data.pages.flat().sort((a, b) => b.tmdbRating - a.tmdbRating);
  }, [data]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  switch (status) {
    case "pending":
      return <Loader />;

    case "error":
      return <ErrorLabel message={error.message} />;

    case "success": {
      return (
        <section className="genres genres--selected">
          <div className="container">
            <h1 className="genres__heading">
              <CustomLink className="link link--black" to={"/genres"}>
                <svg className="genres__icon" width="40" height="40">
                  <use xlinkHref="/sprite.svg#icon-back" />
                </svg>
              </CustomLink>
              <span className="genres__label">{genreName}</span>
            </h1>
            {movies.length === 0 ? (
              <div className="search-modal search-modal--no-result">
                Ничего не найдено
              </div>
            ) : (
              <>
                <ul className="genres__list">
                  {movies.map(({ id, title, posterUrl }) => (
                    <li key={id} className="genres__list-item">
                      <FilmCard
                        id={id}
                        title={title}
                        imgUrl={posterUrl}
                        modificators={["big"]}
                      />
                    </li>
                  ))}
                </ul>

                <div ref={sentinelRef} style={{ height: 1 }} />

                {isFetchingNextPage && <Loader />}
              </>
            )}
          </div>
        </section>
      );
    }
  }
};
