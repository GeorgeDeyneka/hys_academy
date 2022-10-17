import { DATA_PAGINATOR } from "./state.js";

const BLOG_CARDS = document.querySelector(".blog__cards");
const BLOG_POINTS = document.querySelector(".blog__points");
const CARDS_PER_PAGE = 2;

(function renderPaginationBtn() {
  if (!DATA_PAGINATOR) return;
  for (let i = 1; i <= Math.ceil(DATA_PAGINATOR.length / 2); i++) {
    const BLOG_POINT_BTN = document.createElement("button");
    const BLOG_POINT_LI = document.createElement("li");

    BLOG_POINT_LI.classList.add("blog__point");
    BLOG_POINT_BTN.classList.add("blog__point-btn");

    BLOG_POINTS.appendChild(BLOG_POINT_LI);
    BLOG_POINT_LI.appendChild(BLOG_POINT_BTN);
    
    BLOG_POINT_BTN.innerText = `${i}`;
    BLOG_POINT_BTN.type = "button";
    
    if (i === 1) {
      BLOG_POINT_BTN.classList.add("blog__point-btn_active");
    }
  }
})();

function paginator(event) {
  if (
    event.target.className === "blog__point" ||
    event.target.className === "blog__point-btn_active" ||
    event.target.className === "blog__points"
  )
    return;
  // Here contains doesn't work
  const BUTTON_ACTIVE = event.target.innerText;
  setTimeout(getData.bind(this, BUTTON_ACTIVE), 200);
}

function changeActiveBtn(event) {
  if (
    event.target.classList.contains("blog__point") ||
    event.target.classList.contains("blog__point-btn_active") ||
    event.target.classList.contains("blog__points")
  )
    return;
  document
    .querySelector(".blog__point-btn_active")
    .classList.remove("blog__point-btn_active");
  event.target.classList.add("blog__point-btn_active");
  BLOG_CARDS.classList.add("blog__cards_opacity");
  setTimeout(() => BLOG_CARDS.classList.remove("blog__cards_opacity"), 200);
}

function getData(numberOfBtn = 1) {
  if (!DATA_PAGINATOR) return;
  const NEW_ARR = DATA_PAGINATOR.slice(
    CARDS_PER_PAGE * numberOfBtn - CARDS_PER_PAGE,
    CARDS_PER_PAGE * numberOfBtn
  );
  const ARR_CARDS = document.querySelectorAll(".blog__card");
  switch (NEW_ARR.length) {
    case 1:
      if (ARR_CARDS[ARR_CARDS.length - 1].classList.contains("blog__card_delete"))
        return;
      ARR_CARDS[ARR_CARDS.length - 1].classList.add("blog__card_delete");
      break;
    case 2:
      ARR_CARDS.forEach((el) => el.classList.remove("blog__card_delete"));
      break;
  }
  changeData(NEW_ARR);
}

function changeData(paginatedData) {
  if (!paginatedData) return;
  paginatedData.forEach((el, i) => {
    BLOG_CARDS.children[i].querySelector(".blog__subtitle-text").innerText =
      el.title;
    BLOG_CARDS.children[i].querySelector(".blog__illustration-img").src =
      el.imageUrl;
    BLOG_CARDS.children[i].querySelector(".blog__avatar-img").src = el.avatarUrl;
    BLOG_CARDS.children[i].querySelector(".blog__vertical-text").innerText =
      el.category;
    BLOG_CARDS.children[i].querySelector(".blog__read-link").innerText =
      el.linkText;
  });
}

export { BLOG_POINTS, changeActiveBtn, paginator };
