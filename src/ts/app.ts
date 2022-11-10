import throttle from "lodash.throttle";
import { noScroll, menuAutoClose } from "./mobile-menu";
import { headerNavList, showActiveLink } from "./header-links";
import {
  blogPoints,
  changeActiveBtn,
  paginator,
  checkResize,
} from "./paginator";
import {
  customerPoints,
  paginatorCustomer,
  changeActiveBtnCustomer,
} from "./customer-paginator";
import { DATA_SLICK_SLIDER } from "./state";
import { makeRequest } from "./request";
import {
  SliderSlick,
  setSlickData,
  renderCards,
  makeActiveSlick,
} from "./slick-slider";
import {
  NativeSlider,
  setNativeData,
  renderSlides,
  makeActiveNative,
} from "./native-slider";
import { FormActive } from "./form";
import { Storage } from "./storage";
import { Select } from "./select";

export class App {
  constructor() {
    this.initFunctions();
  }

  async initFunctions() {
    noScroll();
    menuAutoClose(event);

    document.addEventListener("DOMContentLoaded", paginationHandler);
    blogPoints.addEventListener("click", eventClickHandler);
    customerPoints.addEventListener("click", eventClickHandlerCustomer);
    headerNavList.addEventListener("click", showActiveLink);
    window.addEventListener("resize", throttle(eventResizeHandler, 500));

    function paginationHandler(event: Event): void {
      paginator(event);
      paginatorCustomer(event);
    }

    function eventClickHandlerCustomer(event: Event): void {
      paginatorCustomer(event);
      changeActiveBtnCustomer(event);
    }

    function eventResizeHandler(event: Event): void {
      menuAutoClose(event);
      checkResize();
    }

    function eventClickHandler(event: Event): void {
      changeActiveBtn(event);
      paginator(event);
    }

    const dataForNative: [] = await makeRequest();

    const slickStorage: Storage = new Storage("slickData");
    slickStorage.setData(DATA_SLICK_SLIDER);

    const coursesSlider: SliderSlick = new SliderSlick({
      parentClassName: "slick-slider",
      renderSlidesHtml: renderCards,
      makeActive: makeActiveSlick,
    });

    coursesSlider.setData = setSlickData(slickStorage.getData() as []);

    const nativeSlider: NativeSlider = new NativeSlider({
      parentClassName: "native-slider",
      renderSlidesHtml: renderSlides.bind(this, dataForNative.length),
      makeActive: makeActiveNative,
    });

    nativeSlider.setData = setNativeData(dataForNative);

    const select: Select = new Select("select");

    select.getSelect().addEventListener("change", onAlbumChange);

    async function onAlbumChange(event: Event) {
      const target = event.target as HTMLOptionElement;
      let data: [] = await makeRequest(Number(target.value));
      nativeSlider.setData = setNativeData(data);
    }

    const myForm: FormActive = new FormActive("blog__form", "form__input");
  }
}