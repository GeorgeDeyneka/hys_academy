let checkbox = document.querySelector("#menu-toggle");
let body = document.querySelector("body");

window.addEventListener("resize", menuAutoClose);
checkbox.addEventListener("change", noScroll);

function noScroll() {
  checkbox.checked
    ? (body.className = "no-scroll")
    : body.classList.remove("no-scroll");
}

function menuAutoClose() {
  if (!checkbox.checked) {
    return;
  }
  let newWidth = document.documentElement.clientWidth;
  this.setTimeout(() => {
    if (newWidth >= 768) {
      checkbox.checked = false;
      noScroll();
    }
  }, 500);
}