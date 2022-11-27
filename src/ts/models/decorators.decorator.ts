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
      return JSON.parse(localStorage.getItem(keyData));
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

export { ReadOnly, LocalStorage };
