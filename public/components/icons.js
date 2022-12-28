const template = document.createElement("template");
template.innerHTML = `
<style>
  div {
    background-color: transparent;
    height: 100px;
    width: 100px;
    border: none;
    pointer-events: none;
  }
</style>
<div>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
    <g id="Layer_2" data-name="Layer 2">
      <g id="layer_1-2" data-name="layer 1">
        <path fill="#fff" d="M24,48A24,24,0,1,1,48,24,24,24,0,0,1,24,48ZM24,2A22,22,0,1,0,46,24,22,22,0,0,0,24,2Z" />
        <path fill="#fff" d="M18,37a1,1,0,0,1-.46-.11A1,1,0,0,1,17,36V12a1,1,0,0,1,.54-.89,1,1,0,0,1,1,.07l17,12a1,1,0,0,1,0,1.64l-17,12A1,1,0,0,1,18,37Zm1-23.07V34.07L33.27,24Z" />
      </g>
    </g>
  </svg>
</div>
`;

class PlayButton extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return [""];
  }
}

customElements.define("svg-play", PlayButton);
