import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromMustWatchIcon = ({ movie }) => {
  const { removeFromMustWatch } = useContext(MoviesContext);

  const onClick = (e) => {
    e.preventDefault();
    removeFromMustWatch(movie);
  };

  return (
    <IconButton aria-label="remove from must watch" onClick={onClick}>
      <PlaylistRemoveIcon color="error" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromMustWatchIcon;
