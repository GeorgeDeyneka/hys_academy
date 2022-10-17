import "./mobile-menu.js";
import "./slider.js";
import { BLOG_POINTS, changeActiveBtn, paginator } from "./paginator.js";
import { DATA_SLICK_SLIDER, DATA_NATIVE_SLIDER } from "./state.js";
import { SliderSlick, NativeSlider } from "./slider.js";

BLOG_POINTS.addEventListener("click", paginator);
BLOG_POINTS.addEventListener("click", changeActiveBtn);

const COURSES_ITEMS = document.querySelector(".courses__items");
const COURSES_SLIDER = new SliderSlick(COURSES_ITEMS);
COURSES_SLIDER.renderSlides(DATA_SLICK_SLIDER.length);
COURSES_SLIDER.setData(COURSES_ITEMS, DATA_SLICK_SLIDER);
COURSES_SLIDER.initSlider();

const NATIVE_SLIDER = new NativeSlider();
NATIVE_SLIDER.renderSlides(DATA_NATIVE_SLIDER.length);
NATIVE_SLIDER.setData(DATA_NATIVE_SLIDER);

document.addEventListener("DOMContentLoaded", paginator);
