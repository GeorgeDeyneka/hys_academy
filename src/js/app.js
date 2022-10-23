import { noScroll, menuAutoClose } from "./mobile-menu.js";
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
    blogPoints.addEventListener("click", changeActiveBtn);
    blogPoints.addEventListener("click", paginator);

    const slickStorage = new Storage(DATA_SLICK_SLIDER, 'slickData')
    const nativeStorage = new Storage(DATA_NATIVE_SLIDER, 'nativeData')

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
