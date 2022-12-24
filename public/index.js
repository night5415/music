import Files from "./data.js";

let flip = true;

const { style: variables } = document.querySelector(":root"),
  video = document.querySelector("video"),
  canvases = document.getElementsByTagName("canvas"),
  list = document.getElementById("list"),
  createElement = (el) => document.createElement(el);

function setColors({
  primary = "black",
  secondary = "gray",
  tertiary = "blue",
  highlight = "gray",
} = {}) {
  variables.setProperty("--primary", primary);
  variables.setProperty("--secondary", secondary);
  variables.setProperty("--tertiary", tertiary);
  variables.setProperty("highlight", highlight);
}
function sorter({ path: a }, { path: b }) {
  return a > b ? 1 : -1;
}

function createVideoLink({ root, path, ext, colors }) {
  const btn = createElement("button"),
    wrapper = createElement("span"),
    marquee = createElement("div");

  btn.type = "button";
  marquee.innerHTML = path;

  wrapper.classList.add("wrapper");

  wrapper.appendChild(marquee);
  btn.appendChild(wrapper);

  btn.addEventListener("click", ({ target }) => {
    const nowPlaying = document.querySelectorAll(".marquee"),
      firstChild = target.querySelector("div");
    video.src = `./Saves/${root}/${path}.${ext}`;
    nowPlaying.forEach((f) => f.classList.remove("marquee"));
    firstChild.classList.add("marquee");
    setColors(colors);
    setTimeout(setBackgroundImage, 3000);
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
  setTimeout(() => {
    nextToPlay?.click();
  }, 2000);
});

Files.sort(sorter).forEach((file) => {
  const btn = createVideoLink(file);
  list.appendChild(btn);
});

setInterval(setBackgroundImage, 15000);