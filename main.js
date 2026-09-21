import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202025);

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000,
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;  

const cube = new THREE.Mesh(
	new THREE.BoxGeometry(),
	new THREE.MeshStandardMaterial({ color: 0x44aa88 }),
);
//scene.add(cube);

const light = new THREE.DirectionalLight(0xffffff, 10);
light.position.set(2, 2, 5);
scene.add(light);
//scene.add(new THREE.AmbientLight(0xffffff, 0.4));


const loader = new GLTFLoader();
const gltf = await loader.loadAsync( 'models/source/OtudusMegalodon.gltf' );
const model = gltf.scene;

const sharkMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x44aa88,
    metalness: 0.5,
    roughness: 0.5,
    emissive: 0xffffff,
    emissiveIntensity: .0,
    wireframe: true,
    });
// Create a new material
    const newMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
    });

    // Traverse through the model and replace materials on meshes
    // model.traverse((child) => {
    //     if (child.isMesh) {
    //         child.material = sharkMaterial;
    //     }
    // });

const mixer = new THREE.AnimationMixer(model);

// play the first animation clip
const action = mixer.clipAction(gltf.animations[0]);
action.play();

/* gltf.animations.forEach((clip) => {
    mixer.clipAction(clip).play();
});  */

scene.add( model );







function animate() {
	requestAnimationFrame(animate);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	controls.update();
	mixer.update(0.01);
	renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
