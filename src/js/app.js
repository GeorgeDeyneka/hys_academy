import { noScroll, menuAutoClose } from "./mobile-menu.js";
import { headerNavList, showActiveLink } from "./header-links.js";
import { blogPoints, changeActiveBtn, paginator } from "./paginator.js";
import { DATA_SLICK_SLIDER, DATA_NATIVE_SLIDER } from "./state.js";
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

export class App {
  constructor() {
    this.initFunctions();
  }
  initFunctions() {
    noScroll();
    menuAutoClose();

    document.addEventListener("DOMContentLoaded", paginator);
    blogPoints.addEventListener("click", eventHandler);
    headerNavList.addEventListener("click", showActiveLink);

    function eventHandler(event) {
      changeActiveBtn(event);
      paginator(event);
    }

    const slickStorage = new Storage("slickData");
    slickStorage.setData(DATA_SLICK_SLIDER);
    const nativeStorage = new Storage("nativeData");
    nativeStorage.setData(DATA_NATIVE_SLIDER);

    const coursesSlider = (new SliderSlick({
      parentClassName: "slick-slider",
      renderSlidesHtml: renderCards,
      makeActive: makeActiveSlick,
    }).setData = setSlickData(slickStorage.getData()));

    const nativeSlider = (new NativeSlider({
      parentClassName: "native-slider",
      renderSlidesHtml: renderSlides,
      makeActive: makeActiveNative,
    }).setData = setNativeData(nativeStorage.getData()));

    const myForm = new FormActive("blog__form", "form__input");
  }
}
