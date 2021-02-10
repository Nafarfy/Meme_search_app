const app = (function () {
  const searchInput = document.querySelector(".search-input");
  const resultItems = document.querySelector(".result-items");
  const resTitle = document.querySelector(".results-title");
  const btnSeeMore = document.querySelector(".btn-see-more");
  const spinner = document.querySelector(".spinner-border");

  const popUpImg = document.querySelector(".pop-up");
  const originalImg = document.querySelector(".original-img");
  const popUpClose = document.querySelector(".btn-danger");

  const apiKey = "Y0dPZrMIehQQDgvU4snePAVxdANpSGZD";

  let arr;
  let offset = 0;

  const searchGifs = (offset) => {
    const query = searchInput.value;
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=16&offset=${offset}&q=${query}`;
    arr = [];

    if (query === "") {
      url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=16&offset=${offset}`;
      resTitle.innerHTML = "Trending";
    }

    fetch(url)
      .then((response) => {
        spinner.classList.remove("d-none");
        return response.json();
      })
      .then((content) => {
        content.data.forEach((gif) => {
          arr = [
            ...arr,
            {
              url: gif.images.downsized.url,
              title: gif.title,
              original: gif.images.original.url,
            },
          ];
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const renderGifs = () => {
    const nodes = document.createDocumentFragment();

    setTimeout(() => {
      if (!arr.length) {
        resTitle.innerHTML = "No Results Found";
        return;
      } else {
        arr.map((gif) => {
          nodes.append(createNode(gif.url, gif.title, gif.original));
          spinner.classList.add("d-none");
        });
        resultItems.append(nodes);
      }
    }, 1000);
  };

  const createNode = (gif, title, original) => {
    const node = getTemplate(gif, title);

    node.querySelector(".result-item").addEventListener("click", () => {
      originalImg.src = original;
      popUpImg.classList.remove("d-none");
      document.querySelector("body").classList.add("overflow-hidden");
    });

    return node;
  };

  const getTemplate = (gif, title) => {
    return document.createRange().createContextualFragment(`
    <div class="result-item">
      <img class="w-100 h-100" src="${gif}" alt="${title}" />
    </div>
    `);
  };

  popUpClose.addEventListener("click", () => {
    popUpImg.classList.add("d-none");
    document.querySelector("body").classList.remove("overflow-hidden");
  });

  btnSeeMore.addEventListener("click", () => {
    offset += 16;
    searchGifs(offset);
    renderGifs();
  });

  searchInput.addEventListener(
    "keyup",
    _.debounce(() => {
      offset = 0;
      resultItems.innerHTML = "";
      resTitle.innerHTML = "All Results";
      searchGifs(offset);
      renderGifs();
    }, 700)
  );

  const init = () => {
    searchGifs();
    renderGifs();
  };

  return {
    init,
  };
})();

app.init();
