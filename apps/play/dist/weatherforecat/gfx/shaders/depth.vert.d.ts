declare const _default: "\n#ifdef GL_ES\n  precision mediump float;\n#endif\n\nvarying vec2 vUv; // pass the uv coordinates of each pixel to the frag shader\nvarying vec2 v_texcoord;\n\nvoid main() {\n  v_texcoord = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n";
export default _default;
