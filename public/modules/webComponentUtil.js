class ComponentFactory {
  #components = [];
  #promises = [];

  constructor(list) {
    this.#init(list);
  }

  #init(list) {
    list?.forEach((component) => {
      const { name } = component;
      this.#components.push(component);
      this.#promises.push(customElements.whenDefined(name));
    });
  }

  async #mount({ name }) {
    try {
      const { default: webComponent } = await import(`../components/${name}.js`);

      customElements.define(name, webComponent);
    } catch (error) {
      console.log(error);
    }
  }

  register() {
    this.#components.forEach(this.#mount);
    return this;
  }

  async isMounted() {
    const values = await Promise.all(this.#promises);
    return values.length;
  }

  static init(componentList) {
    return new ComponentFactory(componentList);
  }
}

export { ComponentFactory };
