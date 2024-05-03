const frag = `#version 300 es
//FRAGMENT SHADER

// fragment shaders don't have a default precision so we need
// to pick one
precision highp float;

// our texture
uniform sampler2D u_image;

// the channel order swapped
uniform ivec4 u_channelSwap;

// the blur level
uniform int u_blurLevel;

// the texCoords passed in from the vertex shader
in vec2 v_texCoord;

// We need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  // Look up a color from the texture
  vec4 color = texture(u_image, v_texCoord);

  // Apply the channel order
  // outColor = vec4(color[u_channelSwap.x], color[u_channelSwap.y], color[u_channelSwap.z], color[u_channelSwap.w]);

  vec2 pixels = vec2(float(u_blurLevel)) / vec2(textureSize(u_image, 0));

  // Average the left, middle, and right pixels
  vec4 blurred  = (
    texture(u_image, v_texCoord) +
    texture(u_image, v_texCoord + vec2( pixels.x / 2.0,  pixels.y / 2.0)) +
    texture(u_image, v_texCoord + vec2(-pixels.x / 2.0, -pixels.y / 2.0))) / 3.0;

  // Apply the channel order
  outColor = vec4(blurred[u_channelSwap.x], blurred[u_channelSwap.y], blurred[u_channelSwap.z], blurred[u_channelSwap.w]);
}
`

export {frag}
