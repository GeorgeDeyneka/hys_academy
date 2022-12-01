import { FormDataType, SlickDataType } from "./interfaces.model";

function ReadOnly(boolean: boolean) {
  return function (
    target: Object,
    key: string,
    descriptors: TypedPropertyDescriptor<() => Promise<void>>
  ) {
    descriptors.writable = !boolean;
  };
}

function SessionStorageDec(target: Object, key: string): void {
  Object.defineProperty(target, key, {
    get: function <T>(): T | Array<T> | number {
      if (sessionStorage.getItem(this.key) != null) {
        return JSON.parse(sessionStorage.getItem(this.key));
      }
      return this.key === "sliderPosition" ? 0 : [];
    },

    set: function <T>(data: T | Array<T>): void {
      sessionStorage.setItem(this.key, JSON.stringify(data));
    },
    configurable: true,
  });
}

function LocalStorageDec(target: Object, key: string): void {
  Object.defineProperty(target, key, {
    get: function <T>(): T | Array<T> | number {
      if (localStorage.getItem(this.key) != null) {
        return JSON.parse(localStorage.getItem(this.key));
      }
      return this.key === "sliderPosition" ? 0 : [];
    },

    set: function <T>(data: T | Array<T>): void {
      localStorage.setItem(this.key, JSON.stringify(data));
    },
    configurable: true,
  });
}

export { ReadOnly, SessionStorageDec, LocalStorageDec };
