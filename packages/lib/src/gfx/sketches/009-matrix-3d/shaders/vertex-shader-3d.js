const vert = `#version 300 es
// VERTEX SHADER

// in = an attribute that will receive data from a buffer

in vec4 a_position;
in vec4 a_color;

uniform mat4 u_matrix;

out vec4 v_color;

void main() {
  // Multiply the position by the matrix.
  gl_Position = u_matrix * a_position; // 0,0 = top, left (traditional 3D)

  // pass the color to the fragment shader
  v_color = a_color;
}
`
export {vert}
