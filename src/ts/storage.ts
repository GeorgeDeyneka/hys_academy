import { LocalStorage, SessionStorage } from "./models/decorators.decorator";

interface IStorage {
  setData<T>(data: Array<T> | T | number): void;
  getData<T>(): Array<T> | T | Object | number;
  removeData?(): void;
}

class Storage implements IStorage {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  public setData<T>(data: T): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
  
  public getData<T>(): T | Object {
    if (localStorage.getItem(this.key) != null) {
      return JSON.parse(localStorage.getItem(this.key));
    }
    return {}
  }

  public removeData(): void {
    localStorage.removeItem(this.key);
  }
}

class SlickStorage implements IStorage {
  @LocalStorage("slickData")
  private localData: any;

  public setData<T>(data: Array<T>): void {
    this.localData = data;
  }

  public getData<T>(): Array<T> {
    return this.localData;
  }
}

class NativeStorage implements IStorage {
  @SessionStorage("sliderPosition")
  private localData: any;

  public setData(data: number): void {
    this.localData = data;
  }

  public getData(): number {
    return this.localData;
  }
}

export { Storage, SlickStorage, NativeStorage }