const headerNavList = document.querySelector(".header__nav-list");
const links = document.querySelectorAll(".header__link");
const ACTIVE_CLASS_NAME = "header__link_active";

function showActiveLink(event) {
  if (
    window.innerWidth >= 768 &&
    event.target.classList.contains("header__link")
  ) {
    links.forEach((el) => {
      if (el.classList.contains(ACTIVE_CLASS_NAME)) {
        el.classList.remove(ACTIVE_CLASS_NAME);
        event.target.classList.add(ACTIVE_CLASS_NAME);
      }
      event.target.classList.add(ACTIVE_CLASS_NAME);
      setTimeout(() => el.classList.remove(ACTIVE_CLASS_NAME), 3000);
    });
  }
}

export { headerNavList, showActiveLink };
