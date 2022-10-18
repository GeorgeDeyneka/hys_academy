import "./mobile-menu.js";
import { blogPoints, changeActiveBtn, paginator } from "./paginator.js";
import { DATA_SLICK_SLIDER, DATA_NATIVE_SLIDER } from "./state.js";
import { SliderSlick } from "./slick-slider.js";
import { NativeSlider } from "./native-slider.js";

blogPoints.addEventListener("click", paginator);
blogPoints.addEventListener("click", changeActiveBtn);

const coursesItems = document.querySelector(".courses__items");
const coursesSlider = new SliderSlick(coursesItems, DATA_SLICK_SLIDER);
coursesSlider.initSlider();

const studySlider = document.getElementById("native-slider");
const nativeSlider = new NativeSlider(studySlider, DATA_NATIVE_SLIDER);

document.addEventListener("DOMContentLoaded", paginator);
