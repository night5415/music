import { ModalTemplate } from "./templates.js";

class Modal extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(ModalTemplate.content.cloneNode(true));
  }

  get #modal() {
    return this._shadowRoot.querySelector(`dialog`);
  }

  get #video() {
    return this._shadowRoot.querySelector(`video`);
  }

  show() {
    this.#modal.showModal();
  }

  hide() {
    this.#modal.close();
  }

  setSource(src) {
    this.#video.src = src;
  }

  play() {
    this.#video.play();
  }

  #ended() {
    this.dispatchEvent(
      new CustomEvent("onVideoEnded", {
        bubbles: true,
        cancelable: false,
        composed: true,
      })
    );
  }

  connectedCallback() {
    this.#video.addEventListener("loadeddata", () => {
      this.#video.play();
      this.show();
    });

    this.#video.addEventListener("leavepictureinpicture", () => this.show());
    this.#video.addEventListener("enterpictureinpicture", () => this.hide());
    this.#video.addEventListener("ended", this.#ended);
  }
}

customElements.define("video-modal", Modal);
