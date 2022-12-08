import {
  LocalStorageDec,
  SessionStorageDec,
} from "./models/decorators.decorator";

interface IStorage {
  setData<T>(data: | T): void;
  getData<T>(): | T;
  removeData?(): void;
}

class StorageClass implements IStorage {
  private readonly key: string;
  private arrMethods = Array<Function>;

  constructor(key: string) {
    this.key = key;
  }

  @LocalStorageDec
  @SessionStorageDec
  private localData: any;

  public setData<T>(data: T): void {
    this.localData = data;
  }

  public getData<T>(): T {
    return this.localData;
  }

  public removeData(): void {
    localStorage.removeItem(this.key);
    sessionStorage.removeItem(this.key);
  }
}

export { StorageClass };
