import { slickDataType } from "./types/types";

class SliderSlick {
  selector: string;
  renderFunc: () => string;
  makeActiveFunc: () => void;

  setData: any;

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
    parentSelector.innerHTML = this.renderFunc();
    this.makeActiveFunc();
    appendSvg();
  }
}

function makeActiveSlick(): void {
  const parentSelector = document.getElementById("slick-slider") as HTMLElement;

  $(parentSelector).slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 1000,
    infinite: false,
    draggable: false,
    waitForAnimate: true,
    mobileFirst: true,
    variableWidth: true,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 374,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 989,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  });
}

function appendSvg(): void {
  const slickButtons = document.querySelectorAll(
    ".slick-arrow"
  ) as unknown as HTMLButtonElement[];
  const arrowLayout: string = `<svg
                class="study__slide-img"
                width="10"
                height="14"
                stroke="#64be97"
              >
                <use href="./assets/images/sprite.svg#icon-arrow-left"></use>
              </svg>`;

  slickButtons.forEach((el) => (el.innerHTML += arrowLayout));
}

function renderCards(): string {
  const ITEMS: number = 6;
  const STARS: number = 5;
  let cardLayout: string = "";
  let starLayout: string = "";

  for (let i = 0; i < STARS; i++) {
    starLayout += `
      <svg class="courses__stars-img" width="11" height="11">
          <use href="./assets/images/sprite.svg#icon-star"></use>
      </svg>`;
  }

  for (let i = 0; i < ITEMS; i++) {
    cardLayout += `
         <div class="courses__item">
            <img
              class="courses__avatar-img"
              width="48"
              alt="Our teacher"
            />
            <img
              class="courses__card-img"
              width="270"
              alt=""
            />
            <div class="courses__text-content">
              <h6 class="courses__subtitle-card">Loading Data...</h6>
              <h3 class="courses__title-card">Loading Data...</h3>
              <div class="courses__description">
                <div class="courses__prices price">
                  <span class="price__actually bold-number"></span>
                  <p class="price__old"></p>
                </div>
                <div class="courses__raiting">
                  <div class="courses__stars courses__stars_background">
                  ${starLayout}</div>
                  <div class="courses__stars courses__stars_active">
                  ${starLayout}</div>
                  <p class="courses__reviews"></p>
                </div>
              </div>
            </div>
          </div>
        `;
  }

  return cardLayout;
}

const setSlickData = (data: slickDataType[]): void => {
  if (!data) {
    throw new Error("No data for slider provided");
  }

  const getElements = (selector: string): HTMLElement[] =>
    document.querySelectorAll(selector) as unknown as HTMLElement[];

  data.forEach((el: slickDataType, i: string | number) => {
    getElements(".courses__reviews")[i].innerText = el.rewievs;
    getElements(".courses__title-card")[i].innerText = el.title;
    getElements(".courses__subtitle-card")[i].innerText = el.category;
    getElements(".price__old")[i].innerText = el.price.old;
    getElements(".price__actually")[i].innerText = el.price.actually;
    getElements(".courses__stars_active")[
      i
    ].style.clipPath = `inset(0% calc(100% - (${el.raiting}% * 20)) 0% 0%)`;
    getElements(".courses__card-img")[i].src = el.imageUrl;
    getElements(".courses__avatar-img")[i].src = el.avatarUrl;
  });
};

export { SliderSlick, renderCards, setSlickData, makeActiveSlick };
