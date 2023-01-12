import { IconTemplate } from "./templates.js";

class PlayButton extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(IconTemplate.content.cloneNode(true));
  }
  
  stopMarquee() {
    this._playing = false;
    this.marquee.setAttribute("data-play", "false");
  }
}

customElements.define("svg-play", PlayButton);
