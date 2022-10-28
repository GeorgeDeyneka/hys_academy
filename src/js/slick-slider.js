class SliderSlick {
  #selector;
  #renderFunc;
  #makeActiveFunc;

  setData = () => {};

  constructor({ parentClassName, renderSlidesHtml, makeActive }) {
    this.#selector = parentClassName;
    this.#renderFunc = renderSlidesHtml;
    this.#makeActiveFunc = makeActive;
    this.initSlider();
  }

  initSlider() {
    const parentSelector = document.getElementById(this.#selector);
    parentSelector.innerHTML = this.#renderFunc();
    this.#makeActiveFunc();
  }
}

function makeActiveSlick() {
  const parentSelector = document.getElementById("slick-slider");
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

function renderCards() {
  const ITEMS = 6;
  const STARS = 5;
  let cardLayout = "";
  let starLayout = "";
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

function setSlickData(data) {
  if (!data) {
    throw new Error("No data for slider provided");
  }
  const arrReviews = document.querySelectorAll(".courses__reviews");
  const arrTitles = document.querySelectorAll(".courses__title-card");
  const arrSubtitles = document.querySelectorAll(".courses__subtitle-card");
  const arrImagesBg = document.querySelectorAll(".courses__card-img");
  const arrAvatars = document.querySelectorAll(".courses__avatar-img");
  const arrActuallyPrices = document.querySelectorAll(".price__actually");
  const arrOldPrices = document.querySelectorAll(".price__old");
  const arrStars = document.querySelectorAll(".courses__stars_active");
  data.forEach((el, i) => {
    arrReviews[i].innerText = el.rewievs;
    arrTitles[i].innerText = el.title;
    arrSubtitles[i].innerText = el.category;
    arrImagesBg[i].src = el.imageUrl;
    arrAvatars[i].src = el.avatarUrl;
    arrActuallyPrices[i].innerText = el.price.actually;
    arrOldPrices[i].innerText = el.price.old;
    arrStars[
      i
    ].style.clipPath = `inset(0% calc(100% - (${el.raiting}% * 20)) 0% 0%)`;
  });
}

export { SliderSlick, renderCards, setSlickData, makeActiveSlick };
