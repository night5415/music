const template = "template";

const CardTemplate = document.createElement(template);
CardTemplate.innerHTML = /*inline-template*/ `
<style>
    button {
      display: flex;
      flex-grow: 1;
      flex-basis: 20%;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column-reverse;
      font-size: 1rem;
      cursor: pointer;
      overflow: hidden;
      border: none;
      margin: 8px 2px;
      padding: 1rem;
      border-radius: 6px;
      text-align: left;
      white-space: nowrap;
      height: 150px;
      border: 1px solid var(--primary);
      border-top: 1px solid rgb(25, 25, 112, 0.4);
      background-color: var(--primary);
      color: var(--white);
      background-size: cover;
    }

    button div {
      pointer-events: none;
    }

    button:hover {
      animation: expand 300ms;
      animation-fill-mode: forwards;
    }

    .wrapper {
      overflow: hidden;
    }

    div[data-play="true"] {
      animation: scroll 10s linear infinite;
      white-space: nowrap;
    }

    @keyframes scroll {
      0% {
        transform: translateX(110%);
      }
      100% {
        transform: translateX(-110%);
      }
    }

    @keyframes expand {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(1.04);
      }
    }
</style>
<button>
  <span class="wrapper">
    <div data-play="false"></div>
  </span>
  <slot></slot>
</button>
`;

const IconTemplate = document.createElement(template);
IconTemplate.innerHTML = /*inline-template*/ `
<style>
  div {
    background-color: transparent;
    height: 100px;
    width: 100px;
    border: none;
    opacity: 0;
    transition: opacity 500ms;
  }
  div:hover{
  opacity: .8;
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

const ListTemplate = document.createElement(template);
ListTemplate.innerHTML = /*inline-template*/ `
<style>
  #list{
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    width: 90vw;
    margin: 1rem auto;
  }
  video-card {
    display: flex;
    flex-grow: 1;
    flex-basis: 20%;
  }
</style>
<div id="list"></div>
`;

const ModalTemplate = document.createElement(template);
ModalTemplate.innerHTML = /*inline-template*/ `
<style>
  :picture-in-picture {
    box-shadow: 0 0 0 5px red;
  }
  dialog {
    --maxHeight: 50vw;
    --width: 50vw;
    --opacity: 0;
    --top: 10px;
    --left: 10px;
    position: fixed;
    top: var(--top);
    left: var(--left);
    width: var(--width);
    max-height: var(--maxHeight);
    max-width: 50vw;
    border: none;
    border-radius: 6px;
    resize: vertical;
    cursor: move;
    margin: 0;
    user-select: none;
    padding: 0;
    overflow: hidden;
    transition: opacity 500ms;
    opacity: var(--opacity);
    background-color: transparent;
  }
  video {
    position: relative;
    background-position: center center;
    background-size: cover;
    margin: -1px 0px 0px -1px;
    object-fit: cover;
    width: 101%;
    pointer-events: none;
    z-index: -1;
  }
  footer {
    position: absolute;
    bottom: 0;
   width: 100%;
  }
</style>
<dialog id="dialog" draggable="true">
<footer>
  <button id="close">Close</button>
  <button id="pip">PiP</button>
  <svg-camera></svg-camera>
  <button id="snap">Snap</button>
  <button id="previous">Previous</button>
  <input type="range" id="volume" min="0" max="100" step="1" value="75">
</footer>
   <video id="video" controls="false"></video>
</dialog>
`;

const CameraTemplate = document.createElement(template);
CameraTemplate.innerHTML = /*inline-template*/ `
<svg viewBox="0 0 122.88 90.78">
<path d="M46.86.05H90.48l10,17.7H120.9a2,2,0,0,1,2,2V88.8a2,2,0,0,1-2,2H2a2,2,0,0,1-2-2V19.73a2,2,0,0,1,2-2h9.21V11.4H22.56v6.35H34.92L42.63,2.53c1.56-3.1.71-2.48,4.23-2.48ZM66.64,31.7A19.55,19.55,0,0,1,80.47,65.08l-.23.21A19.55,19.55,0,1,1,66.64,31.7ZM75.4,42.49a12.38,12.38,0,1,0-.16,17.7L75.4,60a12.38,12.38,0,0,0,0-17.52Zm34.67-16a5.9,5.9,0,1,1-5.9,5.9,5.9,5.9,0,0,1,5.9-5.9ZM66.65,21.72A29.53,29.53,0,1,1,37.12,51.25,29.53,29.53,0,0,1,66.65,21.72Z"/>
</svg>
`;

export {
  CardTemplate,
  IconTemplate,
  ListTemplate,
  ModalTemplate,
  CameraTemplate,
};
