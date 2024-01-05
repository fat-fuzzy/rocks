const vert = `#version 300 es
// VERTEX SHADER

// in = an attribute that will receive data from a buffer

in vec4 a_position;
in vec4 a_color;

uniform mat4 u_matrix;
uniform float u_fudgeFactor;

out vec4 v_color;

void main() {
  // Multiply the position by the matrix.
  vec4 position = u_matrix * a_position;

  // Adjust z to obtain perspective by division
  float zFactor = 1.0 + position.z * u_fudgeFactor;

  // Divide x and y by z to obtain perspective
  gl_Position =vec4(position.xy / zFactor, position.zw);

  // pass the color to the fragment shader
  v_color = a_color;
}
`
export {vert}
