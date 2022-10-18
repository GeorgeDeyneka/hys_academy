const checkbox = document.querySelector("#menu-toggle");
const body = document.querySelector("body");

window.addEventListener("resize", menuAutoClose);
checkbox.addEventListener("change", noScroll);

function noScroll() {
  checkbox.checked
    ? body.classList.add("no-scroll")
    : body.classList.remove("no-scroll");
}

function menuAutoClose() {
  if (!checkbox.checked) {
    return;
  }
  const newWidth = document.documentElement.clientWidth;
  this.setTimeout(() => {
    if (newWidth >= 768) {
      checkbox.checked = false;
      noScroll();
    }
  }, 500);
}