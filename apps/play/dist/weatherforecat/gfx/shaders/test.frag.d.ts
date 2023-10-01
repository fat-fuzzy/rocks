declare const _default: "\nuniform vec2 u_resolution;\nuniform float u_time;\n\nvoid main() {\n    vec2 st = gl_FragCoord.xy/u_resolution.xy;\n    gl_FragColor=vec4(st.x,st.y,st.y,1.0);\n}\n";
export default _default;
