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

  get #pip() {
    return this.#getShadowElement(`pip`);
  }

  get #snap() {
    return this.#getShadowElement(`snap`);
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

  setSource({ id, src }) {
    this.fileId = id;
    this.#video.src = src;
  }

  play() {
    this.#video.play();
  }

  pause() {
    this.#video.pause();
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

    if (isNaN(ratio)) {
      return;
    }

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

  #snapShot() {
    const canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d");

    ctx.drawImage(this.#video, 0, 0, 300, 150);

    canvas.toBlob((blob) => {
      this.dispatchEvent(
        new CustomEvent("onSnapShot", {
          bubbles: true,
          cancelable: false,
          composed: true,
          detail: {id: this.fileId, blob},
        })
      );
    }, "image/jpg");
  }

  connectedCallback() {
    this.#video.addEventListener("loadeddata", () => this.#onDataLoad());
    this.#video.addEventListener("leavepictureinpicture", () => this.show());
    this.#video.addEventListener("enterpictureinpicture", () => this.hide());
    this.#video.addEventListener("ended", () => this.#onEnded());
    this.#modal.addEventListener("drag", (e) => this.#onDrag(e));
    this.#modal.addEventListener("dragstart", (e) => this.#onDragStart(e));
    this.#close.addEventListener("click", () => this.#onClose());
    this.#pip.addEventListener("click", () => this.#onPip());
    this.#snap.addEventListener("click", () => this.#snapShot());
    this.#volume.addEventListener("change", ({ target }) =>
      this.#onVolumeChange(target?.value)
    );

    new ResizeObserver((e) => this.#onResize(e)).observe(this.#modal);

    navigator.mediaSession.setActionHandler("play", () => this.play());
    navigator.mediaSession.setActionHandler("pause", () => this.pause());
    navigator.mediaSession.setActionHandler("nexttrack", () => this.#onEnded());
  }
}

customElements.define("video-modal", Modal);
