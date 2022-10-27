import { noScroll, menuAutoClose } from "./mobile-menu.js";
import { headerNavList, showActiveLink } from "./header-links.js";
import { blogPoints, changeActiveBtn, paginator } from "./paginator.js";
import { DATA_SLICK_SLIDER, DATA_NATIVE_SLIDER } from "./state.js";
import { makeRequest } from "./request.js";
import {
  SliderSlick,
  setSlickData,
  renderCards,
  makeActiveSlick,
} from "./slick-slider.js";
import {
  NativeSlider,
  setNativeData,
  renderSlides,
  makeActiveNative,
} from "./native-slider.js";
import { FormActive } from "./form.js";
import { Storage } from "./storage.js";
import { Select } from "./select.js";

export class App {
  constructor() {
    this.initFunctions();
  }

  async initFunctions() {
    noScroll();
    menuAutoClose();

    document.addEventListener("DOMContentLoaded", paginator);
    blogPoints.addEventListener("click", eventHandler);
    headerNavList.addEventListener("click", showActiveLink);

    function eventHandler(event) {
      changeActiveBtn(event);
      paginator(event);
    }

    const dataForNative = await makeRequest();

    const slickStorage = new Storage(DATA_SLICK_SLIDER, "slickData");

    const coursesSlider = (new SliderSlick({
      parentClassName: "slick-slider",
      renderSlidesHtml: renderCards,
      makeActive: makeActiveSlick,
    }).setData = setSlickData(slickStorage.getData()));

    const nativeSlider = new NativeSlider({
      parentClassName: "native-slider",
      renderSlidesHtml: renderSlides.bind(this, dataForNative.length),
      makeActive: makeActiveNative,
    });
    nativeSlider.setData = setNativeData(dataForNative);

    const select = new Select("select");

    select.getSelect().addEventListener("change", async (event) => {
      let data = await makeRequest(event.target.value);
      nativeSlider.setData = setNativeData(data);
    });

    const myForm = new FormActive("blog__form", "form__input");
  }
}
