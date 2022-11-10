import { DATA_PAGINATOR } from "./state";
import { paginatorDataType } from "./types/types";

const blogCards = document.querySelector(".blog__cards") as HTMLElement;
const blogPoints = document.querySelector(".blog__points") as HTMLElement;
const CARDS_PER_PAGE: number = 2;
const PC_DISPLAY_WIDTH: number = 1440;

(function renderPaginationBtn(): void {
  if (!DATA_PAGINATOR) return;

  for (let i = 1; i <= Math.ceil(DATA_PAGINATOR.length / 2); i++) {
    const blogPointBtn = document.createElement("button") as HTMLButtonElement;
    const blogPointLi = document.createElement("li") as HTMLLIElement;

    blogPointLi.classList.add("blog__point");
    blogPointBtn.classList.add("blog__point-btn");

    blogPoints.appendChild(blogPointLi);
    blogPointLi.appendChild(blogPointBtn);

    blogPointBtn.innerText = i.toString();
    blogPointBtn.type = "button";

    if (i === 1) {
      blogPointBtn.classList.add("blog__point-btn_active");
    }
  }
})();

function paginator(event: Event): void {
  const classesArr: string[] = ["blog__point", "blog__point-btn_active", "blog__points"];
  const target = event.target as HTMLButtonElement;

  if (classesArr.includes(target.className)) return;

  const buttonActive: number = +target.innerText;

  setTimeout(getData.bind(this, buttonActive || 1), 200);

  blogPoints.children.length > 5
    ? buttonScroll(buttonActive, DATA_PAGINATOR)
    : (blogPoints.style.justifyContent = "center");
}

function checkTranslateProperty(): string {
  return window.innerWidth < PC_DISPLAY_WIDTH ? "translateX" : "translateY";
}

function checkResize(): string {
  if (window.innerWidth < PC_DISPLAY_WIDTH) {
    if (blogPoints.style.transform) {
      return (blogPoints.style.transform = "translateY(0px)");
    }
    return (blogPoints.style.transform += "translateY(0px)");
  } else {
    if (blogPoints.style.transform) {
      return (blogPoints.style.transform = "translateX(0px)");
    }
    return (blogPoints.style.transform += "translateX(0px)");
  }
}

function buttonScroll(activeButton: number, data: string | any[]) {
  const translateProperty: string = checkTranslateProperty();

  if (activeButton <= 3) {
    blogPoints.style.transform = `${translateProperty}(-0px)`;
  }

  if (activeButton > 3 && activeButton <= Math.round(data.length / 2) - 2) {
    blogPoints.style.transform = `${translateProperty}(-${
      62 * (activeButton - 3)
    }px)`;
  }

  if (activeButton == Math.round(data.length / 2) - 1) {
    blogPoints.style.transform = `${translateProperty}(-${
      62 * (activeButton - 4)
    }px)`;
  }
}

function changeActiveBtn(event: Event): void {
  const target = event.target as HTMLButtonElement;
  if (target.className !== "blog__point-btn") return;

  (
    document.querySelector(".blog__point-btn_active") as HTMLButtonElement
  ).classList.remove("blog__point-btn_active");

  target.classList.add("blog__point-btn_active");
  blogCards.classList.add("blog__cards_opacity");

  setTimeout(() => blogCards.classList.remove("blog__cards_opacity"), 200);
}

function getData(numberOfBtn: number): void {
  if (!DATA_PAGINATOR) return;

  const newArr: paginatorDataType[] = DATA_PAGINATOR.slice(
    CARDS_PER_PAGE * numberOfBtn - CARDS_PER_PAGE,
    CARDS_PER_PAGE * numberOfBtn
  );
  const arrCards = document.querySelectorAll(".blog__card") as unknown as HTMLElement[];

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

function changeData(paginatedData: any[]) {
  if (!paginatedData) return;

  paginatedData.forEach((el: paginatorDataType, i: string | number) => {
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

export { blogPoints, changeActiveBtn, paginator, checkResize };
