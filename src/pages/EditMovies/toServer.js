const toServer = (newData) => {
  console.log(newData, "to");
  return {
    title: newData.title,
    description: newData.description,
    year: newData.year,
    director: newData.director,
    category: newData.category,
    actors: newData.actors,
    trailer: newData.trailer,
    watchLink: newData.watchLink,
    image: {
      url: newData.url,
      alt: newData.alt,
    },
  };
};
export default toServer;
