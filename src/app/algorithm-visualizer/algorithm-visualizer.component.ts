import { Component, OnInit } from '@angular/core';
import { MergeSort } from './algorithms/merge-sort';
import { BubbleSort } from './algorithms/bubble-sort';
import { ArraysService } from '../shared/arrays.service';

@Component({
  selector: 'app-algorithm-visualizer',
  templateUrl: './algorithm-visualizer.component.html',
  styleUrls: ['./algorithm-visualizer.component.scss'],
})
export class AlgorithmVisualizerComponent implements OnInit {
  constructor(public arrService: ArraysService) {}

  ngOnInit(): void {
    this.arrService.resetArray();
  }

  resetArray() {
    this.arrService.resetArray();
  }

  setBarColors(color: string) {
    return color;
  }

  bubbleSort() {
    const bs = new BubbleSort(this.arrService);
    const inputCopy = [...this.arrService.numbers];
    bs.bubbleSort(inputCopy);
    bs.bubbleSortAnimation();
  }

  mergeSort() {
    const ms: MergeSort = new MergeSort(this.arrService);
    let numbersCopy = [...this.arrService.numbers];

    ms.mergeSort(numbersCopy, 0, numbersCopy.length - 1);
    ms.mergeSortAnimation();
  }
}
