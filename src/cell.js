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