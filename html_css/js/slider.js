import { DATA_SLICK_SLIDER, DATA_NATIVE_SLIDER } from "./state.js";

class SliderSlick {
  constructor(parentClassName) {
    this.parentClassName = parentClassName;
  }

  initSlider() {
    $(this.parentClassName).slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      speed: 500,
      infinite: false,
      draggable: false,
      waitForAnimate: false,
      mobileFirst: true,
      variableWidth: true,
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

  renderSlides(quantityOfSlides) {
    this.quantityOfSlides = quantityOfSlides;
    const SLIDER_WRAPPER = document.getElementById("slick-slider");
    const CARD_LAYOUT = `
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
                  <div class="courses__stars courses__stars_background"></div>
                  <div class="courses__stars courses__stars_active"></div>
                  <p class="courses__reviews"></p>
                </div>
              </div>
            </div>
        `;
    for (let i = 0; i < quantityOfSlides; i++) {
      const DIV_ITEM = document.createElement("div");
      SLIDER_WRAPPER.appendChild(DIV_ITEM);
      DIV_ITEM.classList.add("courses__item");
      DIV_ITEM.innerHTML = CARD_LAYOUT;
    }

    (function drawStars() {
      const STARS_BG = document.querySelectorAll(".courses__stars_background");
      const STARS_ACTIVE = document.querySelectorAll(".courses__stars_active");
      const STAR_LAYOUT = `
      <svg class="courses__stars-img" width="11" height="11">
          <use href="./assets/images/sprite.svg#icon-star"></use>
      </svg>`;
      STARS_BG.forEach((el) => {
        for (let i = 0; i < 5; i++) {
          el.innerHTML += STAR_LAYOUT;
        }
      });
      STARS_ACTIVE.forEach((el) => {
        for (let i = 0; i < 5; i++) {
          el.innerHTML += STAR_LAYOUT;
        }
      });
    })();
  }

  setData(parentSelector, data) {
    this.parentSelector = parentSelector;
    this.data = data;
    data.forEach((el, i) => {
      parentSelector.children[i].querySelector(".courses__reviews").innerText =
        el.rewievs;
      parentSelector.children[i].querySelector(
        ".courses__title-card"
      ).innerText = el.title;
      parentSelector.children[i].querySelector(
        ".courses__subtitle-card"
      ).innerText = el.category;
      parentSelector.children[i].querySelector(".courses__card-img").src =
        el.imageUrl;
      parentSelector.children[i].querySelector(".courses__avatar-img").src =
        el.avatarUrl;
      parentSelector.children[i].querySelector(".price__actually").innerText =
        el.price.actually;
      parentSelector.children[i].querySelector(".price__old").innerText =
        el.price.old;
      parentSelector.children[i].querySelector(
        ".courses__stars_active"
      ).style.clipPath = `inset(0% calc(100% - (${el.raiting}% * 20)) 0% 0%)`;
    });
  }
}

const COURSES_ITEMS = document.querySelector(".courses__items");
const COURSES_SLIDER = new SliderSlick(COURSES_ITEMS);
COURSES_SLIDER.renderSlides(DATA_SLICK_SLIDER.length);
COURSES_SLIDER.setData(COURSES_ITEMS, DATA_SLICK_SLIDER);
COURSES_SLIDER.initSlider();



class NativeSlider {
  constructor() {}

  renderSlides(quantityOfSlides) {
    this.quantityOfSlides = quantityOfSlides;

    const CONTAINER = document.createElement("div");
    const UL_LIST = document.createElement("ul");

    CONTAINER.classList.add("study__list-container");
    CONTAINER.append(UL_LIST);

    const BUTTON_PREV = document.createElement("button");
    const BUTTON_NEXT = document.createElement("button");

    BUTTON_PREV.classList.add("study__slide-prev", "slider__btn");
    BUTTON_NEXT.classList.add("study__slide-next", "slider__btn");

    SLIDER_WRAPPER.append(BUTTON_PREV, CONTAINER, BUTTON_NEXT);
    UL_LIST.classList.add("study__list");

    for (let i = 0; i < quantityOfSlides; i++) {
      const LI_ITEM = document.createElement("li");
      const IMAGE_BG = document.createElement("img");
      const TITLE = document.createElement("h3");

      LI_ITEM.classList.add("study__item");
      IMAGE_BG.classList.add("study__item-img");
      IMAGE_BG.style.height = "197px";
      IMAGE_BG.style.minWidth = "197px";
      TITLE.classList.add("study__item-text");

      LI_ITEM.append(IMAGE_BG, TITLE);
      UL_LIST.append(LI_ITEM);
    }

    (function scrollList(event) {
      window.addEventListener("resize", adaptive);
      SLIDER_WRAPPER.addEventListener("click", (event) => {
        if (event.target.classList.contains("study__slide-prev")) prev();
        else if (event.target.classList.contains("study__slide-next")) next();
      })

      let slidesToShow;
      let position = 0;
      const SLIDES_TO_SCROLL = 1;
      const ARR_ITEMS = document.querySelectorAll(".study__item");
      const ITEMS_COUNT = ARR_ITEMS.length;

      function adaptive() {
        if (CONTAINER.clientWidth === 217) {
          return (slidesToShow = 1);
        } else if (CONTAINER.clientWidth === 651) {
          return (slidesToShow = 3);
        } else if (CONTAINER.clientWidth === 868) {
          return (slidesToShow = 4);
        }
      }

      adaptive();

      const ITEM_WIDTH = CONTAINER.clientWidth / slidesToShow;
      const MOVE_POSITION = SLIDES_TO_SCROLL * ITEM_WIDTH;

      ARR_ITEMS.forEach((el) => {
        el.style.minWidth = `calc(${ITEM_WIDTH}px - 20px)`;
      });

      function setPosition() {
        UL_LIST.style.transform = `translateX(${position}px)`;
      }
      function checkButtons() {
        BUTTON_PREV.disabled = position === 0;
        BUTTON_NEXT.disabled =
          position <= -(ITEMS_COUNT - slidesToShow) * ITEM_WIDTH;
      }

      function prev() {
        const REST_ITEMS = Math.abs(position) / ITEM_WIDTH;

        position +=
          REST_ITEMS >= SLIDES_TO_SCROLL
            ? MOVE_POSITION
            : REST_ITEMS * ITEM_WIDTH;

        setPosition();
        checkButtons();
      }

      function next() {
        const REST_ITEMS =
          ITEMS_COUNT -
          (Math.abs(position) + slidesToShow * ITEM_WIDTH) / ITEM_WIDTH;
        position -=
          REST_ITEMS >= SLIDES_TO_SCROLL
            ? MOVE_POSITION
            : REST_ITEMS * ITEM_WIDTH;
        setPosition();
        checkButtons();
      }

      checkButtons();
    })();
  }

  setData(data) {
    this.data = data;
    const ARR_TITLE = document.querySelectorAll(".study__item-text");
    const ARR_IMAGES = document.querySelectorAll(".study__item-img");
    const ARR_ITEMS = document.querySelectorAll(".study__item");
    data.forEach((el, i) => {
      ARR_TITLE[i].innerText = el.title;
      ARR_IMAGES[i].src = el.imageUrl;
      ARR_ITEMS[i].style.backgroundColor = el.bgColor;
    });
  }
}

const SLIDER_WRAPPER = document.getElementById("native-slider");
const NATIVE_SLIDER = new NativeSlider();
NATIVE_SLIDER.renderSlides(DATA_NATIVE_SLIDER.length);
NATIVE_SLIDER.setData(DATA_NATIVE_SLIDER);
