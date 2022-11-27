import { SlickDataType } from "./interfaces.model";

function ReadOnly(boolean: boolean) {
  return function (
    target: Object,
    key: string,
    descriptors: TypedPropertyDescriptor<() => Promise<void>>
  ) {
    descriptors.writable = !boolean;
  };
}

function LocalStorage(keyData: string): (target: Object, key: string) => void {
  return function (target: Object, key: string) {
    const getData = (): SlickDataType[] => {
      if (localStorage.getItem(keyData) != null) {
        return JSON.parse(localStorage.getItem(keyData));
      }
      return [];
    };

    const setData = (data: SlickDataType[]): void => {
      localStorage.setItem(keyData, JSON.stringify(data));
    };

    Object.defineProperty(target, key, {
      get: getData,
      set: setData,
    });
  };
}

function SessionStorage(keyData: string): (target: Object, key: string) => void {
  return function (target: Object, key: string) {
    const getData = (): number => {
      if (sessionStorage.getItem(keyData) != null) {
        return JSON.parse(sessionStorage.getItem(keyData));
      }
      return 0;
    };

    const setData = (data: number): void => {
      sessionStorage.setItem(keyData, JSON.stringify(data));
    };

    Object.defineProperty(target, key, {
      get: getData,
      set: setData,
    });
  };
}

export { ReadOnly, LocalStorage, SessionStorage };
