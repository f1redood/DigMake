/**
 * Create the world mesh
 *
 * @param {object} The Dictionary the world data is stored in
 */
export default function createMesh(dict) {
  var verts = [];
  var inds = [];
  var uvs = [];

  var idx = 0;
  
  for (var pos of dict) {
    // Left face
    if (!pos.sub(1, 0, 0) in dict) {
      verts.push(...[
        pos.x - 0.5, pos.y + 0.5, pos.z + 0.5,
        pos.x - 0.5, pos.y + 0.5, pos.z - 0.5,
        pos.x - 0.5, pos.y - 0.5, pos.z - 0.5,
        pos.x - 0.5, pos.y - 0.5, pos.z + 0.5
      ]);
      inds.push(...[
        idx, idx+1, idx+2,
        idx+2, idx+3, idx
      ]);
      uvs.push(...[
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
      ]);

      idx += 4;
    }
    // Right face
    if (!pos.sub(1, 0, 0) in dict) {
      verts.push(...[
        pos.x + 0.5, pos.y + 0.5, pos.z - 0.5,
        pos.x + 0.5, pos.y + 0.5, pos.z + 0.5,
        pos.x + 0.5, pos.y - 0.5, pos.z + 0.5,
        pos.x + 0.5, pos.y - 0.5, pos.z - 0.5
      ]);
      inds.push(...[
        idx, idx+1, idx+2,
        idx+2, idx+3, idx
      ]);
      uvs.push(...[
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
      ]);

      idx += 4;
    }
  }
}
