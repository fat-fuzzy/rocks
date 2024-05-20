const frag = `#version 300 es
//FRAGMENT SHADER

// fragment shaders don't have a default precision so we need
// to pick one
precision highp float;

// our texture
uniform sampler2D u_image0;
uniform sampler2D u_image1;

// the texCoords passed in from the vertex shader
in vec2 v_texCoord;

// We need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  vec4 color0 = texture(u_image0, v_texCoord);
  vec4 color1 = texture(u_image1, v_texCoord);
  outColor = color0 * color1;
}
`

export {frag}
