import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const getUrl = (path: string) =>
  `https://cinemaguide.skillbox.cc${path}`;
