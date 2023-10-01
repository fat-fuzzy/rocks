export default /* glsl */`
#ifdef GL_ES
  precision mediump float;
#endif

varying vec2 vUv; // pass the uv coordinates of each pixel to the frag shader
varying vec2 v_texcoord;

void main() {
  v_texcoord = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
