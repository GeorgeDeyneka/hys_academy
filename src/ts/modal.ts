enum ModalClasses {
  wrapper = "modal-wrapper",
  open = "opened-modal",
  close = "closed-modal",
  noScroll = "no-scroll",
}

export class ModalWindow {
  private body: HTMLBodyElement = document.querySelector("body");
  private modalWrapper: HTMLElement;
  private modalText: string;

  constructor(modalText: string) {
    this.modalText = modalText;
    this.onInit();
  }

  private onInit() {
    this.generateModal();
  }

  private addListeners() {
    document
      .querySelector("#modal-btn")
      .addEventListener("click", this.closeModal.bind(this));

    document
      .querySelector(".modal-overlay")
      .addEventListener("click", this.closeModal.bind(this));
  }

  private generateModal() {
    const template = `
          <div class="modal-window">
          <h2>${this.modalText}</h2>
          <button id="modal-btn" class="btn btn__green">Okay</button>
          </div>
          <div class="modal-overlay"></div>
        `;

    this.modalWrapper = document.createElement("div");
    this.modalWrapper.className = ModalClasses.wrapper;
    this.modalWrapper.innerHTML = template;
    document.body.appendChild(this.modalWrapper);

    this.addListeners();
  }

  private disableScroll = () => this.body.classList.add(ModalClasses.noScroll);

  private enableScroll = () =>
    this.body.classList.remove(ModalClasses.noScroll);

  public openModal() {
    this.disableScroll();

    this.modalWrapper.classList.remove(ModalClasses.close);
    this.modalWrapper.classList.add(ModalClasses.open);
  }

  public closeModal() {
    this.enableScroll();

    this.modalWrapper.classList.remove(ModalClasses.open);
    this.modalWrapper.classList.add(ModalClasses.close);
  }
}

// Add icon into modal
// How do you init modal? Do you generate template or bind that on existing?