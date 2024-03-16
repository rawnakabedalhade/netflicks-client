const toServer = (newData) => {
  return {
    title: newData.title,
    description: newData.description,
    year: newData.year,
    director: newData.director,
    category: newData.category,
    actors: newData.actors,
    trailer: newData.trailer,
    watchLink: newData.watchLink,
    image: newData.image.map((img) => ({
      url: img.url,
      alt: img.alt || "",
    })),
  };
};
export default toServer;
