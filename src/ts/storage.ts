import { FormDataType, SlickDataType } from "./models/interfaces.model";

interface IStorage {
  setData<T>(data: Array<T> | T): void;
  getData<T>(): Array<T> | T;
  removeData(): void;
}

export class Storage implements IStorage {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  setData<T>(data: Array<T> | T): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  getData<T>(): Array<T> | T {
    return JSON.parse(localStorage.getItem(this.key));
  }

  removeData(): void {
    localStorage.removeItem(this.key);
  }
}
