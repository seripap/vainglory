// readonly
export default class BaseModel {
  constructor(data) {
    this.data = data;
    this.relationships = null;
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
}
