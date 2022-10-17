const CHECKBOX = document.querySelector("#menu-toggle");
const BODY = document.querySelector("BODY");

window.addEventListener("resize", menuAutoClose);
CHECKBOX.addEventListener("change", noScroll);

function noScroll() {
  CHECKBOX.checked
    ? BODY.classList.add("no-scroll")
    : BODY.classList.remove("no-scroll");
}

function menuAutoClose() {
  if (!CHECKBOX.checked) {
    return;
  }
  const NEW_WIDTH = document.documentElement.clientWidth;
  this.setTimeout(() => {
    if (NEW_WIDTH >= 768) {
      CHECKBOX.checked = false;
      noScroll();
    }
  }, 500);
}