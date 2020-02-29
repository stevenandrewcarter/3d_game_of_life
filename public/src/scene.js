function World(size) {
    this.cells = [];
    this.dimension = {x: size, y: size, z: size};

    this.init = function(scene) {
        for (let x = 0; x < this.dimension.x; x++) {
            for (let y = 0; y < this.dimension.y; y++) {
                for (let z = 0; z < this.dimension.z; z++) {
                    var pos = new BABYLON.Vector3(x, y, z);                    
                    var box = BABYLON.MeshBuilder.CreateBox('box', {size: 0.5, updatable: true}, scene);
                    box.position = pos;
                    this.cells.push(box);
                    var mat = new BABYLON.StandardMaterial("material", scene);
                    mat.emissiveColor = new BABYLON.Color4(Math.random(), Math.random(), Math.random(), 1);
                    box.material = mat;
                }
            }
        }
    }

    this.update = function(scene) {
        for (var cell in this.cells) {
            this.cells[cell].material.emissiveColor = new BABYLON.Color4(Math.random(), Math.random(), Math.random(), 1);
        }
    }
}

window.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('renderCanvas');
    var engine = new BABYLON.Engine(canvas, true);
    var world = new World(10);

    var createScene = function() {
        var scene = new BABYLON.Scene(engine);
        var camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 5, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
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
    window.addEventListener('resize', function() {
        engine.resize();
    });
});