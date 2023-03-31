class VideoSnapShot {
  #canvas;
  #context;
  #fileName;
  #source;

  constructor(imgSource, fileName) {
    this.#canvas = document.createElement("canvas");
    this.#context = this.#canvas.getContext("2d");
    this.#source = imgSource;
    this.#fileName = fileName;
  }

  drawImage() {
    this.#context.drawImage(this.#source, 0, 0, 300, 150);
    return this;
  }

  toImageFile(fileType = "jpg") {
    return new Promise((res, rej) => {
      this.#canvas.toBlob((blob) => {
        const file = new File([blob], `${this.#fileName}.${fileType}`, {
          type: `image/${fileType}`,
        });
        res(file);
      });
    });
  }
  static snapShot(imgSource, fileName) {
    return new VideoSnapShot(imgSource, fileName);
  }
}

class Signal {
  #eventName;
  #el;
  #details;
  constructor(eventName) {
    this.#eventName = eventName;
  }

  setDispatcher(dispatcher) {
    this.#el = dispatcher;
    return this;
  }

  setDetails(details) {
    this.#details = details;
    return this;
  }

  dispatchEvent() {
    if (!this.#el) {
      return false;
    }

    this.#el.dispatchEvent(
      new CustomEvent(this.#eventName, {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: this.#details,
      })
    );
    return true;
  }

  static generate(eventName) {
    return new Signal(eventName);
  }
}

export { Signal, VideoSnapShot };
