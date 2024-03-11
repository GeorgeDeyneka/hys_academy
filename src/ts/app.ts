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
import { StorageClass } from "./storage";
import { Select } from "./select";
import { NativeDataType, SlickDataType } from "./models/interfaces.model";
import { ReadOnly } from "./models/decorators.decorator";
import { ClassNamesForApp } from "./models/enums.model";

abstract class AbstractApp {
  protected BASE_URL: string;
  protected abstract initFunctions(): void;
}

export class App extends AbstractApp {
  protected BASE_URL: string = `https://jsonplaceholder.typicode.com/albums/`;

  constructor() {
    super();
    this.initFunctions();
  }

  @ReadOnly(true)
  protected async initFunctions() {
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

    const dataForNative: NativeDataType[] = await makeRequest<NativeDataType>(
      this.BASE_URL
    );

    const slickStorage: StorageClass = new StorageClass("slickData");
    slickStorage.setData(DATA_SLICK_SLIDER);

    const coursesSlider: SliderSlick = new SliderSlick({
      parentClassName: ClassNamesForApp.slickSlider,
      renderSlidesHtml: renderCards,
      makeActive: makeActiveSlick,
    });

    coursesSlider.setData = setSlickData;
    coursesSlider.setData(slickStorage.getData<SlickDataType[]>());

    const nativeSlider: NativeSlider = new NativeSlider({
      parentClassName: ClassNamesForApp.nativeSlider,
      renderSlidesHtml: renderSlides.bind(this, dataForNative.length),
      makeActive: makeActiveNative,
    });

    nativeSlider.setData = setNativeData;
    nativeSlider.setData(dataForNative);

    const select: Select = new Select(ClassNamesForApp.select);

    select.getSelect().addEventListener("change", onAlbumChange.bind(this));

    async function onAlbumChange(event: Event): Promise<void> {
      const target = event.target as HTMLOptionElement;
      let data: NativeDataType[] = await makeRequest<NativeDataType>(
        this.BASE_URL,
        Number(target.value)
      );
      nativeSlider.setData(data);
    }

    const myForm: FormActive = new FormActive(
      ClassNamesForApp.blogForm,
      ClassNamesForApp.formInput
    );
  }
}
