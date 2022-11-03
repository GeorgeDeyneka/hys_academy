export class Select {
  #divId;

  constructor(divId) {
    this.#divId = document.getElementById(divId);
    this.#divId.append(this.renderFunc());
  }

  renderFunc() {
    const selectElem = document.createElement("select");

    selectElem.classList.add("study__select");

    for (let i = 0; i < 3; i++) {
      const optionElem = document.createElement("option");

      optionElem.value = `${i + 1}`;
      optionElem.classList.add("study__option");
      optionElem.innerText = `Album ${i + 1}`;
      selectElem.append(optionElem);
    }

    return selectElem;
  }

  getSelect() {
    return document.querySelector(".study__select");
  }
}
