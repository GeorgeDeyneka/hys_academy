import { DATA_CUSTOMERS_PAGINATOR } from "./state.js";

const customerPoints = document.querySelector(".customer__points");

function paginatorCustomer(event) {
  const classesArr = [
    "customer__point-btn_active",
    "customer__points",
    "customer__point",
  ];

  if (classesArr.includes(event.target.className)) return;

  const buttonActive = event.target.value;

  setTimeout(getData.bind(this, buttonActive), 200);
}

function changeActiveBtnCustomer(event) {
  if (event.target.className !== "customer__point-btn") return;

  const quoteBlock = document.querySelector(".customer__excerption");
  const customerImg = document.querySelector(".customer__card-img");

  document
    .querySelector(".customer__point-btn_active")
    .classList.remove("customer__point-btn_active");

  event.target.classList.add("customer__point-btn_active");
  quoteBlock.classList.add("customer__excerption_opacity");
  customerImg.classList.add("customer__card-img_opacity");

  setTimeout(() => {
    quoteBlock.classList.remove("customer__excerption_opacity");
    customerImg.classList.remove("customer__card-img_opacity");
  }, 200);
}

function getData(numberOfBtn = 1) {
  if (!DATA_CUSTOMERS_PAGINATOR) return;

  changeData(DATA_CUSTOMERS_PAGINATOR[numberOfBtn - 1]);
}

function changeData(paginatedData) {
  if (!paginatedData) return;

  document.querySelector(".customer__description-text_first").innerText =
    paginatedData.firstParagraph;
  document.querySelector(".customer__description-text_second").innerText =
    paginatedData.secondParagraph;
  document.querySelector(".customer__author").innerText = paginatedData.author;
  document.querySelector(".customer__card-img").src = paginatedData.imageUrl;
  paginatedData.author;
  document.querySelector(".customer__blue-square").style.backgroundColor =
    paginatedData.bgColor;
  document.querySelector(".customer__quotes-img").style.fill =
    paginatedData.quoteColor;
}

(function renderPaginationBtn() {
  if (!DATA_CUSTOMERS_PAGINATOR) return;

  for (let i = 1; i <= DATA_CUSTOMERS_PAGINATOR.length; i++) {
    const point = document.createElement("li");
    const button = document.createElement("button");

    point.classList.add("customer__point");
    button.classList.add("customer__point-btn");
    button.value = i;
    button.type = "button";

    point.appendChild(button);
    customerPoints.appendChild(point);

    if (i === 1) {
      button.classList.add("customer__point-btn_active");
    }
  }
})();

export { customerPoints, paginatorCustomer, changeActiveBtnCustomer };
