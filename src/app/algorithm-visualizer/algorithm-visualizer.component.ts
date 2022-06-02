import { Component, OnInit } from '@angular/core';
import { BubbleSort } from './algorithms/bubble-sort';
import { MergeSort } from './algorithms/merge-sort';

@Component({
  selector: 'app-algorithm-visualizer',
  templateUrl: './algorithm-visualizer.component.html',
  styleUrls: ['./algorithm-visualizer.component.scss'],
})
export class AlgorithmVisualizerComponent implements OnInit {
  numbers: number[];
  unsortedNumbers: number[];
  outerValue: number;
  innerValue: number;
  swapped: boolean;

  constructor() {
    this.numbers = [];
    this.unsortedNumbers = [];
    this.outerValue = 0;
    this.innerValue = 0;
    this.swapped = false;
  }

  ngOnInit(): void {
    this.resetArray();
  }

  setBarColors(value: number) {
    if (this.isArraySorted()) {
      return 'purple';
    }
    if (this.swapped) {
      if (value == this.outerValue || value == this.innerValue) {
        return 'pink';
      }
    }
    if (value == this.outerValue) {
      return 'red';
    }
    if (value == this.innerValue) {
      return 'green';
    }

    return 'unknown';
  }

  isArraySorted() {
    this.unsortedNumbers.sort((a, b) => a - b);
    for (let i = 0; i < this.unsortedNumbers.length; i++) {
      if (this.unsortedNumbers[i] !== this.numbers[i]) return false;
    }
    return true;
  }

  resetArray() {
    this.numbers = [];
    this.unsortedNumbers = [];
    for (let i = 0; i < 3; i++) {
      let randInt = this.randomInteger(15, 200);
      this.numbers.push(randInt);
      this.unsortedNumbers.push(randInt);
    }
  }

  randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  bubbleSort() {
    let bubbleSort: BubbleSort = new BubbleSort();
    bubbleSort.bubbleSort(this.numbers);
    console.log('sorted: ', this.numbers);
  }

  mergeSort() {
    let mergeSort: MergeSort = new MergeSort();
    mergeSort.sort(this.numbers);
    console.log('sorted: ', this.numbers);
  }
}
