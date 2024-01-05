const frag = `#version 300 es
//FRAGMENT SHADER

// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default
precision mediump float;

in vec4 v_color;
out vec4 out_color;

void main() {
  out_color = v_color;
}
`

export {frag}
