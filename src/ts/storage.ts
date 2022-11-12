import { formDataType, slickDataType } from "./models/interfaces.model";

interface IStorage<Generic> {
  setData(data: Array<Generic> | formDataType): void;
  getData(): Array<Generic> | formDataType;
  removeData(): void;
}

export class Storage implements IStorage<slickDataType> {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  setData(data: Array<slickDataType> | formDataType): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  getData(): Array<slickDataType> | formDataType {
    return JSON.parse(localStorage.getItem(this.key));
  }

  removeData(): void {
    localStorage.removeItem(this.key);
  }
}
