export class Select {
  divId: HTMLElement;

  constructor(divId: string) {
    this.divId = document.getElementById(divId) as HTMLElement;
    this.divId.append(this.renderFunc());
  }

  renderFunc(): HTMLSelectElement {
    const selectElem: HTMLSelectElement = document.createElement("select");

    selectElem.classList.add("study__select");

    for (let i = 0; i < 3; i++) {
      const optionElem: HTMLOptionElement = document.createElement("option");

      optionElem.value = `${i + 1}`;
      optionElem.classList.add("study__option");
      optionElem.innerText = `Album ${i + 1}`;
      selectElem.append(optionElem);
    }

    return selectElem;
  }

  getSelect(): HTMLSelectElement {
    return document.querySelector(".study__select") as HTMLSelectElement;
  }
}

