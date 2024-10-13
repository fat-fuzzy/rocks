const frag = `#version 300 es
//FRAGMENT SHADER

// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default
precision mediump float;
out vec4 out_color;
uniform vec4 u_color;

void main() {
  out_color = u_color; // return reddish-purple
}
`

export {frag}
