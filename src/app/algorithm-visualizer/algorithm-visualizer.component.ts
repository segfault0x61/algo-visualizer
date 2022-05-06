import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-algorithm-visualizer',
  templateUrl: './algorithm-visualizer.component.html',
  styleUrls: ['./algorithm-visualizer.component.scss'],
})
export class AlgorithmVisualizerComponent implements OnInit {
  numbers: number[];

  constructor() {
    this.numbers = [];
  }

  ngOnInit(): void {
    this.resetArray();
  }

  resetArray() {
    this.numbers = [];
    for (let i = 0; i < 100; i++) {
      this.numbers.push(this.randomInteger(5, 700));
    }
  }

  randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
