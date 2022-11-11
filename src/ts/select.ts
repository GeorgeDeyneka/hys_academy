import { AlbumEnum } from './models/enums';

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

      optionElem.value = Object.values(AlbumEnum)[i];
      optionElem.classList.add("study__option");
      optionElem.innerText = Object.keys(AlbumEnum)[i];
      selectElem.append(optionElem);
    }

    return selectElem;
  }

  getSelect(): HTMLSelectElement {
    return document.querySelector(".study__select") as HTMLSelectElement;
  }
}