import { Injectable } from '@angular/core';
import { ArraysService } from '../shared/arrays.service';

@Injectable()
export class BubbleSort {
  animations = [];

  constructor(private readonly arraysService: ArraysService) {}

  bubbleSort(array: number[]) {
    for (let i = array.length - 1; i > 0; i--) {
      this.bubbleMain(array, 0, i);
    }
    return this.animations;
  }

  bubbleMain(array: number[], lo: number, hi: number) {
    for (let i = lo; i < hi; i++) {
      if (array[i] > array[i + 1]) {
        let anim = [i, i + 1];
        this.animations.push(anim as never);
        this.swap(array, i, i + 1);
      }
    }
  }

  bubbleSortAnimation() {
    if (this.animations) {
      // have animations
      const timer = setInterval(() => {
        let action = this.animations.shift();
        if (action) {
          let temp = this.arraysService.numbers[action[0]];
          this.arraysService.numbers[action[0]] =
            this.arraysService.numbers[action[1]];
          this.arraysService.numbers[action[1]] = temp;
        } else {
          clearInterval(timer);
        }
      }, 30);
    }
  }

  swap(arr: number[], i: number, j: number) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}
