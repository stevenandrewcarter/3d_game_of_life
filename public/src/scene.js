function Cell() {
    this.neighbours = [];
    this.aliveNeighbours = 0;
    this.isAlive = false;
    this.box = null;

    this.create = function(scene, position) {
        this.box = BABYLON.MeshBuilder.CreateBox('box', {size: 1, updatable: true}, scene);
        this.box.position = position;
        var mat = new BABYLON.StandardMaterial("material", scene);
        mat.emissiveColor = new BABYLON.Color4(Math.random(), Math.random(), Math.random(), 1);
        this.box.material = mat;
        this.isAlive = Math.random() <= 0.3;
        this.box.setEnabled(this.isAlive);
    }

    this.updateNeighbors = function() {
        this.aliveNeighbours = 0;
        for (var n in this.neighbours) {
            if (this.neighbours[n].isAlive) {
                this.aliveNeighbours++;
            }
        }
        if (this.isAlive) {
            if (this.aliveNeighbours < 2 || this.aliveNeighbours > 3) {
                this.isAlive = false;
            }
        } else {
            if (this.aliveNeighbours ===3 ) {
                this.isAlive = true;
            }
        }
        this.box.setEnabled(this.isAlive);
    }
}

function World(size) {
    this.cells = new Array();
    this.dimension = {x: size, y: size, z: size};

    this.init = function(scene) {
        for (let x = 0; x < this.dimension.x; x++) {
            this.cells[x] = new Array();
            for (let y = 0; y < this.dimension.y; y++) {
                this.cells[x][y] = new Array();
                for (let z = 0; z < this.dimension.z; z++) {
                    this.cells[x][y][z] = new Cell();
                    this.cells[x][y][z].create(scene, new BABYLON.Vector3(x, y, z));
                }
            }
        }
        // Update Neighbours
        for (let x = 0; x < this.dimension.x; x++) {
            for (let y = 0; y < this.dimension.y; y++) {
                for (let z = 0; z < this.dimension.z; z++) {
                    for (let nx = Math.max(0, x-1); nx <= Math.min(x+1, size - 1); nx++){
                        for (let ny = Math.max(0, y-1); ny <= Math.min(y+1, size - 1); ny++){
                            for (let nz = Math.max(0, z-1); nz <= Math.min(z+1, size - 1); nz++){
                                if (nx != x || ny != y || nz != z) {
                                    this.cells[x][y][z].neighbours.push(this.cells[nx][ny][nz]);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    this.update = function(scene) {
        for (let x = 0; x < this.dimension.x; x++) {
            for (let y = 0; y < this.dimension.y; y++) {
                for (let z = 0; z < this.dimension.z; z++) {
                    this.cells[x][y][z].updateNeighbors();
                    var color = this.cells[x][y][z].aliveNeighbours / this.cells[x][y][z].neighbours.length;
                    this.cells[x][y][z].box.material.emissiveColor = new BABYLON.Color4(color, color, color, 1);
                }
            }
        }
    }
}

window.addEventListener('DOMContentLoaded', function() {
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
    window.addEventListener('resize', function() {
        engine.resize();
    });
});