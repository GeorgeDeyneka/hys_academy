import { LocalStorage, SessionStorage } from "./models/decorators.decorator";

interface IStorage {
  setData<T>(data: Array<T> | T | number): void;
  getData<T>(): Array<T> | T | Object | number;
  removeData?(): void;
}

class LocStorage implements IStorage {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  @LocalStorage
  private localData: any;

  public setData<T>(data: Array<T> | T): void {
    this.localData = data;
  }

  public getData<T>(): Array<T> | T {
    return this.localData;
  }

  public removeData(): void {
    localStorage.removeItem(this.key);
  }
}

class SessStorage implements IStorage {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }
  
  @SessionStorage
  private localData: any;

  public setData(data: number): void {
    this.localData = data;
  }

  public getData(): number {
    return this.localData;
  }
}

export { LocStorage, SessStorage }