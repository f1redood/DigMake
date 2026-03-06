export default class Model {
  verts = [];
  inds = [];
  
  constructor(verts, inds, uvs) {
    for (var i = 0; i < verts.length; i++) {
      this.verts.push(verts[i*3]);
      this.verts.push(verts[i*3 + 1]);
      this.verts.push(verts[i*3 + 2]);

      this.verts.push(uvs[i*2]);
      this.verts.push(uvs[i*2 + 1]);
    }
    this.inds = inds;
  }
}
