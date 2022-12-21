import Files from "./data.js";

const video = document.querySelector("video"),
  list = document.getElementById("list"),
  volumeControl = document.querySelector("input[type=range]"),
  createElement = (el) => document.createElement(el);

function createVideoLink({ root, path, ext }) {
  const btn = createElement("button"),
    wrapper = createElement("span"),
    marquee = createElement("div");

  btn.type = "button";
  marquee.innerHTML = path;

  wrapper.classList.add("wrapper");

  wrapper.appendChild(marquee);
  btn.appendChild(wrapper);

  btn.addEventListener("click", ({ target }) => {
    video.src = `./Saves/${root}/${path}.${ext}`;
    const now = document.querySelectorAll(".marquee");
    now.forEach((f) => f.classList.remove("marquee"));
    let div = target.firstChild;
    div.classList.add("marquee");
  });

  return btn;
}

video.addEventListener("loadeddata", async (e) => {
  video.play();
  try {
    const request = await video.requestPictureInPicture();
  } catch (error) {
    console.error(error);
  }
});

video.addEventListener("enterpictureinpicture", (e) => console.log("enter"));
video.addEventListener("leavepictureinpicture", (e) => console.log("leave"));
volumeControl.addEventListener("change", ({ target }) =>
  changeVolume(target.value)
);

Files.forEach((file) => {
  const btn = createVideoLink(file);
  list.appendChild(btn);
});
/**
 * Number can be positive/negative
 * @param {number} value
 */
function setPlaySpeed(value) {
  video.playbackRate = value ?? 1;
}

function pauseToggle() {
  const { playbackRate } = video,
    paused = playbackRate === 0;

  video.playbackRate = paused ? 1 : 0;
}

function changeVolume(newValue) {
  video.volume = newValue / 100;
}
