/**
* Exampe taken from here : https://github.com/akella/fake3d
* I need to do some more homework on shader basics before returning to this code
*/
export default /* glsl */`
#ifdef GL_ES
  precision mediump float;
#endif

uniform vec4 u_resolution; // Canvas size (width,height)
uniform vec2 u_mouse; // mouse position in screen pixels
uniform float u_time; // Time in seconds since load

uniform float u_pixelRatio;
uniform vec2 threshold;
uniform sampler2D u_image;
uniform sampler2D u_depthMap;
varying vec2 v_texcoord;

void main() {
  vec4 depth = texture2D(u_depthMap, v_texcoord);
  vec4 image = texture2D(u_image, v_texcoord);

  // float parallaxMult = depthDistortion.r + depthDistortion.g + depthDistortion.b / 3.0;
  // vec2 parallax = (u_mouse) * parallaxMult;
  // vec4 original = texture2D(u_image, (v_texcoord + parallax));
  
  gl_FragColor = image;
  // gl_FragColor = depth;
  // gl_FragColor = original;
}
`;
