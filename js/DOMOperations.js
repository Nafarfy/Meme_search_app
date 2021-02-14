const DOMOperations = (() => {
  const spinner = document.querySelector(".spinner-border");
  const popup = document.querySelector(".popup");

  const showSpinner = () => {
    spinner.classList.remove("d-none");
  };

  const hideSpinner = () => {
    spinner.classList.add("d-none");
  };

  const showPopup = () => {
    popup.classList.remove("d-none");
    document.querySelector("body").classList.add("overflow-hidden");
  };

  const hidePopup = () => {
    popup.classList.add("d-none");
    document.querySelector("body").classList.remove("overflow-hidden");
  };

  return {
    showSpinner,
    hideSpinner,
    showPopup,
    hidePopup,
  };
})();
