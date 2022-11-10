const headerNavList = document.querySelector(
  ".header__nav-list"
) as HTMLElement;
const links = document.querySelectorAll(
  ".header__link"
) as unknown as HTMLLinkElement[];
const ACTIVE_CLASS_NAME: string = "header__link_active";

function showActiveLink(event: Event): void {
  const target = event.target as HTMLLinkElement;
  if (
    window.innerWidth >= 768 &&
    target.classList.contains("header__link")
  ) {
    links.forEach((el) => {
      if (el.classList.contains(ACTIVE_CLASS_NAME)) {
        el.classList.remove(ACTIVE_CLASS_NAME);
        target.classList.add(ACTIVE_CLASS_NAME);
      }

      target.classList.add(ACTIVE_CLASS_NAME);

      setTimeout(() => el.classList.remove(ACTIVE_CLASS_NAME), 3000);
    });
  }
}

export { headerNavList, showActiveLink };
