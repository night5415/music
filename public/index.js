import getVideoList from "./service.js";

let flip = true;

const getElement = (query) => document.querySelector(query),
  createElement = (el) => document.createElement(el),
  video = getElement("video"),
  canvases = document.getElementsByTagName("canvas"),
  list = getElement("#list"),
  sorter = ({ path: a }, { path: b }) => (a > b ? 1 : -1),
  playButton = getElement("svg-play"),
  videoPath = (root, path, ext) => `./Saves/${root}/${path}.${ext}`;

async function init() {
  const files = await getVideoList();
  
  files.sort(sorter).forEach((file) => {
    const btn = createVideoLink(file);

    list.appendChild(btn);
  });
}

function createVideoLink({ root, path, ext }) {
  const btn = createElement("video-card");
  btn.src = videoPath(root, path, ext);
  btn.backgroundImage = `url('/thumbnail/${path}.jpg')`;
  btn.path = path;
  btn.addEventListener("onVideoClick", ({ detail }) => {
    video.src = detail;
    setTimeout(setBackgroundImage, 3000);
  });

  btn.addEventListener("mouseenter", ({ target }) => {
    target.appendChild(playButton);
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
