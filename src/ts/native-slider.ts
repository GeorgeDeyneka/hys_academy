import throttle from "lodash.throttle";
import { ISlider, NativeDataType } from "./models/interfaces.model";
import { StorageClass } from "./storage";

class NativeSlider implements ISlider {
  private readonly selector: string;
  private readonly renderFunc: () => HTMLElement[];
  private readonly makeActiveFunc: () => void;

  public setData: (data: NativeDataType[]) => void;

  constructor({ parentClassName, renderSlidesHtml, makeActive }) {
    this.selector = parentClassName;
    this.renderFunc = renderSlidesHtml;
    this.makeActiveFunc = makeActive;
    this.initSlider();
  }

  initSlider(): void {
    const parentSelector = document.getElementById(
      this.selector
    ) as HTMLElement;
    parentSelector.append(...this.renderFunc());
    this.makeActiveFunc();
  }
}

function makeActiveNative(): void {
  const sliderNative = document.getElementById("native-slider") as HTMLElement;
  const sliderContainer = document.querySelector(
    ".study__list-container"
  ) as HTMLElement;
  const buttonPrev = document.querySelector(
    ".study__slide-prev"
  ) as HTMLButtonElement;
  const buttonNext = document.querySelector(
    ".study__slide-next"
  ) as HTMLButtonElement;
  const ulList = document.querySelector(".study__list") as HTMLUListElement;

  window.addEventListener("resize", throttle(adaptive, 500));

  sliderNative.addEventListener("click", (event: Event) => {
    const target = event.target as HTMLButtonElement;
    if (target.classList.contains("study__slide-prev")) {
      prev();
    } else if (target.classList.contains("study__slide-next")) {
      next();
    }
  });

  const nativeStorage = new StorageClass("sliderPosition");

  let slidesToShow: number = 0;
  let position = nativeStorage.getData<number>() || 0;
  
  const SLIDES_TO_SCROLL: number = 1;
  const arrItems = document.querySelectorAll(
    ".study__item"
  ) as NodeListOf<HTMLElement>;
  const itemsCount: number = arrItems.length;

  setPosition();

  function adaptive() {
    if (sliderContainer.clientWidth === 217) {
      return (slidesToShow = 1);
    } else if (sliderContainer.clientWidth === 651) {
      return (slidesToShow = 3);
    } else if (sliderContainer.clientWidth === 868) {
      return (slidesToShow = 4);
    }
  }

  adaptive();

  const itemWidth: number = sliderContainer.clientWidth / slidesToShow;
  const movePosition: number = SLIDES_TO_SCROLL * itemWidth;

  arrItems.forEach((el) => {
    el.style.minWidth = `calc(${itemWidth}px - 20px)`;
  });

  function setPosition(): void {
    nativeStorage.setData<number>(position);

    ulList.style.transform = `translateX(${position}px)`;
  }

  function checkButtons(): void {
    if (buttonPrev && buttonNext) {
      buttonPrev.disabled = position === 0;
      buttonNext.disabled =
        position <= -(itemsCount - slidesToShow) * itemWidth;
    }
  }

  function prev(): void {
    const restItems: number = Math.abs(position) / itemWidth;
    position +=
      restItems >= SLIDES_TO_SCROLL ? movePosition : restItems * itemWidth;

    setPosition();
    checkButtons();
  }

  function next(): void {
    const restItems: number =
      itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
    position -=
      restItems >= SLIDES_TO_SCROLL ? movePosition : restItems * itemWidth;
    setPosition();
    checkButtons();
  }

  checkButtons();
}

function renderSlides(quantityOfSlides: number): HTMLElement[] {
  const sliderContainer = document.createElement("div") as HTMLDivElement;
  const ulList = document.createElement("ul") as HTMLUListElement;
  const buttonPrev = document.createElement("button") as HTMLButtonElement;
  const buttonNext = document.createElement("button") as HTMLButtonElement;
  const arrowLayout: string = `<svg
                  class="study__slide-img"
                  width="10"
                  height="14"
                  stroke="#64be97"
                >
                  <use href="./assets/images/sprite.svg#icon-arrow-left"></use>
                </svg>`;

  buttonPrev.innerHTML += arrowLayout;
  buttonNext.innerHTML += arrowLayout;

  sliderContainer.classList.add("study__list-container");
  sliderContainer.append(ulList);
  ulList.classList.add("study__list");
  buttonPrev.classList.add("study__slide-prev", "slider__btn");
  buttonNext.classList.add("study__slide-next", "slider__btn");

  for (let i = 0; i < quantityOfSlides; i++) {
    const liItem = document.createElement("li") as HTMLLIElement;
    const imageBg = document.createElement("img") as HTMLImageElement;
    const title = document.createElement("h3") as HTMLElement;

    liItem.classList.add("study__item");
    imageBg.classList.add("study__item-img");
    imageBg.style.height = "197px";
    imageBg.style.minWidth = "197px";
    title.classList.add("study__item-text");

    liItem.append(imageBg, title);
    ulList.append(liItem);
  }
  if (quantityOfSlides) {
    return [buttonPrev, sliderContainer, buttonNext];
  }
  return [sliderContainer];
}

function setNativeData(data: NativeDataType[]): void {
  if (!data || !Object.keys(data).length) {
    throw new Error("No data for slider provided");
  }

  const arrTitles = document.querySelectorAll(
    ".study__item-text"
  ) as NodeListOf<HTMLElement>;
  const arrImages = document.querySelectorAll(
    ".study__item-img"
  ) as NodeListOf<HTMLImageElement>;

  data.forEach((el: NativeDataType, i: string | number) => {
    arrTitles[i].innerText = el.title;
    arrImages[i].src = el.url;
  });
}

export { NativeSlider, renderSlides, setNativeData, makeActiveNative };
