import { AlbumEnum } from "./models/enums.model";

interface ISelect {
  renderFunc(): HTMLSelectElement;
  getSelect(): HTMLSelectElement;
}

export class Select implements ISelect {
  private readonly divId: HTMLElement;

  constructor(divId: string) {
    this.divId = document.getElementById(divId) as HTMLElement;
    this.divId.append(this.renderFunc());
  }

  renderFunc(): HTMLSelectElement {
    const selectElem: HTMLSelectElement = document.createElement("select");

    selectElem.classList.add("study__select");

    for (let i = 0; i < Object.entries(AlbumEnum).length; i++) {
      const optionElem: HTMLOptionElement = document.createElement("option");

      optionElem.value = Object.values(AlbumEnum)[i];
      optionElem.classList.add("study__option");
      optionElem.innerText = Object.keys(AlbumEnum)[i];
      selectElem.append(optionElem);
    }

    return selectElem;
  }

  getSelect(): HTMLSelectElement {
    return this.divId as HTMLSelectElement;
  }
}