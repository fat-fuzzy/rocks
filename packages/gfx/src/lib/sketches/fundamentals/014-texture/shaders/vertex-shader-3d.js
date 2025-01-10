const vert = `#version 300 es
// VERTEX SHADER

// in = an attribute that will receive data from a buffer
in vec4 a_position;
in vec2 a_texCoord;

// A matrix to transform the positions by
uniform mat4 u_matrix;

out vec2 v_texCoord;

void main() {

  // Multiply the position by the matrix
  gl_Position = u_matrix * a_position;

  // Pass the texCoord to the fragment shader
  // The GPU will interpolate this value between points
  v_texCoord = a_texCoord;
}
`
export {vert}
