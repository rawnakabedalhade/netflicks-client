const fromServer = (dataFromServer) => {
  return {
    title: dataFromServer.title,
    description: dataFromServer.description,
    year: dataFromServer.year,
    director: dataFromServer.director,
    category: dataFromServer.category,
    actors: dataFromServer.actors,
    trailer: dataFromServer.trailer,
    watchLink: dataFromServer.watchLink,
    url: dataFromServer.image.url,
  };
};
export default fromServer;
