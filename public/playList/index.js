import getVideoList from "../modules/service.js";
import createCard from "../components/card.js";

const getElement = (query) => document.querySelector(query),
  sorter = ({ path: a }, { path: b }) => (a > b ? 1 : -1),
  video = getElement("video-modal"),
  list = getElement("play-list"),
  playButton = getElement("svg-play");

async function init() {
  const files = await getVideoList();

  files.sort(sorter).forEach((file) => {
    const card = createCard(file);
    list.addLink(card);
  });

  list.addEventListener("onVideoClick", ({ detail }) => {
    video.setSource(detail);
  });

  list.addEventListener("onCardHover", ({ detail }) => {
    detail.appendChild(playButton);
  });

  video.addEventListener("onVideoEnded", () => {
    list.playNext();
  });
}

init();
