// readonly
export default class BaseModel {
  constructor(data) {
    this.data = data;
    this.relationships = null;
  }

  set id(id) {
    this.data.id = id;
    return this;
  }

  get type() {
    return this.data.type;
  }

  get id() {
    return this.data.id;
  }

  get raw() {
    return this.data;
  }

  extend(key, properties) {
    this[key] = properties;
    return this;
  }
}
