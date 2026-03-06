import Model from "https://f1redood.github.io/DigMake/Render/Model/Model.js";

export default class ModelPool {
  verts = [];
  inds = [];
  
  /**
   * Adds a model to the ModelPool
   *
   * @param {Model|ModelPool} The model to add to the ModelPool
   */
  add(model) {
    this.verts.push(...model.verts);
    this.inds.push(...model.inds);
  }
}
