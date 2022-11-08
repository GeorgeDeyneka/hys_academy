const checkbox = document.querySelector("#menu-toggle");
const menuList = document.querySelector(".header__nav");
const body = document.querySelector("body");

checkbox.addEventListener("change", noScroll);
menuList.addEventListener("click", menuAutoClose);

function noScroll() {
  checkbox.checked
    ? body.classList.add("no-scroll")
    : body.classList.remove("no-scroll");
}

function menuAutoClose(event) {
  if (!checkbox.checked) {
    return;
  }

  const newWidth = document.documentElement.clientWidth;

    if (newWidth >= 768 || event.target.className === "header__link") {
      checkbox.checked = false;
      noScroll();
    }
}

export { noScroll, menuAutoClose };
