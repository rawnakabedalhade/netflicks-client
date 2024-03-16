const normalizemovies = (movies, myId) => {
  if (!movies) return null;
  const newmovies = movies.map((movie) => ({
    ...movie,
    liked: movie.likes.includes(myId),
  }));
  return newmovies;
};

export default normalizemovies;
