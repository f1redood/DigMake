import ModelPool from "https://f1redood.github.io/DigMake/ModelPool.js";

export default class GameRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = canvas.getContext("webgl2");
  }
  
  render(pool) {
    gl.clearColor(0.1, 0.1, 0.1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    var vao = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vao);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pool.verts), gl.STATIC_DRAW);
    
    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(pool.inds), gl.STATIC_DRAW);
    
    var vert = `#version 300 es
    precision mediump float;
    
    layout(location = 0) in vec2 aPos;
    layout(location = 1) in vec2 aCoords;
    
    out vec2 uv;
    
    void main() {
      uv = aCoords;
      gl_Position = vec4(aPos, 0, 1);
    }`;
    
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vert);
    gl.compileShader(vertShader);
    
    var frag = `#version 300 es
    precision mediump float;
    
    out vec4 fragColor;
    in vec2 uv;
    uniform sampler2D tex;
    
    void main() {
      fragColor = texture(tex, uv);
    }`;
    
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, frag);
    gl.compileShader(fragShader);
    
    var shader = gl.createProgram();
    gl.attachShader(shader, vertShader);
    gl.attachShader(shader, fragShader);
    gl.linkProgram(shader);
    
    // Output merger
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Rasterizer
    gl.viewport(0, 0, canvas.width, canvas.height);
    
    // Set GPU program
    gl.useProgram(shader);
    
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(
      0, // Index
      2, // Size
      gl.FLOAT, // Type
      false, // Normalized
      16, // Stride
      0 // Offset
    );
    
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(
      1,
      2,
      gl.FLOAT,   
      false,      
      16,
      8
    );
    
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSskDxJt4QJCvLLZXBra36gheJ85AyalYK0iw&s";
    img.onload = () => {
      // Setup texture
      var tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  
      // Draw call
      //gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.drawElements(gl.TRIANGLES, inds.length, gl.UNSIGNED_SHORT, 0);
    };
  }
}
