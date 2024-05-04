const frag = `#version 300 es
//FRAGMENT SHADER

// fragment shaders don't have a default precision so we need
// to pick one
precision highp float;

// our texture
uniform sampler2D u_image;

// the level of distortion
uniform int u_level;

// The convolution kernel data
uniform float u_kernel[9];
uniform float u_kernelWeight;

// the texCoords passed in from the vertex shader
in vec2 v_texCoord;

// We need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  vec2 pixels = vec2(float(u_level)) / vec2(textureSize(u_image, 0));

  vec4 colorSum = 
    texture(u_image, v_texCoord + pixels * vec2(-1, -1)) * u_kernel[0] +
    texture(u_image, v_texCoord + pixels * vec2( 0, -1)) * u_kernel[1] +
    texture(u_image, v_texCoord + pixels * vec2( 1, -1)) * u_kernel[2] +
    texture(u_image, v_texCoord + pixels * vec2(-1,  0)) * u_kernel[3] +
    texture(u_image, v_texCoord + pixels * vec2( 0,  0)) * u_kernel[4] +
    texture(u_image, v_texCoord + pixels * vec2( 1,  0)) * u_kernel[5] +
    texture(u_image, v_texCoord + pixels * vec2(-1,  1)) * u_kernel[6] +
    texture(u_image, v_texCoord + pixels * vec2( 0,  1)) * u_kernel[7] +
    texture(u_image, v_texCoord + pixels * vec2( 1,  1)) * u_kernel[8] ;
    
  // Average the left, middle, and right pixels
  outColor = vec4((colorSum / u_kernelWeight).rgb, 1);
}
`

export {frag}
