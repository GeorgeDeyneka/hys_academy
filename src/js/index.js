import "./mobile-menu.js";
import "./app.js";
import "./storage";
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

blogPoints.addEventListener("click", paginator);
blogPoints.addEventListener("click", changeActiveBtn);
document.addEventListener("DOMContentLoaded", paginator);

const coursesSlider = new SliderSlick({
  parentClassName: "slick-slider",
    renderSlidesHtml: renderCards,
  makeActive: makeActiveSlick
});

coursesSlider.setData = setSlickData(DATA_SLICK_SLIDER);


const nativeSlider = new NativeSlider({
  parentClassName: "native-slider",
  renderSlidesHtml: renderSlides,
  makeActive: makeActiveNative,
});

nativeSlider.setData = setNativeData(DATA_NATIVE_SLIDER);
