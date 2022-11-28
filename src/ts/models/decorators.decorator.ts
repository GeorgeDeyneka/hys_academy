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

function LocalStorage(target: Object, key: string): void {
  Object.defineProperty(target, key, {
    get: function (): SlickDataType[] | FormDataType {
      if (localStorage.getItem(this.key) != null) {
        return JSON.parse(localStorage.getItem(this.key));
      }
      return [];
    },

    set: function (data: SlickDataType[] | FormDataType): void {
      localStorage.setItem(this.key, JSON.stringify(data));
    },
  });
}

function SessionStorage(target: Object, key: string): void {
  Object.defineProperty(target, key, {
    get: function (): number {
      if (sessionStorage.getItem(this.key) != null) {
        return JSON.parse(sessionStorage.getItem(this.key));
      }
      return 0;
    },

    set: function (data: number): void {
      sessionStorage.setItem(this.key, JSON.stringify(data));
    },
  });
}

export { ReadOnly, LocalStorage, SessionStorage };
