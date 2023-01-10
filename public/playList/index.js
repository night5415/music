import getVideoList from "./service.js";

let flip = true;

const getElement = (query) => document.querySelector(query),
  createElement = (el) => document.createElement(el),
  video = getElement("video"),
  canvases = document.getElementsByTagName("canvas"),
  list = getElement("play-list"),
  sorter = ({ path: a }, { path: b }) => (a > b ? 1 : -1),
  playButton = getElement("svg-play"),
  videoPath = (root, path, ext) => `../../Saves/${root}/${path}.${ext}`;

async function init() {
  const files = await getVideoList();

  files.sort(sorter).forEach((file) => {
    const btn = createVideoLink(file);

    list.addLink(btn);
  });
}

function createVideoLink({ root, path, ext ,boxArt}) {
  const card = createElement("video-card");
 
  if (boxArt)
    card.backgroundImage = `url("${boxArt}")`;
  
  card.src = videoPath(root, path, ext);
  card.path = path;

  card.addEventListener("onVideoClick", ({ detail }) => {
    video.src = detail;
    setTimeout(setBackgroundImage, 3000);
  });

  card.addEventListener("mouseenter", ({ target }) =>
    target.appendChild(playButton)
  );

  return card;
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
video.addEventListener("ended", () => setTimeout(() => list.playNext(), 2000));

init();
setInterval(setBackgroundImage, 15000);
