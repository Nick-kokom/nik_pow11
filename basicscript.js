import * as THREE from 'three';

// Canvas and Scene Setup
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

// Create Box with Different Colored Faces
const materials = [
    new THREE.MeshBasicMaterial({ color: 0x0000FF }),  // Front face: Blue
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }),  // Back face: Green
    new THREE.MeshBasicMaterial({ color: 0xFFFFFF }),  // Top face: White
    new THREE.MeshBasicMaterial({ color: 0xffff00 }),  // Bottom face: Yellow
    new THREE.MeshBasicMaterial({ color: 0xFF0000 }),  // Right face: Red
    new THREE.MeshBasicMaterial({ color: 0xFFA500 })   // Left face: Orange
];
const geometry = new THREE.BoxGeometry(1, 1, 1);
const mesh = new THREE.Mesh(geometry, materials);
scene.add(mesh);

// Camera Setup
const sizes = { width: window.innerWidth, height: window.innerHeight };
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 5;
scene.add(camera);

// Renderer Setup
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animation Variables
let animationStarted = false;
let positionX = 0;
let positionY = 0;
const velocityX = 3;
const velocityY = 5;
const gravity = 0.1;
let timeElapsed = 0;
const maxHeight = 3;
const groundLevel = 0;
let movingRight = true;

// Animate Function
const animate = () => {
    if (animationStarted) {
        timeElapsed += 0.01;

        // Juggling vertical motion
        positionY = maxHeight * Math.sin(timeElapsed * velocityY);

        // Horizontal motion
        if (movingRight) {
            positionX += velocityX * 0.01;
        } else {
            positionX -= velocityX * 0.01;
        }

        // Bounce horizontally
        if (positionX >= 4) movingRight = false;
        else if (positionX <= -4) movingRight = true;

        // Update box position
        mesh.position.x = positionX;
        mesh.position.y = positionY;

        // Rotate cube for spinning effect
        mesh.rotation.x += 0.05;
        mesh.rotation.y += 0.05;
    }

    // Render the scene
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

// Start Animation on Canvas Click
canvas.addEventListener('click', () => {
    animationStarted = !animationStarted;
    timeElapsed = 0;  // Reset time for consistent starting position
});

animate();
