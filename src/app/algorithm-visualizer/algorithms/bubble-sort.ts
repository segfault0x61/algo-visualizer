import { Injectable } from '@angular/core';
import { ArrayBars } from '../../models/ArrayBars';
import { ArraysService } from '../../shared/arrays.service';

@Injectable()
export class BubbleSort {
  animations = [];

  constructor(private readonly arrService: ArraysService) {}

  bubbleSort(array: ArrayBars[]) {
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j].value > array[j + 1].value) {
          this.animations.push([j, j + 1] as never);
          this.swap(array, j, j + 1);
        }
      }
    }
  }

  bubbleSortAnimation() {
    const timer = setInterval(() => {
      let action = this.animations.shift();
      if (action) {
        let temp = this.arrService.numbers[action[0]];
        this.arrService.numbers[action[0]] = this.arrService.numbers[action[1]];
        this.arrService.numbers[action[1]] = temp;
      } else {
        clearInterval(timer);
        this.arrService.isArraySorted(this.arrService.numbers);
        this.arrService.animateSortedArray();
      }
    }, this.arrService.animationSpeed);
  }

  swap(arr: ArrayBars[], i: number, j: number) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}
