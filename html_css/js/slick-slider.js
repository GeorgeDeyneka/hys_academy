export class SliderSlick {

  #data;
  
  constructor(parentClassName, data) {
    this.parentClassName = parentClassName;
    this.#data = data;
    this.renderSlides();
    this.setData();
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

  renderSlides() {
    if (!this.#data) {
      throw new Error ("No data for slider provided")
    }
    const sliderWrapper = document.getElementById("slick-slider");
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
    for (let i = 0; i < this.#data.length; i++) {
      const divItem = document.createElement("div");
      sliderWrapper.appendChild(divItem);
      divItem.classList.add("courses__item");
      divItem.innerHTML = CARD_LAYOUT;
    }

    (function drawStars() {
      const starsBg = document.querySelectorAll(".courses__stars_background");
      const starsActive = document.querySelectorAll(".courses__stars_active");
      const STAR_LAYOUT = `
      <svg class="courses__stars-img" width="11" height="11">
          <use href="./assets/images/sprite.svg#icon-star"></use>
      </svg>`;
      starsBg.forEach((el) => {
        for (let i = 0; i < 5; i++) {
          el.innerHTML += STAR_LAYOUT;
        }
      });
      starsActive.forEach((el) => {
        for (let i = 0; i < 5; i++) {
          el.innerHTML += STAR_LAYOUT;
        }
      });
    })();
  }

  setData() {
    this.#data.forEach((el, i) => {
      this.parentClassName.children[i].querySelector(".courses__reviews").innerText =
        el.rewievs;
      this.parentClassName.children[i].querySelector(
        ".courses__title-card"
      ).innerText = el.title;
      this.parentClassName.children[i].querySelector(
        ".courses__subtitle-card"
      ).innerText = el.category;
      this.parentClassName.children[i].querySelector(".courses__card-img").src =
        el.imageUrl;
      this.parentClassName.children[i].querySelector(".courses__avatar-img").src =
        el.avatarUrl;
      this.parentClassName.children[i].querySelector(".price__actually").innerText =
        el.price.actually;
      this.parentClassName.children[i].querySelector(".price__old").innerText =
        el.price.old;
      this.parentClassName.children[i].querySelector(
        ".courses__stars_active"
      ).style.clipPath = `inset(0% calc(100% - (${el.raiting}% * 20)) 0% 0%)`;
    });
  }
}

