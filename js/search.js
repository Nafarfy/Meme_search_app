const API_KEY = "Y0dPZrMIehQQDgvU4snePAVxdANpSGZD";
const API_URL = "https://api.giphy.com/v1/gifs/";

const searchGifs = (() => {
  let gifs = {};

  const getUrl = (searchTerm, offset, limit) => {
    const params = new URLSearchParams({
      api_key: API_KEY,
      limit: limit || 15,
      offset: offset || 0,
      q: searchTerm,
    });

    if (!searchTerm) {
      return `${API_URL}trending?${params.toString()}`;
    }
    return `${API_URL}search?${params.toString()}`;
  };

  const search = (searchTerm, offset, limit) => {
    return fetch(getUrl(searchTerm, offset, limit))
      .then((response) => response.json())
      .then((content) => content.data)
      .catch(() => {
        alert("Something goes wrong");
      });
  };  

  const loadMore = (inputSearchTerm, limit) => {
    const searchTerm = inputSearchTerm.trim() || "";

    const offset = gifs.hasOwnProperty(searchTerm) ? gifs[searchTerm].length : 0;

    return search(searchTerm, offset, limit).then((newGifs) => {
      gifs[searchTerm] = [...(gifs[searchTerm] || []), ...newGifs];
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
})();
