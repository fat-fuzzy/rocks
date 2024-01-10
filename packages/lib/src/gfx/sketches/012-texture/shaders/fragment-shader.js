const frag = `#version 300 es
//FRAGMENT SHADER

// fragment shaders don't have a default precision so we need
// to pick one
precision highp float;

// our texture
uniform sampler2D u_image;

// the texCoords passed in from the vertex shader
in vec2 v_texCoord;

// We need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  // Look up a color from the texture
  outColor = texture(u_image, v_texCoord);
}
`

export {frag}
