import { Injectable } from '@angular/core';

@Injectable()
export class BubbleSort {
  animations = [];

  constructor() {}

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

  swap(arr: number[], i: number, j: number) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}
