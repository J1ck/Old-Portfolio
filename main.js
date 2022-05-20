import * as THREE from "https://cdn.skypack.dev/three@0.136.0";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.width = "100%";
renderer.domElement.style.height = "100%";
renderer.domElement.style.zIndex = -100;
scene.background = new THREE.Color("rgb(255, 255, 255)");
document.getElementById("main").appendChild( renderer.domElement );

const texture = new THREE.TextureLoader().load( "assets/icon.png" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

const geometry = new THREE.PlaneGeometry();
const material = new THREE.MeshBasicMaterial( { color: "white", map: texture } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const geometry2 = new THREE.SphereGeometry();
const material2 = new THREE.MeshBasicMaterial( { color: "white", map: texture } );
const cube2 = new THREE.Mesh( geometry2, material2 );
cube2.position.z = -5;
scene.add( cube2 );

const cursorTex = new THREE.TextureLoader().load( "assets/circle.png" );
const cursor = new THREE.Mesh(new THREE.PlaneGeometry(), new THREE.MeshBasicMaterial({alphaMap: cursorTex, map: cursorTex}));
cursor.position.z = 1;
scene.add(cursor);

const vert = `

`;
const frag = `

`;

const terrain = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 3, 30, 30),
    new THREE.ShaderMaterial({
        uniforms : {

        },
        vertexShader : vert,
        fragmentShader : frag
    })
);

camera.position.z = 5;

var mouse = new THREE.Vector2();

window.onresize = function(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}
document.addEventListener("mousemove", function(event){
    mouse = new THREE.Vector2(event.x - window.innerWidth / 2, event.y - window.innerHeight / 2);
});

var time = 0;

function lerp(v0, v1, t){
    return v0 + t * (v1 - v0);
}

function draw() {
	requestAnimationFrame( draw );

    // cube.rotation.x += 0.01;
    // cube.rotation.y -= 0.01;

    cube.position.x = lerp(cube.position.x, mouse.x / 1000, 0.1);
    cube.position.y = lerp(cube.position.y, mouse.y / -1000, 0.1);
    cube.rotation.y = lerp(cube.rotation.y, mouse.x / 1000, 0.1);
    cube.rotation.x = lerp(cube.rotation.x, mouse.y / 1000, 0.1);

    cube2.position.x = lerp(cube2.position.x, mouse.x / 5000, 0.1);
    cube2.position.y = lerp(cube2.position.y, mouse.y / -5000, 0.1);
    cube2.rotation.y = lerp(cube2.rotation.y, mouse.x / 1000 + time, 0.1);
    cube2.rotation.x = lerp(cube2.rotation.x, mouse.y / 1000, 0.1);

    cursor.position.x = lerp(cursor.position.x, mouse.x / 150, 0.1);
    cursor.position.y = lerp(cursor.position.y, mouse.y / -150, 0.1);

    time += 0.01;

	renderer.render( scene, camera );
}
draw();