export class Storage {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

    setData(data: {}): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  getData(): any[] | {} {
    return JSON.parse(localStorage.getItem(this.key) as any);
  }

  removeData(): void {
    localStorage.removeItem(this.key);
  }
}
