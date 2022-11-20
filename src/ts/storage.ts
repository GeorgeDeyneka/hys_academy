import { LocalStorage } from "./models/decorators.decorator";

interface IStorage {
  setData<T>(data: Array<T> | T): void;
  getData<T>(): Array<T> | T;
  removeData?(): void;
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

export class SlickStorage implements IStorage {
  @LocalStorage("slickData")
  localData: any;

  public setData<T>(data: Array<T> | T): void {
    this.localData = data;
  }

  public getData<T>(): Array<T> | T {
    return this.localData;
  }
}
