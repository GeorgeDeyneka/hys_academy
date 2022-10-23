const checkbox = document.querySelector("#menu-toggle");
const body = document.querySelector("body");

checkbox.addEventListener("change", noScroll);

function noScroll() {
  checkbox.checked
    ? body.classList.add("no-scroll")
    : body.classList.remove("no-scroll");
}

function menuAutoClose() {
  window.addEventListener("resize", () => {
    if (!checkbox.checked) {
      return;
    }
    const newWidth = document.documentElement.clientWidth;
    setTimeout(() => {
      if (newWidth >= 768) {
        checkbox.checked = false;
        noScroll();
      }
    }, 500);
  });
}

export { noScroll, menuAutoClose };
