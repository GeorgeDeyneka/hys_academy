import { Storage } from "./storage.js";

export class FormActive {
  #classNameChilds;
  #parentSelector;
  #formInputs;
  #obj = {};
  #newStorage = new Storage("formData");

  constructor(parentClassName, childClassName) {
    this.#classNameChilds = childClassName;
    this.#parentSelector = document.querySelector(`.${parentClassName}`);
    this.#formInputs = document.querySelectorAll(`.${childClassName}`);
    this.onFormChange();
    this.setFormData();
    this.submitForm();
  }

  onFormChange() {
    this.#parentSelector.addEventListener("change", (event) => {
      if (event.target.classList.contains(this.#classNameChilds)) {
        const localStorageObj = this.#newStorage.getData();
        if (localStorageObj && Object.keys(localStorageObj).length) {
          this.#obj = localStorageObj;
        }
        this.#obj[event.target.getAttribute("name")] = event.target.value;
        this.#newStorage.setData(this.#obj);
      }
    });
  }

  setFormData() {
    const data = this.#newStorage.getData();
    if (data) {
      this.#formInputs.forEach((el) => {
        const valueOfKey = data[el.getAttribute("name")];
        if (valueOfKey) {
          el.value = valueOfKey;
        }
      });
    }
  }

  submitForm() {
    this.#parentSelector.addEventListener("submit", (event) => {
      event.preventDefault();
      this.#newStorage.removeData();
      this.#formInputs.forEach((el) => (el.value = ""));
      this.#obj = {};
    });
  }
}
