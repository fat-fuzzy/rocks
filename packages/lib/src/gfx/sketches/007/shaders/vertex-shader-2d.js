const vert = `#version 300 es
//VERTEX SHADER

// in = an attribute that will receive data from a buffer
// in vec4 a_position; vec4 not necessary for 2D

in vec2 a_position;
uniform vec2 u_resolution;
uniform mat3 u_matrix;

// all shaders have a main function
void main() {
  // Scale the position
  vec2 position = (u_matrix * vec3(a_position, 1)).xy;

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
`
export {vert}
