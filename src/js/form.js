export class FormActive {
  #classNameChilds;
  #parentSelector;
  #formInputs;
  #obj;

  constructor(parentClassName, childClassName) {
    this.#classNameChilds = childClassName;
    this.#parentSelector = document.querySelector(`.${parentClassName}`);
    this.#formInputs = document.querySelectorAll(`.${childClassName}`);
    this.#obj = {};
    this.setLocalStorage();
    this.setFormData();
    this.submitForm();
    this.validateForm();
  }

  setLocalStorage() {
    this.#parentSelector.addEventListener("keyup", (event) => {
      if (event.target.classList.contains(this.#classNameChilds)) {
        const localStorageObj = JSON.parse(localStorage.getItem("formData"));
        if (localStorageObj && Object.keys(localStorageObj).length >= 1) {
          this.#obj = localStorageObj;
        }
        this.#obj[event.target.getAttribute("name")] = event.target.value;
        localStorage.setItem("formData", JSON.stringify(this.#obj));
      }
    });
  }

  setFormData() {
    const data = JSON.parse(localStorage.getItem("formData"));
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
      localStorage.removeItem("formData");
      this.#formInputs.forEach((el) => (el.value = ""));
      this.#obj = {};
    });
  }

  validateForm() {
    this.#parentSelector.addEventListener("input", (event) => {
      if (event.target.id === "form-email") {
        if (
          event.target.validity.typeMismatch ||
          event.target.validity.patternMismatch
        ) {
          event.target.setCustomValidity(
            "Expected an your e-mail address (For example: user@gmail.com)."
          );
        } else {
          event.target.setCustomValidity("");
        }
      }
      if (event.target.id === "form-phone") {
        if (
          event.target.validity.typeMismatch ||
          event.target.validity.patternMismatch
        ) {
          event.target.setCustomValidity(
            "Your number is too short or has letters. Please, correct this."
          );
        } else {
          event.target.setCustomValidity("");
        }
      }
      if (event.target.id === "form-name") {
        if (
          event.target.validity.typeMismatch ||
          event.target.validity.patternMismatch
        ) {
          event.target.setCustomValidity(
            "Your name is too short or has numbers or other symbols. Please, correct this."
          );
        } else {
          event.target.setCustomValidity("");
        }
      }
    });
  }
}
