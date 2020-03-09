import { StandardMaterial, MeshBuilder } from "@babylonjs/core";
import { Color4 } from "@babylonjs/core"
// import { MeshBuilder } from "@babylonjs/core";

class Cell {
    constructor(scene, position) {
        console.log(position);
        this.neighbours = [];
        this.aliveNeighbours = 0;
        this.isAlive = false;
        this.box = MeshBuilder.CreateBox('box', { size: 1, updatable: true }, scene);
        this.box.position = position;
        var mat = new StandardMaterial("material", scene);
        mat.emissiveColor = new Color4(Math.random(), Math.random(), Math.random(), 1);
        // this.box.material = mat;
        this.isAlive = Math.random() <= 0.3;
        // this.box.setEnabled(this.isAlive);
    }

    updateNeighbors() {
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
            if (this.aliveNeighbours === 3) {
                this.isAlive = true;
            }
        }
        this.box.setEnabled(this.isAlive);
    }
}

export { Cell };