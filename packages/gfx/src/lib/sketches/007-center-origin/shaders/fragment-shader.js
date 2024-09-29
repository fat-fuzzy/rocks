const frag = `#version 300 es
//FRAGMENT SHADER

// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default
precision mediump float;
out vec4 out_color;

void main() {
  out_color = vec4(1, 0, 0.5, 1); // return reddish-purple
}
`

export {frag}
