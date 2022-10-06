import { state } from "./state.js";

const blogCards = document.querySelector(".blog__cards");
const blogPointBtn = document.querySelectorAll(".blog__point-btn");
const blogPoints = document.querySelector(".blog__points");

blogPointBtn.forEach((el) => {
  el.addEventListener("click", () => {
    const currentPoint = document.querySelectorAll(".blog__point-btn_active");
    currentPoint[0].classList.remove("blog__point-btn_active");
    el.classList.add("blog__point-btn_active");
  });
});
// I can't move this function outside because it use argument of cycle forEach

function paginator(event) {
  let buttonActive;
  if (event.target.className === "blog__points") {
    return;
    // I need this because without that rule i get empty array and cards is disappear.
  } else {
    buttonActive = event.target.innerText;
  }
  getData(blogCards.children.length, buttonActive);
}

function getData(quantityOfCards, numberOfBtn = 1) {
  const newArr = state.slice(
    quantityOfCards * numberOfBtn - quantityOfCards,
    quantityOfCards * numberOfBtn
  );
  const arrCards = [...document.querySelectorAll(".blog__card")];
  switch (newArr.length) {
    case 0:
      // According to the agreed rules, I need to display cards depending on the existing data.
      arrCards.forEach((el) => el.classList.add("blog__card_delete"));
      break;
    case 1:
      // The same thing. If array include only one element I have to display that one.
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
  });
}

export { blogPoints, paginator };
