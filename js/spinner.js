const spinner = (() => {
  const spinner = document.querySelector(".spinner-border");

  const showSpinner = () => {
    spinner.classList.remove("d-none");
  };

  const hideSpinner = () => {
    spinner.classList.add("d-none");
  };

  return {
    showSpinner,
    hideSpinner,
  };
})();
