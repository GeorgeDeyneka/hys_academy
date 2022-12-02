import {
  LocalStorageDec,
  SessionStorageDec,
} from "./models/decorators.decorator";

interface IStorage {
  setData<T>(data: Array<T> | T | number): void;
  getData<T>(): Array<T> | T | Object | number;
  removeData?(): void;
}

class StorageClass implements IStorage {
  private readonly key: string;
  arrMethods;

  constructor(key: string) {
    this.key = key;
  }

  @LocalStorageDec
  @SessionStorageDec
  private localData: any;

  public setData<T>(data: Array<T> | T | number): void {
    this.localData = data;
  }

  public getData<T>(): Array<T> | T | number {
    return this.localData;
  }

  public removeData(): void {
    localStorage.removeItem(this.key);
    sessionStorage.removeItem(this.key);
  }
}

export { StorageClass };
