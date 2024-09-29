const vert = `#version 300 es
// VERTEX SHADER

// in = an attribute that will receive data from a buffer

in vec2 a_position;
uniform mat3 u_matrix;

void main() {
  // Multiply the position by the matrix.
  gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1); // 0,0 = top, left (traditional 3D)
}
`
export {vert}
