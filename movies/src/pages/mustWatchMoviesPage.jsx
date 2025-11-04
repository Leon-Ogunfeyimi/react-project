import React, { useContext } from "react";
import { useQueries } from "@tanstack/react-query";
import { MoviesContext } from "../contexts/moviesContext";
import { getMovie } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites"; // optional action
import RemoveFromMustWatchIcon from "../components/cardIcons/removeFromMustWatch";

const MustWatchMoviesPage = () => {
  const { mustWatch } = useContext(MoviesContext); // array of IDs

  // If empty, show a friendly message
  if (!mustWatch || mustWatch.length === 0) {
    return <h3 style={{ textAlign: "center" }}>No movies in your Must-Watch list yet.</h3>;
  }

  // Build queries for each movie id
  const queries = mustWatch.map((id) => ({
    queryKey: ["movie", { id }],
    queryFn: getMovie,
  }));

  const results = useQueries({ queries });

  const isLoading = results.some((r) => r.isPending);
  const isError = results.some((r) => r.isError);
  const firstError = results.find((r) => r.isError)?.error;

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{firstError.message}</h1>;

  const movies = results.map((r) => r.data).filter(Boolean);

  return (
    <PageTemplate
      title="Must-Watch Movies"
      movies={movies}
      action={(movie) => <RemoveFromMustWatchIcon movie={movie} />}
    />
  );
};

export default MustWatchMoviesPage;
