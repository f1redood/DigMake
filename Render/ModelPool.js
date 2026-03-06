export default class ModelPool {
  verts = [];
  inds = [];
  /**
   * Adds a Model object to the ModelPool
   *
   * @param {Model} The model to add to the ModelPool
   */
  add(model) {
    this.verts.push(...model.verts);
    this.inds.push(...model.inds);
  }
}
