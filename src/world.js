
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
