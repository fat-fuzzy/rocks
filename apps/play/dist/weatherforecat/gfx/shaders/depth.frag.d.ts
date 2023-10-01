declare const _default: "\n#ifdef GL_ES\n  precision mediump float;\n#endif\n\nuniform vec4 u_resolution; // Canvas size (width,height)\nuniform vec2 u_mouse; // mouse position in screen pixels\nuniform float u_time; // Time in seconds since load\n\nuniform float u_pixelRatio;\nuniform vec2 threshold;\nuniform sampler2D u_image;\nuniform sampler2D u_depthMap;\nvarying vec2 v_texcoord;\n\nvoid main() {\n  vec4 depth = texture2D(u_depthMap, v_texcoord);\n  vec4 image = texture2D(u_image, v_texcoord);\n\n  // float parallaxMult = depthDistortion.r + depthDistortion.g + depthDistortion.b / 3.0;\n  // vec2 parallax = (u_mouse) * parallaxMult;\n  // vec4 original = texture2D(u_image, (v_texcoord + parallax));\n  \n  gl_FragColor = image;\n  // gl_FragColor = depth;\n  // gl_FragColor = original;\n}\n";
export default _default;
