import * as THREE from 'three'
import {OrbitControls} from './three/OrbitControls'

import vert from './shaders/depth.vert'
import frag from './shaders/depth.frag'
// import vert from './shaders/test.vert';
// import frag from './shaders/test.frag';

let camera
let scene
let renderer
let light
let controls
let animationFrame

const uniforms = {
	u_time: {
		type: 'f',
		value: 1.0,
	},
	u_resolution: {
		type: 'v2',
		value: new THREE.Vector2(),
	},
	u_mouse: {
		type: 'v2',
		value: new THREE.Vector2(),
	},
}

// const imageSrc = '../static/images/tup.png';
const imageSrc = '../static/images/tup-on-black.jpg'
const depthMapSrc = '../static/images/tup-depth-map.jpg'

function render() {
	uniforms.u_time.value += 0.05
	const canvas = renderer.domElement
	camera.aspect = canvas.clientWidth / canvas.clientHeight
	camera.updateProjectionMatrix()
	controls.update()

	renderer.render(scene, camera)
}

// eslint-disable-next-line no-unused-vars
function onWindowResize(event) {
	renderer.setSize(window.innerWidth, window.innerHeight)
	uniforms.u_resolution.value.x = renderer.domElement.width
	uniforms.u_resolution.value.y = renderer.domElement.height
}

export function initScene() {
	/**
	 * Camera
	 */
	const fieldOfView = 100
	const aspectRatio = window.innerWidth / window.innerHeight
	const nearPlane = 0.1
	const farPlane = 1000
	camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane)
	// camera.position.z = 5;
	camera.position.set(0.5, 0.5, 4)

	/**
	 * Scene
	 */
	scene = new THREE.Scene()
	// Add a point of white light
	light = new THREE.PointLight(0xffffff, 1, 0)
	// Specify the light's position
	light.position.set(1, 1, 100)
	scene.add(light)

	/**
	 * Geometry, Texture & Mesh
	 */
	// original comments : https://bl.ocks.org/duhaime/c8375f1c313587ac629e04e0253481f9
	// Identify the image size
	const imageSize = {width: 7, height: 8}
	const geometry = new THREE.BufferGeometry(imageSize.width, imageSize.height)
	const coords = {x: -5, y: -4.25, z: 0}
	const vertices = new Float32Array([
		coords.x,
		coords.y,
		coords.z, // bottom left
		coords.x + imageSize.width,
		coords.y,
		coords.z, // bottom right
		coords.x + imageSize.width,
		coords.y + imageSize.height,
		coords.z, // upper right
		coords.x,
		coords.y + imageSize.height,
		coords.z, // upper left
	])
	// set the uvs for this box; these identify the following corners:
	// lower-left, lower-right, upper-right, upper-left
	const uvs = new Float32Array([0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0])
	// indices = sequence of index positions in `vertices` to use as vertices
	// we make two triangles but only use 4 distinct vertices in the object
	// the second argument to THREE.BufferAttribute is the number of elements
	// in the first argument per vertex
	geometry.setIndex([0, 1, 2, 2, 3, 0])
	geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3))
	geometry.addAttribute('uv', new THREE.BufferAttribute(uvs, 2))
	// Create a texture loader so we can load our image file
	const loader = new THREE.TextureLoader()

	// specify custom uniforms and attributes for shaders
	// Uniform types: https://github.com/mrdoob/three.js/wiki/Uniforms-types
	const image = loader.load(imageSrc)
	const depthMap = loader.load(depthMapSrc)
	const material = new THREE.ShaderMaterial({
		uniforms: {
			...uniforms,
			u_image: {
				type: 't',
				value: image,
			},
			u_depthMap: {
				type: 't',
				value: depthMap,
			},
		},
		vertexShader: vert,
		fragmentShader: frag,
	})

	const mesh = new THREE.Mesh(geometry, material)
	// Set the position of the image mesh in the x,y,z dimensions
	mesh.position.set(0, 0, 0)
	scene.add(mesh)

	/**
	 * Init Renderer
	 */
	const canvas = document.getElementById('canvas')
	if (canvas) {
		renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: true,
			// alpha: true,
		})
		renderer.setPixelRatio(window.devicePixelRatio)
		controls = new OrbitControls(camera, renderer.domElement)
		controls.zoomSpeed = 0.4
		controls.panSpeed = 0.4

		onWindowResize()
		window.addEventListener('resize', onWindowResize, false)

		document.onmousemove = (e) => {
			uniforms.u_mouse.value.x = e.pageX
			uniforms.u_mouse.value.y = e.pageY
		}
	}
}

export function animate() {
	animationFrame = requestAnimationFrame(animate)
	render()
}

export function stop() {
	cancelAnimationFrame(animationFrame)
}
