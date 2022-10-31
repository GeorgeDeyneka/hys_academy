export class Storage {
  #key;
  constructor(key) {
    this.#key = key;
  }
  setData(data) {
      localStorage.setItem(this.#key, JSON.stringify(data));
  }
  getData() {
      return JSON.parse(localStorage.getItem(this.#key));
  }
  removeData() {
    localStorage.removeItem(this.#key)
  }
}
