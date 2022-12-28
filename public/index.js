import Files from "./data.js";

let flip = true;

const getElement = (query) => document.querySelector(query),
  createElement = (el) => document.createElement(el),
  video = getElement("video"),
  canvases = document.getElementsByTagName("canvas"),
  list = getElement("#list"),
  sorter = ({ path: a }, { path: b }) => (a > b ? 1 : -1),
  playButton = getElement("svg-play"),
  videoPath = (root, path, ext) => `./Saves/${root}/${path}.${ext}`;

function init() {
  Files.sort(sorter).forEach((file) => {
    const btn = createVideoLink(file);

    list.appendChild(btn);
  });
}

function createVideoLink({ root, path, ext }) {
  const btn = createElement("button"),
    wrapper = createElement("span"),
    marquee = createElement("div");

  btn.style.backgroundImage = `url('/thumbnail/${path}.jpg')`;

  btn.type = "button";
  marquee.innerHTML = path?.replaceAll("-", " ");

  wrapper.classList.add("wrapper");

  wrapper.appendChild(marquee);
  btn.appendChild(wrapper);

  btn.addEventListener("click", () => {
    const nowPlaying = document.querySelectorAll(".marquee"),
      firstChild = btn.querySelector("div");

    video.src = videoPath(root, path, ext);
    nowPlaying.forEach((f) => f.classList.remove("marquee"));
    firstChild.classList.add("marquee");
    setTimeout(setBackgroundImage, 3000);
  });

  btn.addEventListener("mouseenter", ({target}) => {
    target.appendChild(playButton)
  });
  
  return btn;
}

function setBackgroundImage() {
  const arr = Array.from(canvases),
    [first, second] = flip ? arr : arr.reverse(),
    ctx = first.getContext("2d");

  ctx.drawImage(video, 0, 0, first.width, first.height);
  first.style.opacity = 1;
  second.style.opacity = 0;

  flip = !flip;
}

video.addEventListener("loadeddata", async (e) => {
  video.play();
  try {
    await video.requestPictureInPicture();
  } catch (error) {
    console.error(error);
  }
});

video.addEventListener("leavepictureinpicture", () => {
  const nowPlaying = document.querySelectorAll(".marquee");
  nowPlaying.forEach((f) => f.classList.remove("marquee"));
});

//autoplay
video.addEventListener("ended", () => {
  const nowPlaying = document.querySelector(".marquee"),
    nextToPlay = nowPlaying.closest("button");

  setTimeout(() => nextToPlay?.click(), 2000);
});

init();
setInterval(setBackgroundImage, 15000);
