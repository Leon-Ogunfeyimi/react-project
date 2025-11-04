import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  // Existing favourites state
  const [favorites, setFavorites] = useState([]);

  // Add new reviews state (just after favourites)
  const [myReviews, setMyReviews] = useState({});
  const [mustWatch, setMustWatch] = useState([]);

  // --- Existing handlers ---
  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
    } else {
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites);
  };

  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter((mId) => mId !== movie.id));
  };

  // Add new addReview handler
  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };
  // console.log(myReviews);
  const addToMustWatch = (movie) => {               // NEW FUNCTION
    if (!mustWatch.includes(movie.id)) {
      setMustWatch([...mustWatch, movie.id]);
    }
    console.log("Must Watch List:", [...mustWatch, movie.id]);  // verify
  };

  const removeFromMustWatch = (movie) => {
  const updated = mustWatch.filter((mId) => mId !== movie.id);
  setMustWatch(updated);
  console.log("Must Watch List (after remove):", updated);
};

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        mustWatch,      
        addToMustWatch,
        removeFromMustWatch,   
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;

