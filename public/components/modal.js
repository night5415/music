import { ModalTemplate } from "./templates.js";

const opacity = "--opacity",
  width = "--width",
  left = "--left",
  top = "--top",
  maxHeight = "--maxHeight";

class Modal extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(ModalTemplate.content.cloneNode(true));
    this.offsetX = 0;
    this.offsetY = 0;
  }

  get #modal() {
    return this.#getShadowElement(`dialog`);
  }

  get #video() {
    return this.#getShadowElement(`video`);
  }

  get #close() {
    return this.#getShadowElement(`close`);
  }

  get #next() {
    return this.#getShadowElement(`next`);
  }

  get #rewind() {
    return this.#getShadowElement(`rewind`);
  }

  get #pip() {
    return this.#getShadowElement(`pip`);
  }

  get #volume() {
    return this.#getShadowElement("volume");
  }

  show() {
    if (this.#modal.checkVisibility()) {
      return;
    }

    this.#modal.show();
    this.#setModalProperty(opacity, 1);
  }

  hide() {
    this.#setModalProperty(opacity, 0);
    setTimeout(() => this.#modal.close(), 1000);
  }

  setSource(src) {
    this.#video.src = src;
  }

  play() {
    this.#video.play();
  }

  #setModalProperty(name, value) {
    this.#modal.style.setProperty(name, value);
  }

  #onDataLoad() {
    const { videoHeight, videoWidth } = this.#video;
    this.#video.play();
    this.show();
    this.#setModalProperty(maxHeight, `${videoHeight}px`);
    this.#setModalProperty(width, `${videoWidth}px`);
  }

  #getShadowElement(id) {
    return this._shadowRoot.getElementById(id);
  }

  #onEnded() {
    this.dispatchEvent(
      new CustomEvent("onVideoEnded", {
        bubbles: true,
        cancelable: false,
        composed: true,
      })
    );
  }

  #onResize([{ contentRect }]) {
    if (!contentRect) {
      return;
    }

    const { height } = contentRect,
      { videoWidth, videoHeight } = this.#video,
      ratio = videoHeight / videoWidth;

    this.#setModalProperty(width, `${height / ratio}px`);
  }

  #onDrag(e) {
    e.preventDefault();
    const { clientX, clientY } = e,
      xPos = clientX - this.offsetX,
      yPos = clientY - this.offsetY;

    if (xPos > 0) {
      this.#setModalProperty(left, `${xPos}px`);
      this.#setModalProperty(top, `${yPos}px`);
    }
  }

  #onDragStart({ offsetX, offsetY, dataTransfer }) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    let emptyImage = document.createElement("img");
    emptyImage.src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
    dataTransfer.setDragImage(emptyImage, 0, 0);
  }

  #onClose() {
    this.hide();
    this.#video.pause();
  }

  #onPip() {
    this.#video.requestPictureInPicture();
  }

  #onVolumeChange(value = 0.5) {
    this.#video.volume = +value / 100;
  }

  #setRuntime(current) {
    this.#video.currentTime = current;
  }

  connectedCallback() {
    this.#video.addEventListener("loadeddata", () => this.#onDataLoad());
    this.#video.addEventListener("leavepictureinpicture", () => this.show());
    this.#video.addEventListener("enterpictureinpicture", () => this.hide());
    this.#video.addEventListener("ended", () => this.#onEnded());
    this.#modal.addEventListener("drag", (e) => this.#onDrag(e));
    this.#modal.addEventListener("dragstart", (e) => this.#onDragStart(e));
    this.#close.addEventListener("click", () => this.#onClose());
    this.#rewind.addEventListener("click", () => this.#setRuntime(0));
    this.#pip.addEventListener("click", () => this.#onPip());
    this.#next.addEventListener("click", () => this.#onEnded());
    this.#volume.addEventListener("change", ({ target }) =>
      this.#onVolumeChange(target?.value)
    );

    new ResizeObserver((e) => this.#onResize(e)).observe(this.#modal);
  }
}

customElements.define("video-modal", Modal);
