const searchGifs = ((apiKey) => {
  let gifs = {};

  const URLBuilder = (searchTerm, offset, limit) => {
    const params = new URLSearchParams({
      api_key: apiKey,
      limit: limit || 15,
      offset: offset || 0,
      q: searchTerm,
    });

    if (searchTerm === "") {
      return `https://api.giphy.com/v1/gifs/trending?${params.toString()}`;
    } else {
      return `https://api.giphy.com/v1/gifs/search?${params.toString()}`;
    }
  };

  const search = (searchTerm, offset, limit) => {
    return fetch(URLBuilder(searchTerm, offset, limit))
      .then((response) => response.json())
      .then((content) => content.data)
      .catch((err) => {
        alert(err);
      });
  };

  const loadMore = (searchTerm, limit) => {
    const offset = gifs.hasOwnProperty(searchTerm) ? gifs[searchTerm].length : 0;

    return search(searchTerm, offset, limit).then((newGifs) => {
      gifs[searchTerm] = [...(gifs[searchTerm] || []), ...newGifs];
      console.log(gifs);
      return gifs[searchTerm];
    });

    // // Option with data mutation

    // return search(searchTerm, offset, limit).then((newGifs) => {
    //   gifs[searchTerm] = newGifs;
    //   return gifs[searchTerm];
    // });
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
