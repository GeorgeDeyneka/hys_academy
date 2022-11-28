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

function StorageDecorator(target: Object, key: string): void {
  Object.defineProperty(target, key, {
    get: function (): number | SlickDataType[] | FormDataType {
      const dataType: Storage =
        this.typeOfData === "local" ? localStorage : sessionStorage;
      if (dataType.getItem(this.key) != null) {
        return JSON.parse(dataType.getItem(this.key));
      }
      return dataType === localStorage ? [] : 0
    },

    set: function (data: number | SlickDataType[] | FormDataType): void {
      const dataType: Storage =
        this.typeOfData === "local" ? localStorage : sessionStorage;
      dataType.setItem(this.key, JSON.stringify(data));
    },
  });
}

export { ReadOnly, StorageDecorator };
