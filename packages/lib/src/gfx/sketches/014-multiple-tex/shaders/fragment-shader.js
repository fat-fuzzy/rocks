const defaultFrag = `#version 300 es
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
	// Look up a color from the texture
  vec4 color0 = texture2D(u_image0, v_texCoord);
  vec4 color1 = texture2D(u_image1, v_texCoord);
	outColor = color0 * color1;
}
`

function swapChannels(channels) {
	return `#version 300 es
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
    // Look up a color from the texture
    vec4 color0 = texture2D(u_image0, v_texCoord).${channels};
    vec4 color1 = texture2D(u_image1, v_texCoord).${channels};
    outColor = color0 * color1;
  }
  `
}

function applyBlur(level) {
	return `#version 300 es
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
		vec2 pixels = vec2(${level}) / vec2(textureSize(u_image0, 0));

    // Average the left, middle, and right pixels
    vec4 color0 = (
			texture(u_image0, v_texCoord) +
			texture(u_image0, v_texCoord + vec2( pixels.x / 2.0,  pixels.y / 2.0)) +
			texture(u_image0, v_texCoord + vec2(-pixels.x / 2.0, -pixels.y / 2.0))) / 3.0;

		vec2 pixels = vec2(${level}) / vec2(textureSize(u_image1, 0));

    // Average the left, middle, and right pixels
    vec4 color1 = (
			texture(u_image1, v_texCoord) +
			texture(u_image1, v_texCoord + vec2( pixels.x / 2.0,  pixels.y / 2.0)) +
			texture(u_image1, v_texCoord + vec2(-pixels.x / 2.0, -pixels.y / 2.0))) / 3.0;
  }
  `
}

const channels = {
	ragb: swapChannels('ragb'),
	rabg: swapChannels('rabg'),
	rbag: swapChannels('rbag'),
	rbga: swapChannels('rbga'),
	rgba: swapChannels('rgba'),
	rgab: swapChannels('rgab'),
	abgr: swapChannels('abgr'),
	abrg: swapChannels('abrg'),
	agrb: swapChannels('agrb'),
	agbr: swapChannels('agbr'),
	arbg: swapChannels('arbg'),
	argb: swapChannels('argb'),
	bagr: swapChannels('bagr'),
	barg: swapChannels('barg'),
	bgar: swapChannels('bgar'),
	bgra: swapChannels('bgra'),
	brga: swapChannels('brga'),
	brag: swapChannels('brag'),
	gabr: swapChannels('gabr'),
	garb: swapChannels('garb'),
	gbar: swapChannels('gbar'),
	gbra: swapChannels('gbra'),
	grab: swapChannels('grab'),
	grba: swapChannels('grba'),
}

const blur = {
	'blur.1': applyBlur('1'),
	'blur.2': applyBlur('2'),
	'blur.3': applyBlur('3'),
}

export {channels, blur, defaultFrag}
