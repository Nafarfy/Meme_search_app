const app = (function () {
  const searchInput = document.querySelector(".search-input");
  const resultTitle = document.querySelector(".results-title");
  const gifsList = document.querySelector(".gifs-list");
  const btnSeeMore = document.querySelector(".btn-see-more");
  const popupImg = document.querySelector(".popup-img");
  const modalTitle = document.querySelector(".modal-title");

  const renderGifs = (gifs) => {
    const nodes = document.createDocumentFragment();

    gifs.forEach((gif) => {
      nodes.append(createNode(gif.images.downsized.url, gif.title));
    });

    gifsList.innerHTML = "";
    gifsList.append(nodes);
  };

  const createNode = (gif, title) => {
    const node = getTemplate(gif, title);

    return node;
  };

  const getTemplate = (gif, title) => {
    return document.createRange().createContextualFragment(`
    <div class="result-item">
      <img class="result-gif w-100 h-100" src="${gif}" alt="${title}" data-bs-toggle="modal" data-bs-target="#exampleModal" />
    </div>
    `);
  };

  // const timeControl = (start, end, executedTime, func) => {
  //   if (end - start <= executedTime) {
  //     setTimeout(() => {
  //       func();
  //     }, executedTime - (end - start));
  //   } else {
  //     func();
  //   }
  // };

  gifsList.addEventListener("click", (e) => {
    if (e.target.classList.contains("result-gif")) {
      modalTitle.innerHTML = e.target.alt;
      popupImg.src = e.target.src;
    }
  });

  btnSeeMore.addEventListener("click", () => {
    spinner.showSpinner();
    btnSeeMore.classList.add("d-none");

    searchGifs.loadMore(searchInput.value, 15).then((gifs) => {
      spinner.hideSpinner();
      btnSeeMore.classList.remove("d-none");
      renderGifs(gifs);
    });
  });

  searchInput.addEventListener(
    "keyup",
    _.debounce(() => {
      spinner.showSpinner();
      resultTitle.classList.add("d-none");

      searchGifs.loadMore(searchInput.value, 15).then((gifs) => {
        resultTitle.classList.remove("d-none");
        spinner.hideSpinner();
        renderGifs(gifs);
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
