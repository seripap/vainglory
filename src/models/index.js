
export default class BaseModel {
  constructor(data, included = false) {
    // Data can be set arbitrarily or from an HTTP response 
    if ('data' in data) {
      this._data = data.data;
    } else {
      this._data = data;
    }

    if ('included' in data) {
      this._included = data.included;
    } else if (included) {
      this._included = included;
    }
  }

  get type() {
    return this._data.type;
  }

  get id() {
    return this._data.id;
  }

  get raw() {
    return this._data;
  }

  filterIncluded(type) {
    return this._included.length > 0 ? this._included.filter((item) => item.type === type) : false;
  }

}

function addIncluded(included) {

}
