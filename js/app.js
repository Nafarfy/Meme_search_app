const app = (function () {
  const searchInput = document.querySelector(".search-input");
  const gifsList = document.querySelector(".gifs-list");
  const btnSeeMore = document.querySelector(".btn-see-more");
  const spinner = document.querySelector(".spinner-border");

  const popUpImg = document.querySelector(".pop-up");
  const originalImg = document.querySelector(".original-img");
  const popUpClose = document.querySelector(".btn-danger");

  const renderGifs = (gifs) => {
    const nodes = document.createDocumentFragment();

    gifs.forEach((gif) => {
      nodes.append(createNode(gif.images.downsized.url, gif.title, gif.images.original.url));
    });

    gifsList.innerHTML = "";
    gifsList.append(nodes);
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
    searchGifs.loadMore(searchInput.value, 15).then((gifs) => {
      renderGifs(gifs);
    });
  });

  searchInput.addEventListener(
    "keyup",
    _.debounce(() => {
      spinner.classList.remove("d-none");
      searchGifs.loadMore(searchInput.value, 15).then((gifs) => {
        setTimeout(() => {
          spinner.classList.add("d-none");
          renderGifs(gifs);
        }, 1000);
      });
    }, 700)
  );

  const init = () => {
    searchGifs.loadMore(searchInput.value, 15).then((gifs) => {
      renderGifs(gifs);
    });
  };

  return {
    init,
  };
})();

app.init();
