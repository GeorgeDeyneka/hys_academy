const form = document.querySelector("blog__form");
const formInputs = document.querySelectorAll("form__input");

class FormActive {
  #parentSelector;
  #formInputs;
  #obj;

  constructor(parentClassName, childClassName) {
    this.#parentSelector = document.querySelector(`.${parentClassName}`);
    this.#formInputs = document.querySelectorAll(`.${childClassName}`);
    this.#obj = {};
    this.setLocalStorage();
    this.setFormData();
    this.submitForm();
  }

  setLocalStorage() {
    const that = this;
    this.#parentSelector.addEventListener("keyup", (event) => {
      if (event.target.classList.contains(this.parentClassName)) {
        let localStorageObj = JSON.parse(localStorage.getItem("formData"));
        if (localStorageObj) {
          if (Object.keys(localStorageObj).length >= 1) {
            that.#obj = localStorageObj;
          }
        }
        that.#obj[event.target.getAttribute("name")] = event.target.value;
      }
      localStorage.setItem("formData", JSON.stringify(that.#obj));
    });
  }

  setFormData() {
    const data = JSON.parse(localStorage.getItem("formData"));
    if (data) {
      this.#formInputs.forEach((el) => {
        if (data[el.getAttribute("name")]) {
          el.value = data[el.getAttribute("name")];
        }
      });
    }
  }

  submitForm() {
    this.#parentSelector.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      let formObj = {};
      for (let [key, value] of formData.entries()) {
        formObj[key] = value;
      }
      localStorage.removeItem("formData");
      this.#formInputs.forEach((el) => (el.value = ""));
      this.#obj = {};
    });
  }
}

const myForm = new FormActive("blog__form", "form__input");
