import ModelPool from "https://f1redood.github.io/DigMake/ModelPool.js";

export default class GameRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = canvas.getContext("webgl2");
  }
  
  render(pool) {
    this.gl.clearColor(0.1, 0.1, 0.1, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    
    var vao = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vao);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(pool.verts), this.gl.STATIC_DRAW);
    
    var ebo = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, ebo);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(pool.inds), this.gl.STATIC_DRAW);
    
    var vert = `#version 300 es
    precision mediump float;
    
    layout(location = 0) in vec3 aPos;
    layout(location = 1) in vec2 aCoords;
    
    out vec2 uv;
    
    void main() {
      uv = aCoords;
      gl_Position = vec4(aPos, aPos.z);
    }`;
    
    var vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(vertShader, vert);
    this.gl.compileShader(vertShader);
    
    var frag = `#version 300 es
    precision mediump float;
    
    out vec4 fragColor;
    in vec2 uv;
    uniform sampler2D tex;
    
    void main() {
      fragColor = texture(tex, uv);
    }`;
    
    var fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(fragShader, frag);
    this.gl.compileShader(fragShader);
    
    var shader = this.gl.createProgram();
    this.gl.attachShader(shader, vertShader);
    this.gl.attachShader(shader, fragShader);
    this.gl.linkProgram(shader);
    
    // Output merger
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Rasterizer
    this.gl.viewport(0, 0, canvas.width, canvas.height);
    
    // Set GPU program
    this.gl.useProgram(shader);
    
    this.gl.enableVertexAttribArray(0);
    this.gl.vertexAttribPointer(
      0, // Index
      3, // Size
      this.gl.FLOAT, // Type
      false, // Normalized
      16, // Stride
      0 // Offset
    );
    
    this.gl.enableVertexAttribArray(1);
    this.gl.vertexAttribPointer(
      1,
      2,
      this.gl.FLOAT,   
      false,      
      16,
      8
    );
    
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSskDxJt4QJCvLLZXBra36gheJ85AyalYK0iw&s";
    img.onload = () => {
      // Setup texture
      var tex = this.gl.createTexture();
      this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img);
      
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
  
      // Draw call
      //this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
      this.gl.drawElements(this.gl.TRIANGLES, inds.length, this.gl.UNSIGNED_SHORT, 0);
    };
  }
}
