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

	const floorGeometry = new THREE.PlaneGeometry(50, 50, 1, 1);
	const floorTexture = new THREE.TextureLoader().load("/textures/portal-floor.jpg")
	floorTexture.wrapS = THREE.RepeatWrapping;
	floorTexture.wrapT = THREE.RepeatWrapping;
	floorTexture.repeat.x = 25;
	floorTexture.repeat.y = 25;
	const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide })
	const floor = new THREE.Mesh(floorGeometry, floorMaterial);

	const wallGeometry = new THREE.BoxGeometry(50, 50, 1);
	const wallTexture = new THREE.TextureLoader().load("/textures/portal-wall.jpg")
	wallTexture.wrapS = THREE.RepeatWrapping;
	wallTexture.wrapT = THREE.RepeatWrapping;
	wallTexture.repeat.x = 10;
	wallTexture.repeat.y = 10;
	const wallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture });
	const wall1 = new THREE.Mesh(wallGeometry, wallMaterial)
	const wall2 = new THREE.Mesh(wallGeometry, wallMaterial)
	const wall3 = new THREE.Mesh(wallGeometry, wallMaterial)
	const wall4 = new THREE.Mesh(wallGeometry, wallMaterial)
	const ceiling = new THREE.Mesh(wallGeometry, wallMaterial)

	cube = new THREE.Mesh(geometry, material)
    cube2 = new THREE.Mesh(geometry, material)
	scene.add(cube)
    scene.add(cube2)
	scene.add(floor)

	scene.add(wall1)
	scene.add(wall2)
	scene.add(wall3)
	scene.add(wall4)

	scene.add(ceiling)

    cube.position.x = 3
    cube2.position.x = -3

	wall1.position.set(25,22,0)
	wall1.rotation.y = Math.PI / 2;

	wall2.position.set(-25,22,0)
	wall2.rotation.y = Math.PI / 2;

	wall3.position.set(0,22,25)

	wall4.position.set(0,22,-25)

	ceiling.position.set(0,48,0)
	ceiling.rotation.x = Math.PI / 2;

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
