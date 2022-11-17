const checkbox = document.querySelector("#menu-toggle") as HTMLInputElement;
const menuList = document.querySelector(".header__nav") as HTMLElement;
const body = document.querySelector("body") as HTMLBodyElement;

checkbox.addEventListener("change", noScroll);
menuList.addEventListener("click", menuAutoClose);

function noScroll(): void {
  checkbox && checkbox.checked
    ? body.classList.add("no-scroll")
    : body.classList.remove("no-scroll");
}

function menuAutoClose(event: Event): void {
  if (!checkbox.checked) {
    return;
  }
  
  const target = event.target as HTMLLinkElement;
  const newWidth: number = document.documentElement.clientWidth;

  if (newWidth >= 768 || target.className === "header__link") {
    checkbox.checked = false;
    noScroll();
  }
}

export { noScroll, menuAutoClose };