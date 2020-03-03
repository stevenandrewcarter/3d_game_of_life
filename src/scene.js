var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true);
var size = 15;
var world = new World(size);

var createScene = function() {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera('camera', 0, 0, size * 2, new BABYLON.Vector3(size / 2, size / 2, size / 2), scene);
    camera.setPosition(new BABYLON.Vector3(size / 2, size / 2, -(size * 2)));
    camera.attachControl(canvas, false);
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
    world.init(scene);
    return scene;
}

var scene = createScene();
engine.runRenderLoop(function() {
    world.update(scene);
    scene.render();
});