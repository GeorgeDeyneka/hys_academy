import { DATA_PAGINATOR } from "./state.js";

const blogCards = document.querySelector(".blog__cards");
const blogPoints = document.querySelector(".blog__points");
const CARDS_PER_PAGE = 2;

(function renderPaginationBtn() {
  if (!DATA_PAGINATOR) return;
  for (let i = 1; i <= Math.ceil(DATA_PAGINATOR.length / 2); i++) {
    const blogPointBtn = document.createElement("button");
    const blogPointLi = document.createElement("li");

    blogPointLi.classList.add("blog__point");
    blogPointBtn.classList.add("blog__point-btn");

    blogPoints.appendChild(blogPointLi);
    blogPointLi.appendChild(blogPointBtn);
    
    blogPointBtn.innerText = `${i}`;
    blogPointBtn.type = "button";
    
    if (i === 1) {
      blogPointBtn.classList.add("blog__point-btn_active");
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
  const buttonActive = event.target.innerText;
  setTimeout(getData.bind(this, buttonActive), 200);
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
  blogCards.classList.add("blog__cards_opacity");
  setTimeout(() => blogCards.classList.remove("blog__cards_opacity"), 200);
}

function getData(numberOfBtn = 1) {
  if (!DATA_PAGINATOR) return;
  const newArr = DATA_PAGINATOR.slice(
    CARDS_PER_PAGE * numberOfBtn - CARDS_PER_PAGE,
    CARDS_PER_PAGE * numberOfBtn
  );
  const arrCards = document.querySelectorAll(".blog__card");
  switch (newArr.length) {
    case 1:
      if (arrCards[arrCards.length - 1].classList.contains("blog__card_delete"))
        return;
      arrCards[arrCards.length - 1].classList.add("blog__card_delete");
      break;
    case 2:
      arrCards.forEach((el) => el.classList.remove("blog__card_delete"));
      break;
  }
  changeData(newArr);
}

function changeData(paginatedData) {
  if (!paginatedData) return;
  paginatedData.forEach((el, i) => {
    blogCards.children[i].querySelector(".blog__subtitle-text").innerText =
      el.title;
    blogCards.children[i].querySelector(".blog__illustration-img").src =
      el.imageUrl;
    blogCards.children[i].querySelector(".blog__avatar-img").src = el.avatarUrl;
    blogCards.children[i].querySelector(".blog__vertical-text").innerText =
      el.category;
    blogCards.children[i].querySelector(".blog__read-link").innerText =
      el.linkText;
  });
}

export { blogPoints, changeActiveBtn, paginator };