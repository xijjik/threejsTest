import '../style.css'
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'

let camera, scene, renderer, cube, cube2, controls

function init() {
	scene = new THREE.Scene()
	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	)
	renderer = new THREE.WebGLRenderer({ antialias: true })
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)

	controls = new PointerLockControls(camera, renderer.domElement)

	const geometry = new THREE.BoxGeometry(3, 3, 3)
	const texture = new THREE.TextureLoader().load("/textures/moon_1024.jpg")
	const material = new THREE.MeshBasicMaterial({ map: texture })

	//(width, height, widthSegments, heightSegments);
	const floorGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
	const floorTexture = new THREE.TextureLoader().load("/textures/carpet.jpg")
	floorTexture.wrapS = THREE.RepeatWrapping;
	floorTexture.wrapT = THREE.RepeatWrapping;
	floorTexture.repeat.x = 50;
	floorTexture.repeat.y = 50;
	const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide })
	const floor = new THREE.Mesh(floorGeometry, floorMaterial);

	cube = new THREE.Mesh(geometry, material)
    cube2 = new THREE.Mesh(geometry, material)
	scene.add(cube)
    scene.add(cube2)
	scene.add(floor)

    cube.position.x = 3
    cube2.position.x = -3

	floor.rotation.x = Math.PI / 2;

	floor.position.set(0, -3, 0);

	camera.position.z = 5

	window.addEventListener( 'click', function () {
		controls.lock();
	}, false );
}

var pressedKeys = new Set();

document.addEventListener('keydown', function(event) {
	pressedKeys.add(event.key);
});

document.addEventListener('keyup', function(event) {
	pressedKeys.delete(event.key);
});

// Draw the scene every time the screen is refreshed
function animate() {
	requestAnimationFrame(animate);

	// Rotate cube (Change values to change speed)
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

    cube2.rotation.x += 0.01;
	cube2.rotation.y += 0.01;

	if (pressedKeys.has('w')) {
		controls.moveForward(0.1)
	}
	if (pressedKeys.has('s')) {
		controls.moveForward(-0.1)
	}
	if (pressedKeys.has('a')) {
		controls.moveRight(-0.1)
	}
	if (pressedKeys.has('d')) {
		controls.moveRight(0.1)
	}

	renderer.render(scene, camera);
}

function onWindowResize() {
	// Camera frustum aspect ratio
	camera.aspect = window.innerWidth / window.innerHeight;
	// After making changes to aspect
	camera.updateProjectionMatrix();
	// Reset size
	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();
