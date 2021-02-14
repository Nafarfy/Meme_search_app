const app = (function () {
  const searchInput = document.querySelector(".search-input");
  const gifsList = document.querySelector(".gifs-list");
  const btnSeeMore = document.querySelector(".btn-see-more");

  const popupImg = document.querySelector(".popup-img");
  const popUpClose = document.querySelector(".btn-danger");

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

    // node.querySelector(".result-item").addEventListener("click", () => {
    //   popupImg.src = original;
    //   popup.classList.remove("d-none");
    //   document.querySelector("body").classList.add("overflow-hidden");
    // });

    return node;
  };

  const getTemplate = (gif, title) => {
    return document.createRange().createContextualFragment(`
    <div class="result-item">
      <img class="result-gif w-100 h-100" src="${gif}" alt="${title}" />
    </div>
    `);
  };

  const timeControl = (start, end, func) => {
    if (end - start <= 500) {
      setTimeout(() => {
        func();
      }, 500);
    } else {
      func();
    }
  };

  gifsList.addEventListener("click", (e) => {
    if (e.target.classList.contains("result-gif")) {
      popupImg.src = e.target.src;
      DOMOperations.showPopup();
    }
  });

  popUpClose.addEventListener("click", () => {
    DOMOperations.hidePopup();
  });

  btnSeeMore.addEventListener("click", () => {
    const start = new Date().getTime();
    DOMOperations.showSpinner();
    btnSeeMore.classList.add("d-none");

    searchGifs.loadMore(searchInput.value, 15).then((gifs) => {
      const end = new Date().getTime();

      timeControl(start, end, () => {
        DOMOperations.hideSpinner();
        btnSeeMore.classList.remove("d-none");
        renderGifs(gifs);
      });
    });
  });

  searchInput.addEventListener(
    "keyup",
    _.debounce(() => {
      const start = new Date().getTime();
      DOMOperations.showSpinner();

      searchGifs.loadMore(searchInput.value, 15).then((gifs) => {
        const end = new Date().getTime();

        timeControl(start, end, () => {
          DOMOperations.hideSpinner();
          renderGifs(gifs);
        });
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
