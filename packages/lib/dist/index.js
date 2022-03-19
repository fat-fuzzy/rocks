// @ts-check
/**
 ***********************
 * HELPER FUNCTIONS
 ***********************
 */

/**
 * Canvas, like Images, has 2 sizes
 * - Size the canvas is displayed: set with CSS
 * - Number of pixels displayed inside the canvas
 * @param {HTMLCanvasElement} canvas
 */
function resize(canvas) {
  // Get the size that the browser is displaying the canvas
  const displayWidth = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;

  // Check if the canvas is the same size
  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    // If not, make it the same
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
}

/**
 * Use with caution, as this makes the WebGL program draw more pixels
 * -> it might be better to let the GPU take over
 * @param {HTMLCanvasElement} canvas
 */
function resizeHD(canvas) {
  const realToCSSPixels = window.devicePixelRatio;

  // - Get the size that the browser is displaying the canvas in CSS pixels
  // - Compute the size needed to make the drawing buffer match it in device pixels
  const displayWidth = Math.floor(canvas.clientWidth * realToCSSPixels);
  const displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);

  // Check if the canvas is the same size
  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    // If not, make it the same
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
}

// Returns a random integer from 0 to range - 1.
function randomInt(range) {
  return Math.floor(Math.random() * range)
}

/**
 *
 * @param {*} characters
 */
function multiply(characters) {
  return new Array(100) // code from Svelte tutorial confetti
    .fill(0)
    .map((_, i) => {
      return {
        class: 'hidden',
        character: characters[i % characters.length],
        x: Math.random() * 100,
        y: -10 - Math.random() * 100,
        ratio: 0.1 + Math.random() * 1,
      }
    })
    .sort((a, b) => a.ratio - b.ratio)
}

function degToRad(degrees) {
  return degrees * (Math.PI / 180)
}

function round(n, decimals) {
  return Number(Math.round(n + 'e' + decimals) + 'e-' + decimals)
}

var utils = /*#__PURE__*/Object.freeze({
  __proto__: null,
  resize: resize,
  resizeHD: resizeHD,
  randomInt: randomInt,
  multiply: multiply,
  degToRad: degToRad,
  round: round
});

// @ts-check
/**
 ***********************
 * WebGL HELPER FUNCTIONS (setup)
 ***********************
 */

/**
 * @param {WebGLRenderingContext} gl
 * @param {number} type
 * @param {string} source
 */
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader
  }
  const error = `Could not compile shader \n\n${gl.getShaderInfoLog(shader)}`;
  gl.deleteShader(shader);

  throw error
}

/**
 * Link shaders to WebGL rendering context
 * @param {WebGLRenderingContext} gl
 * @param {WebGLShader} vertexShader
 * @param {WebGLShader} fragmentShader
 */
function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program
  }

  const error = `Could not compile program \n\n${gl.getShaderInfoLog(program)}`;
  gl.deleteProgram(program);

  throw error
}

var utilsWebGL = /*#__PURE__*/Object.freeze({
  __proto__: null,
  createShader: createShader,
  createProgram: createProgram
});

// @ts-check

/**
 * @param {WebGLRenderingContext} gl
 * @param {Array} coords
 */
function setGeometry(gl, coords) {
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW);
}

/**
 * Write data to draw a rectangle into the last thing bound to gl.ARRAY_BUFFER (in this context positionBuffer)
 * @param {WebGLRenderingContext} gl
 * @param {number} x coordinate
 * @param {number} y coordinate
 * @param {number} width
 * @param {number} height
 */
function setRectangle(gl, x, y, width, height) {
  const x1 = x;
  const x2 = x + width;
  const y1 = y;
  const y2 = y + height;
  // prettier-ignore
  const coords = [
    x1, y1,
    x2, y1,
    x1, y2,
    x1, y2,
    x2, y1,
    x2, y2,
  ];
  setGeometry(gl, coords);
}

/**
 * @param {WebGLRenderingContext} gl
 * @param {number} colorUniformLocation
 */
function drawRectangle(gl, colorUniformLocation) {
  // Setup a random rectangle
  setRectangle(
    gl,
    randomInt(300),
    randomInt(300),
    randomInt(300),
    randomInt(300),
  );

  // Set a random color.
  gl.uniform4f(
    colorUniformLocation,
    Math.random(),
    Math.random(),
    Math.random(),
    1,
  );

  // Draw the rectangle.
  // WebGL has 3 types of primitives: points, lines, and triangles
  // const primitiveType = gl.TRIANGLES // each iteration, WebGL will draw a triangle based on the values set in gl_Position
  // const count = 6 // number of times the shader will execute: 3
  // 1st Iteration: a_position.x & a_position.y of the vertex shader will be set to the first 2 values in the positionBuffer
  // 2nd Iteration: a_position.x & a_position.y => next pair of values of positionBuffer
  // 3rd Iteration: a_position.x & a_position.y => next (last) pair of values of positionBuffer
  // offset = 0
  // gl.drawArrays(primitiveType, offset, count)
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

/**
 * TRANSLATIONS
 * @param {WebGLRenderingContext} gl
 */
function renderTranslationRectangle(
  gl,
  colorUniformLocation,
  translation,
  color,
  width,
  height,
) {
  gl.uniform4fv(colorUniformLocation, color);
  setRectangle(gl, translation[0], translation[1], width, height);

  // Draw the rectangle.
  const primitiveType = gl.TRIANGLES;
  const offset = 0;
  const count = 6;
  gl.drawArrays(primitiveType, offset, count);
}

/**
 * TRANSLATIONS
 * @param {WebGLRenderingContext} gl
 */
function renderTranslationGeometry(gl, colorUniformLocation, color) {
  // TODO here: extract values from coordinates (width + height)
  /* prettier-ignore */
  const coords = [
    // left column
    0, 0,
    30, 0,
    0, 150,
    0, 150,
    30, 0,
    30, 150,

    // top rung
    30, 0,
    100, 0,
    30, 30,
    30, 30,
    100, 0,
    100, 30,

    // middle rung
    30, 60,
    67, 60,
    30, 90,
    30, 90,
    67, 60,
    67, 90,
  ];
  gl.uniform4fv(colorUniformLocation, color);
  setGeometry(gl, coords);

  // Draw the rectangle.
  const primitiveType = gl.TRIANGLES;
  const offset = 0;
  const count = 18;
  gl.drawArrays(primitiveType, offset, count);
}
/**
 * @param {WebGLRenderingContext} gl
 * @param {number} count number of rectangles to draw
 */
function drawRectangles(gl, colorUniformLocation, count) {
  for (let index = 0; index < count; ++index) {
    drawRectangle(gl, colorUniformLocation);
  }
}

/**
 * INITIALIZATION CODE
 * Code that gets executed once before the program runs
 * @param {HTMLCanvasElement} canvas
 */
function initScene(canvas, vert, frag) {
  // 1. Get A WebGL context
  const gl = canvas.getContext('webgl');

  if (!gl) {
    alert("Sorry buddy, can't find WebGL in your browser ");
  }

  // 2. Initialize shaders : 2 programs that are executed each time a pixel is rendered
  // - Vertex Shader = returns pixel position
  // - Fragment Shader = returns pixel color
  const vertexShaderSrc = vert;
  const fragmentShaderSrc = frag;

  const vertexShader = createShader(
    gl,
    gl.VERTEX_SHADER,
    vertexShaderSrc,
  );
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSrc,
  );
  // 3. Create WebGL program w and tell WebGL to use our shaders
  const program = createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);

  // 4. Bind resources / data

  // where the vertex data needs to go
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');

  // 5. Set up Uniforms (~ globals)
  //  - sets uniforms to be bound to the current program
  // bind u_color
  const colorUniformLocation = gl.getUniformLocation(program, 'u_color');
  // bind u_translation
  const translationUniformLocation = gl.getUniformLocation(
    program,
    'u_translation',
  );
  // bind u_resolution
  const resolutionUniformLocation = gl.getUniformLocation(
    program,
    'u_resolution',
  );
  // bind u_rotation
  const rotationUniformLocation = gl.getUniformLocation(program, 'u_rotation');
  // bind u_scale
  const scaleUniformLocation = gl.getUniformLocation(program, 'u_scale');

  // Create a buffer to put positions in
  const positionBuffer = gl.createBuffer();

  // bind our resource (the positions buffer) to a BIND_POINT on the GPU
  // so that we can pass data to it
  // always set this up before rendering loop
  // (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  return {
    gl,
    resolutionUniformLocation,
    colorUniformLocation,
    translationUniformLocation,
    positionAttributeLocation,
    rotationUniformLocation,
    scaleUniformLocation,
    positionBuffer,
  }
}

/* **
 * @param  {
    gl,
    resolutionUniformLocation,
    positionAttributeLocation,
    positionBuffer,
  } webGlProps
 */
function drawScene(webGlProps) {
  const {
    gl,
    resolutionUniformLocation,
    positionAttributeLocation,
    positionBuffer,
  } = webGlProps;
  /************************
   * RENDERING CODE
   * Code that gets executed every time we draw
   ************************/
  const canvas = /** @type {HTMLCanvasElement} */ (gl.canvas);
  // 1. Setup canvas
  // - resize canvas to fit screen display
  resize(canvas);
  // - tell WebGL how to covert clip space values for gl_Position back into screen space (pixels)
  // -> use gl.viewport
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  // set the resolution
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

  // Clear the canvas
  gl.clearColor(0, 0, 0, 0); // set color to use as default when clearing buffer
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 2. Bind Position
  // - Enable data supply into vertex shader a_position attribute
  gl.enableVertexAttribArray(positionAttributeLocation);
  // - Bind data retrieval to position buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  /**
   *  Tell the a_position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
   * - vec4 a_position is a 4 float vector. We only need 2 values for 2D (points x,y)
   * - default values are:  0, 0, 0, 1
   * - we will set the first two (x, y), and the remaining two (z, w) will remain with default values (0,1)
   */
  const size = 2; // 2 components per iteration
  const type = gl.FLOAT; // the data is in 32bit floats
  const normalize = false; // don't normalize the data
  const stride = 0; // 0: move forward (size * sizeof(type)) each iteration to get to the next position
  const offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset,
  );
}

// Draw the scene.
function drawSceneT2DGL(options) {
  const {webGlProps, translation, rotation, scale, color} = options;
  const {
    gl,
    resolutionUniformLocation,
    colorUniformLocation,
    translationUniformLocation,
    positionAttributeLocation,
    rotationUniformLocation,
    scaleUniformLocation,
    positionBuffer,
  } = webGlProps;
  /************************
   * RENDERING CODE
   * Code that gets executed every time we draw
   ************************/
  const canvas = /** @type {HTMLCanvasElement} */ (gl.canvas);
  // 1. Setup canvas
  // - resize canvas to fit screen display
  resize(canvas);

  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  // Clear the canvas.
  gl.clearColor(0, 0, 0, 0); // set color to use as default when clearing buffer
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Turn on the attribute
  gl.enableVertexAttribArray(positionAttributeLocation);

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  const size = 2; // 2 components per iteration
  const type = gl.FLOAT; // the data is 32bit floats
  const normalize = false; // don't normalize the data
  const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  let offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset,
  );
  // set the resolution
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

  // set the color
  gl.uniform4fv(colorUniformLocation, color);

  // Set the translation.
  gl.uniform2fv(translationUniformLocation, translation);

  // Set the rotation.
  gl.uniform2fv(rotationUniformLocation, rotation);

  // Set the scale.
  gl.uniform2fv(scaleUniformLocation, scale);

  // Draw the geometry.
  const primitiveType = gl.TRIANGLES;
  offset = 0;
  const count = 18; // 6 triangles in the 'F', 3 points per triangle
  gl.drawArrays(primitiveType, offset, count);
}

function rectanglesScene(webGlProps) {
  const {gl, colorUniformLocation} = webGlProps;
  drawScene(webGlProps);
  // 3. Draw!!
  // - Draw 3 random rectangles
  drawRectangles(gl, colorUniformLocation, 1);
}

function translationSceneViaDOM(
  webGlProps,
  translation,
  color,
  width,
  height,
) {
  const {gl, colorUniformLocation} = webGlProps;
  drawScene(webGlProps);
  // 3. Draw!!
  // - Draw 3 random rectangles
  renderTranslationRectangle(
    gl,
    colorUniformLocation,
    translation,
    color,
    width,
    height,
  );
}

function translationSceneViaWebGL(options) {
  const {webGlProps, color} = options;
  const {gl, colorUniformLocation} = webGlProps;
  renderTranslationGeometry(gl, colorUniformLocation, color); // Set the translation.
  drawSceneT2DGL(options);
}

function render() {}

var draw = /*#__PURE__*/Object.freeze({
  __proto__: null,
  initScene: initScene,
  drawScene: drawScene,
  drawSceneT2DGL: drawSceneT2DGL,
  rectanglesScene: rectanglesScene,
  translationSceneViaDOM: translationSceneViaDOM,
  translationSceneViaWebGL: translationSceneViaWebGL,
  render: render
});

const frag = `
// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default
precision mediump float;
uniform vec4 u_color;

void main() {
  // gl_FragColor is a special variable a fragment shader
  // is responsible for setting
  // gl_FragColor = vec4(1, 0, 0.5, 1); // return reddish-purple
  gl_FragColor = u_color;
}
`;

const vert$1 = `
// an attribute will receive data from a buffer
// attribute vec4 a_position; vec4 not necessary for 2D
attribute vec2 a_position;
uniform vec2 u_resolution;

// all shaders have a main function
void main() {
  // convert the position from pixels to 0.0 to 1.0
  vec2 zeroToOne = a_position / u_resolution;

  // convert from 0->1 to 0->2
  vec2 zeroToTwo = zeroToOne * 2.0;

  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = zeroToTwo - 1.0;

  // gl_Position is a special variable in a vertex shader
  // it is responsible for setting
  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1); // 0,0 = top, left (traditional 3D)
  // gl_Position = vec4(clipSpace, 0, 1); // 0,0 = bottom, left
}
`;

const vert = `
// an attribute will receive data from a buffer
// attribute vec4 a_position; vec4 not necessary for 2D
attribute vec2 a_position;
uniform vec2 u_resolution;
uniform vec2 u_translation;
uniform vec2 u_rotation;
uniform vec2 u_scale;

// all shaders have a main function
void main() {
  // Scale the position
  vec2 scaledPosition = a_position * u_scale;
  
  // Rotate the position
  vec2 rotatedPosition = vec2(
    scaledPosition.x * u_rotation.y + scaledPosition.y * u_rotation.x,
    scaledPosition.y * u_rotation.y - scaledPosition.x * u_rotation.x
  );

  // Add in the translation
  vec2 position = rotatedPosition + u_translation;

  // convert the position from pixels to 0.0 to 1.0
  vec2 zeroToOne = position / u_resolution;

  // convert from 0->1 to 0->2
  vec2 zeroToTwo = zeroToOne * 2.0;

  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = zeroToTwo - 1.0;

  // gl_Position is a special variable in a vertex shader
  // it is responsible for setting
  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1); // 0,0 = top, left (traditional 3D)
  // gl_Position = vec4(clipSpace, 0, 1); // 0,0 = bottom, left
}
`;

const animations = [
  {
    id: 'random-rect',
    name: 'Random',
    emoji: '🎰',
    duration: 2000,
    vert: vert$1,
    frag,
    init(canvas) {
      this.webGlProps = initScene(canvas, this.vert, this.frag);
    },
    run(canvas) {
      if (!this.webGlProps) {
        this.init(canvas);
      }
      rectanglesScene(this.webGlProps);
    },
    clear() {
      this.webGlProps = null;
    },
  },
  {
    id: 'random-rect-audio',
    name: 'Audio',
    emoji: '🥁',
    audio: true,
    duration: 4179,
    playbackRate: 2,
    vert: vert$1,
    frag,
    init(canvas) {
      this.webGlProps = initScene(canvas, this.vert, this.frag);
    },
    run(canvas) {
      if (!this.webGlProps) {
        this.init(canvas);
      }
      rectanglesScene(this.webGlProps);
    },
    clear() {
      this.webGlProps = null;
    },
  },
  {
    id: '2D',
    name: '2D',
    emoji: '📐',
    interactive: true,
    webGlProps: null,
    vert: vert,
    frag,
    color: null,
    init(canvas) {
      this.webGlProps = initScene(canvas, this.vert, this.frag);
    },
    run(canvas, geometry) {
      if (!this.webGlProps) {
        this.init(canvas);
      }
      const {color, translation, rotation, scale } = geometry;
      this.color = color;
      const drawOptions = {
        webGlProps: this.webGlProps,
        translation,
        rotation,
        scale,
        color,
      };
      translationSceneViaWebGL(drawOptions);
    },
    update(geometry) {
      const {translation, rotation, scale} = geometry;
      const drawOptions = {
        webGlProps: this.webGlProps,
        translation,
        rotation,
        scale,
        color: this.color,
      };
      drawSceneT2DGL(drawOptions);
    },
    clear() {
      this.webGlProps = null;
    },
  },
  {
    id: 'poop',
    name: 'A Feature',
    emoji: '💩',
    type: 'test',
    run() {
      throw Error('Not a Bug 💩')
    },
    clear() {
      // do nothing
    }
  },
];

function getGeometryDefaults(canvasWidth, canvasHeight) {
  return {
    color: [Math.random(), Math.random(), Math.random(), 1],
    translation: [canvasWidth / 2, canvasHeight / 2],
    rotation: [0, 0],
    scale: [1, 1],
    width: round((canvasWidth * 0.3) / 5, 2), // of geometry
    height: round(canvasHeight / 5, 2), // of geometry
  }
}

var animations$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  animations: animations,
  getGeometryDefaults: getGeometryDefaults
});

export { animations$1 as animations, draw, utils, utilsWebGL as utilsWebGl };
