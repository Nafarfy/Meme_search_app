(function () {
  const searchInput = document.querySelector(".search-input");

  searchInput.addEventListener(
    "keyup",
    memeSearch.debounce(() => {
      console.log("function");
    }, 700)
  );
})();
