import { fetchMovies } from "@/api/Movies";
import { ErrorLabel, Loader, SearchCard } from "@/components/ui";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FC, memo, useEffect, useMemo, useRef } from "react";

import "./search-modal.scss";

interface SearchModalProps {
  searchRequest: string;
}

export const SearchModal: FC<SearchModalProps> = memo(({ searchRequest }) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    error,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies", "search", searchRequest],
    enabled: !!searchRequest,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchMovies(
        `title=${encodeURIComponent(searchRequest)}&count=10&page=${pageParam}`,
      ),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 10 ? allPages.length + 1 : undefined,
  });

  const movies = useMemo(() => {
    if (!data) return [];
    return data.pages
      .flat()
      .slice() // создаем копию, чтобы не мутировать исходные данные из кэша
      .sort((a, b) => b.tmdbRating - a.tmdbRating);
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
      if (movies.length === 0) {
        return (
          <div className="search-modal search-modal--no-result">
            Ничего не найдено
          </div>
        );
      }

      return (
        <div className="search-modal">
          <ul className="search-modal__list">
            {movies.map((movie) => (
              <li key={movie.id} className="search-modal__list-item">
                <SearchCard movie={movie} />
              </li>
            ))}
          </ul>

          <div ref={sentinelRef} style={{ height: 1 }} />

          {isFetchingNextPage && <Loader />}
        </div>
      );
    }
  }
});
