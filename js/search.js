const searchGifs = ((apiKey) => {
  let gifs = {};

  const search = (searchTerm, offset, limit) => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=${
      limit || 15
    }&offset=${offset || 0}&q=${searchTerm}`;
    const urlRandom = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=16&offset=${offset}`;

    return fetch(searchTerm ? url : urlRandom)
      .then((response) => response.json())
      .then((content) => content.data)
      .catch((err) => {
        console.error(err);
      });
  };

  const loadMore = (searchTerm, limit) => {
    const offset = gifs.hasOwnProperty(searchTerm) ? gifs[searchTerm].length : 0;

    return search(searchTerm, offset, limit).then((newGifs) => {
      gifs[searchTerm] = [...(gifs[searchTerm] || []), ...newGifs];
      console.log(gifs[searchTerm]);
      return gifs[searchTerm];
    });
  };

  const setGifs = (value) => {
    gifs = value;
  };

  const getGifs = () => {
    return gifs;
  };

  return {
    search,
    getGifs,
    loadMore,
    setGifs,
  };
})("Y0dPZrMIehQQDgvU4snePAVxdANpSGZD");
