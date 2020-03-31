import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { World } from './world.js'

const size = 25;
// Get the canvas element from the DOM.
const canvas = document.getElementById("renderCanvas");
// Associate a Babylon Engine to it.
const engine = new Engine(canvas);

// Create our first scene.
var scene = new Scene(engine);
var world = new World(size, scene);

// This creates and positions a free camera (non-mesh)
var camera = new ArcRotateCamera("camera", 0, 0, size * 2, new Vector3(size / 2, size / 2, size / 2), scene);
camera.setPosition(new Vector3(size / 2, size / 2, -(size * 2)));
// This attaches the camera to the canvas
camera.attachControl(canvas, true);

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
// Default intensity is 1. Let's dim the light a small amount
light.intensity = 0.7;

// Render every frame
engine.runRenderLoop(() => {
    // world.update(scene);
    scene.render();
});

window.addEventListener('resize', function() {
    engine.resize();
});