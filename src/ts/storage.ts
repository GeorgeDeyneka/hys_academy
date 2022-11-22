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

  public setData<T>(data: T): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  public getData<T>(): T {
    return JSON.parse(localStorage.getItem(this.key));
  }

  public removeData(): void {
    localStorage.removeItem(this.key);
  }
}

export class SlickStorage implements IStorage {
  @LocalStorage("slickData")
  private localData: any;

  public setData<T>(data: Array<T>): void {
    this.localData = data;
  }

  public getData<T>(): Array<T> {
    return this.localData;
  }
}
