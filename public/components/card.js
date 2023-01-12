import { CardTemplate } from "./templates.js";

class VideoCard extends HTMLElement {
  constructor() {
    super();
    this._playing = false;
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(CardTemplate.content.cloneNode(true));
  }

  get button() {
    return this._shadowRoot.querySelector(`button`);
  }

  get playing() {
    return this._playing;
  }

  get marquee() {
    return this._shadowRoot.querySelector("div");
  }

  stopMarquee() {
    this._playing = false;
    this.marquee.setAttribute("data-play", "false");
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
        detail: this.src,
      })
    );

    this._playing = true;
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
}

customElements.define("video-card", VideoCard);

const createCard = ({ root, path, ext, boxArt }) => {
  const card = document.createElement("video-card");

  if (boxArt) {
    card.backgroundImage = `url("${boxArt}")`;
  }

  card.src = `../../Saves/${root}/${path}.${ext}`;
  card.path = path;

  return card;
};

export { createCard as default };
