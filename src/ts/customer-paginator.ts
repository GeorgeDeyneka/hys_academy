import { DATA_CUSTOMERS_PAGINATOR } from "./state";
import { customerDataType } from "./models/types.model";

const customerPoints = document.querySelector(
  ".customer__points"
) as HTMLElement;

function paginatorCustomer(event: Event): void {
  const target = event.target as HTMLButtonElement;
  const classesArr: string[] = [
    "customer__point-btn_active",
    "customer__points",
    "customer__point",
  ];

  if (classesArr.includes(target.className)) return;

  const buttonActive: string = target.value;

  setTimeout(getData.bind(this, buttonActive), 200);
}

function changeActiveBtnCustomer(event: Event): void {
  const target = event.target as HTMLButtonElement;

  if (target.className !== "customer__point-btn") return;

  const quoteBlock = document.querySelector(
    ".customer__excerption"
  ) as HTMLElement;
  const customerImg = document.querySelector(
    ".customer__card-img"
  ) as HTMLImageElement;

  const activeBtn = document.querySelector(
    ".customer__point-btn_active"
  ) as HTMLButtonElement;
  activeBtn.classList.remove("customer__point-btn_active");

  target.classList.add("customer__point-btn_active");
  quoteBlock.classList.add("customer__excerption_opacity");
  customerImg.classList.add("customer__card-img_opacity");

  setTimeout(() => {
    quoteBlock.classList.remove("customer__excerption_opacity");
    customerImg.classList.remove("customer__card-img_opacity");
  }, 200);
}

function getData(numberOfBtn = 1): void {
  if (!DATA_CUSTOMERS_PAGINATOR) return;

  changeData(DATA_CUSTOMERS_PAGINATOR[numberOfBtn - 1]);
}

function changeData(paginatedData: customerDataType): void {
  if (!paginatedData) return;

  const getElement = (selector: string): HTMLElement =>
    document.querySelector(selector);

  (getElement(".customer__card-img") as HTMLImageElement).src =
    paginatedData.imageUrl;
  getElement(".customer__description-text_first").innerText =
    paginatedData.firstParagraph;
  getElement(".customer__description-text_second").innerText =
    paginatedData.secondParagraph;
  getElement(".customer__author").innerText = paginatedData.author;
  getElement(".customer__blue-square").style.backgroundColor =
    paginatedData.bgColor;
  getElement(".customer__quotes-img").style.fill = paginatedData.quoteColor;
}

(function renderPaginationBtn(): void {
  if (!DATA_CUSTOMERS_PAGINATOR) return;

  for (let i = 1; i <= DATA_CUSTOMERS_PAGINATOR.length; i++) {
    const point = document.createElement("li") as HTMLLIElement;
    const button = document.createElement("button") as HTMLButtonElement;

    point.classList.add("customer__point");
    button.classList.add("customer__point-btn");
    button.value = i.toString();
    button.type = "button";

    point.appendChild(button);
    customerPoints.appendChild(point);

    if (i === 1) {
      button.classList.add("customer__point-btn_active");
    }
  }
})();

export { customerPoints, paginatorCustomer, changeActiveBtnCustomer };
