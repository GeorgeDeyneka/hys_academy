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

function LocalStorage(keyData: string) {
  return function (target: Object, key: string) {

    const getData = () => {
      return JSON.parse(localStorage.getItem(keyData));
    };

    const setData = (data: SlickDataType[]) => {
      localStorage.setItem(keyData, JSON.stringify(data));
    };

    Object.defineProperty(target, key, {
      get: getData,
      set: setData,
    });
  };
}

export { ReadOnly, LocalStorage };