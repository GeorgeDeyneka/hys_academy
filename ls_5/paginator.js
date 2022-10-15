import { state } from "./state.js";

const blogCards = document.querySelector(".blog__cards");
const blogPoints = document.querySelector(".blog__points");

function paginator(event) {
  let buttonActive;
  if (
    event.target.className === "blog__points" ||
    event.target.className === "blog__point"
  ) {
    return;
  }
  buttonActive = event.target.innerText;
  setTimeout(getData.bind(this, blogCards.children.length, buttonActive), 200);
}

(function renderPaginationBtn() {
  for (let i = 1; i <= Math.ceil(state.length / 2); i++) {
    const blogPointBtn = document.createElement("button");
    const blogPointLi = document.createElement("li");

    blogPointLi.classList.add("blog__point");
    blogPointBtn.classList.add("blog__point-btn");

    blogPoints.appendChild(blogPointLi);
    blogPointLi.appendChild(blogPointBtn);

    blogPointBtn.innerText = `${i}`;
    blogPointBtn.type = "button";

    if (blogPointBtn.innerText == 1) {
      blogPointBtn.classList.add("blog__point-btn_active");
    }
  }

  const arrButtons = document.querySelectorAll(".blog__point-btn");

  arrButtons.forEach((el) => {
    el.addEventListener("click", changeActiveBtn);
  });
})();

function changeActiveBtn(event) {
  if (event.target.className === "blog__point-btn blog__point-btn_active")
    return;
  document
    .querySelector(".blog__point-btn_active")
    .classList.remove("blog__point-btn_active");
  event.target.classList.add("blog__point-btn_active");
  blogCards.classList.add("blog__cards_opacity");
  setTimeout(() => blogCards.classList.remove("blog__cards_opacity"), 200);
}

function getData(cardsPerPage, numberOfBtn = 1) {
  const newArr = state.slice(
    cardsPerPage * numberOfBtn - cardsPerPage,
    cardsPerPage * numberOfBtn
  );
  const arrCards = [...document.querySelectorAll(".blog__card")];
  switch (newArr.length) {
    case 1:
      if (
        arrCards[arrCards.length - 1].className ===
        "blog__card blog__card_delete"
      ) {
        arrCards[0].classList.remove("blog__card_delete");
        return;
      } else {
        arrCards[arrCards.length - 1].className += " blog__card_delete";
      }
      break;
    case 2:
      arrCards.forEach((el) => el.classList.remove("blog__card_delete"));
      break;
  }
  changeData(blogCards, newArr);
}

function changeData(parentSelector, paginatedData) {
  paginatedData.forEach((el, i) => {
    parentSelector.children[i].querySelector(".blog__subtitle-text").innerText =
      el.title;
    parentSelector.children[i].querySelector(".blog__illustration-img").src =
      el.thumbnailUrl;
    parentSelector.children[i].querySelector(".blog__avatar-img").src =
      el.avatarUrl;
    parentSelector.children[i].querySelector(".blog__vertical-text").innerText =
      el.category;
    parentSelector.children[i].querySelector(".blog__read-link").innerText =
      el.linkText;
  });
}

export { blogPoints, paginator };
