import { StandardMaterial, MeshBuilder } from "@babylonjs/core";
import { Color4 } from "@babylonjs/core"
// import { MeshBuilder } from "@babylonjs/core";

class Cell {
  constructor(scene, position) {
    this.neighbours = [];
    this.aliveNeighbours = 0;
    this.isAlive = false;
    this.box = MeshBuilder.CreateBox('box', { size: 1, updatable: true }, scene);
    this.box.position = position;
    var mat = new StandardMaterial("material", scene);
    mat.emissiveColor = new Color4(Math.random(), Math.random(), Math.random(), 1);
    this.box.material = mat;
    this.isAlive = Math.random() <= 0.2;
    this.box.setEnabled(this.isAlive);
  }

  addNeighbor(cell) {
    this.neighbours.push(cell);
  }

  updateNeighbors() {
    this.aliveNeighbours = 0;
    for (var n in this.neighbours) {
      if (this.neighbours[n].isAlive) {
        this.aliveNeighbours++;
      }
    }
    if (this.isAlive) {
      // 2 || 3
      if (this.aliveNeighbours < 4 || this.aliveNeighbours > 6) {
        this.isAlive = false;
      }
    } else {
      // 3
      if (this.aliveNeighbours === 6) {
        this.isAlive = true;
      }
    }
    var shade = this.aliveNeighbours / this.neighbours.length
    this.box.material.emissiveColor = new Color4(shade, shade, shade, 1);
    this.box.setEnabled(this.isAlive);
  }
}

export { Cell };