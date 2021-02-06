const memeSearch = (() => {
  function debounce(func, wait) {
    let timeout;
    const args = arguments;
    const context = this;

    return () => {
      const later = function () {
        timeout = null;
        func.apply(context, args);
      };

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);
    };
  }

  return {
    debounce,
  };
})();
