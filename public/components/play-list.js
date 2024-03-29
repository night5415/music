import { ListTemplate } from "./templates.js";

class List extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(ListTemplate.content.cloneNode(true));
  }

  get #container() {
    return this._shadowRoot.querySelector(`div`);
  }

  get #links() {
    return Array.from(this._shadowRoot.querySelectorAll("video-card"));
  }

  get #playing() {
    return this.#links.find((l) => l.playing);
  }

  addLink(el) {
    this.#container.appendChild(el);
  }

  getCardById(id) {
    return this.#links.find((x) => x.fileId === id);
  }

  playNext() {
    const playing = this.#playing,
      next = playing.nextSibling;
    
    next.click();
  }
}
export { List as default };
