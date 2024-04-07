import { fetchMovies } from "@/server/actions/fetchMovies";

export const useFetchMovies = () => {
  return {
    queryKey: ["movies"],
    queryFn: async () => fetchMovies(),
  };
};
