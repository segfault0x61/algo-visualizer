import { Component, OnInit } from '@angular/core';
import { MergeSort } from './algorithms/merge-sort';
import { BubbleSort } from './algorithms/bubble-sort';
import { ArraysService } from './shared/arrays.service';

@Component({
  selector: 'app-algorithm-visualizer',
  templateUrl: './algorithm-visualizer.component.html',
  styleUrls: ['./algorithm-visualizer.component.scss'],
})
export class AlgorithmVisualizerComponent implements OnInit {
  constructor(public readonly arraysService: ArraysService) {}

  ngOnInit(): void {
    this.arraysService.resetArray();
  }

  resetArray() {
    this.arraysService.resetArray();
  }

  setBarColors() {
    if (this.arraysService.getIsArraySorted()) {
      return 'purple';
    }
    return 'rgb(9, 168, 168)';
  }

  bubbleSort() {
    const bs = new BubbleSort(this.arraysService);
    const inputCopy = [...this.arraysService.numbers];
    bs.bubbleSort(inputCopy);
    bs.bubbleSortAnimation();
  }

  mergeSort() {
    const ms: MergeSort = new MergeSort(this.arraysService);
    let numbersCopy = [...this.arraysService.numbers];
    //Auxiliary array used in merge sort.
    let auxiliaryArray = [];

    ms.mergeSort(numbersCopy, 0, numbersCopy.length - 1);

    console.log(numbersCopy);

    console.log('start animation..');
    ms.animateMergeSort();
    // this.arraysService.numbers = [...inputCopy];
  }
}
