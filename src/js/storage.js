export class Storage {
  #data;
  #dataName;
  constructor(data, dataName) {
    this.#data = data;
    this.#dataName = dataName;
    this.setData();
  }

  setData() {
    if (!localStorage.getItem(this.#dataName)) {
      localStorage.setItem(this.#dataName, JSON.stringify(this.#data));
    }
  }
  getData() {
    if (localStorage.getItem(this.#dataName)) {
      return JSON.parse(localStorage.getItem(this.#dataName));
    }
  }
}
