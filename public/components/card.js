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

  get event() {
    return new CustomEvent("onVideoClick", {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: this.src,
    });
  }

  stopMarquee() {
    this._playing = false;
    this.marquee.setAttribute("data-play", "false");
  }

  connectedCallback() {
    const { path, backgroundImage, button } = this;
    button.style.backgroundImage = backgroundImage;
    this.marquee.innerHTML = path?.replaceAll("-", " ");

    button.addEventListener("click", () => {
      const nowPlaying = Array.from(this.parentElement.children).find(c => c.playing);
      this.dispatchEvent(this.event);
      this._playing = true;
      this.marquee.setAttribute("data-play", "true");
      nowPlaying?.stopMarquee();
    });
  }
}

customElements.define("video-card", VideoCard);
