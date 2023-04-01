import { CardTemplate } from "./templates.js";

class VideoCard extends HTMLElement {
  #src;
  #fileId;
  #path;
  #playing;
  #shadowRoot;

  set src(src) {
    this.#src = src;
  }

  set fileId(id) {
    this.#fileId = id;
  }

  set path(path) {
    this.#path = path;
  }

  get src() {
    return this.#src;
  }

  get fileId() {
    return this.#fileId;
  }

  get path() {
    return this.#path;
  }

  constructor() {
    super();
    this.#playing = false;
    this.#shadowRoot = this.attachShadow({ mode: "open" });
    this.#shadowRoot.appendChild(CardTemplate.content.cloneNode(true));
  }

  get button() {
    return this.#shadowRoot.querySelector(`button`);
  }

  get playing() {
    return this.#playing;
  }

  get marquee() {
    return this.#shadowRoot.querySelector("div");
  }

  #onClick() {
    const nowPlaying = Array.from(this.parentElement.children).find(
      (c) => c.playing
    );

    this.dispatchEvent(
      new CustomEvent("onVideoClick", {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: { src: this.src, id: this.fileId },
      })
    );

    this.#playing = true;
    this.marquee.setAttribute("data-play", "true");
    nowPlaying?.stopMarquee();
  }

  #onHover() {
    this.dispatchEvent(
      new CustomEvent("onCardHover", {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: this.button,
      })
    );
  }

  connectedCallback() {
    const { path, backgroundImage, button } = this;
    button.style.backgroundImage = backgroundImage;
    this.marquee.innerHTML = path?.replaceAll("-", " ");
    this.addEventListener("mouseover", this.#onHover);
    this.addEventListener("click", this.#onClick);
  }

  stopMarquee() {
    this.#playing = false;
    this.marquee.setAttribute("data-play", "false");
  }
}

const createCard = ({ id, root, path, ext, boxArt }) => {
  const card = document.createElement("video-card");

  if (boxArt) {
    card.backgroundImage = `url("${boxArt}")`;
  }

  card.src = `../../Saves/${root}/${path}.${ext}`;
  card.path = path;
  card.fileId = id;

  return card;
};

export { VideoCard as default, createCard };
