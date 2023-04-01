import getVideoList, { updateBoxArt } from "../modules/service.js";
import { createCard } from "../components/video-card.js";
import { registerServiceWorker } from "../modules/serviceWorkerUtil.js";
import { ComponentFactory } from "../modules/webComponentUtil.js";

const componentList = [
  { name: "play-list" },
  { name: "video-modal" },
  { name: "video-card" }
];

const getElement = (query) => document.querySelector(query),
  sorter = ({ path: a }, { path: b }) => (a > b ? 1 : -1),
  video = getElement("video-modal"),
  list = getElement("play-list"),
  playButton = getElement("svg-play");

async function init() {
  //registerServiceWorker();

  const count = await ComponentFactory
    .init(componentList)
    .register()
    .isMounted();
  
  console.log(`registered ${count} Web Components`);

  const files = await getVideoList();

  files.sort(sorter).forEach((file) => {
    const card = createCard(file);
    list.addLink(card);
  });

  list.addEventListener("onVideoClick", ({ detail }) =>
    video.setSource(detail)
  );

  list.addEventListener("onCardHover", ({ detail }) =>
    detail.appendChild(playButton)
  );

  video.addEventListener("onVideoEnded", () => list.playNext());

  video.addEventListener("onSnapShot", async ({ detail }) => {
    const { id, file } = detail,
      card = list.getCardById(id),
      newImage = await updateBoxArt(id, file);

    console.dir({ newImage, card });
  });
}

init();
