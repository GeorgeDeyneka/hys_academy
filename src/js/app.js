const throttle = require("lodash.throttle");

import { noScroll, menuAutoClose } from "./mobile-menu.js";
import { headerNavList, showActiveLink } from "./header-links.js";
import {
  blogPoints,
  changeActiveBtn,
  paginator,
  checkResize,
} from "./paginator.js";
import {
  customerPoints,
  paginatorCustomer,
  changeActiveBtnCustomer,
} from "./customer-paginator.js";
import { DATA_SLICK_SLIDER } from "./state.js";
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

    document.addEventListener("DOMContentLoaded", paginationHandler);
    blogPoints.addEventListener("click", eventClickHandler);
    customerPoints.addEventListener("click", eventClickHandlerCustomer);
    headerNavList.addEventListener("click", showActiveLink);
    window.addEventListener("resize", throttle(eventResizeHandler, 500));

    function paginationHandler(event) {
      paginator(event);
      paginatorCustomer(event);
    }

    function eventClickHandlerCustomer(event) {
      paginatorCustomer(event);
      changeActiveBtnCustomer(event);
    }

    function eventResizeHandler(event) {
      menuAutoClose(event);
      checkResize();
    }

    function eventClickHandler(event) {
      changeActiveBtn(event);
      paginator(event);
    }

    const dataForNative = await makeRequest();

    const slickStorage = new Storage("slickData");
    slickStorage.setData(DATA_SLICK_SLIDER);

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

    select.getSelect().addEventListener("change", onAlbumChange);

    async function onAlbumChange(event) {
      let data = await makeRequest(event.target.value);
      nativeSlider.setData = setNativeData(data);
    }

    const myForm = new FormActive("blog__form", "form__input");
  }
}
