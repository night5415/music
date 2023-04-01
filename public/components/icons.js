import { IconTemplate, CameraTemplate } from "./templates.js";

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

class Camera extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(CameraTemplate.content.cloneNode(true));
  }
}

customElements.define("svg-play", PlayButton);
customElements.define("svg-camera", Camera)
