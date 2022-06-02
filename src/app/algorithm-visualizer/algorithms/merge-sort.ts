import { Injectable } from '@angular/core';

@Injectable()
export class MergeSort {
  private temp: number[] = [];

  constructor() {}

  public sort(array: number[]): void {
    if (array !== undefined) {
      this.mergeSort(array, this.temp, 0, array.length - 1);
    }
  }

  /**
   * Recursively sorts and calls merge.
   *
   * @param array The array to be sorted.
   * @param temp The temporary array.
   * @param left The left index of the array.
   * @param right The right index of the array.
   */
  public mergeSort(
    array: number[],
    temp: number[],
    left: number,
    right: number
  ): void {
    if (left < right) {
      let center: number = Math.floor((left + right) / 2);
      this.mergeSort(array, temp, left, center);
      this.mergeSort(array, temp, center + 1, right);
      this.merge(array, temp, left, center + 1, right);
    }
  }

  /**
   * This method contains the logic to implement the merge step.
   *
   * @param array The array to be sorted.
   * @param temp The temporary array.
   * @param left The left index of the array.
   * @param right The right index of the array.
   * @param rightEnd The right most index of the array.
   */
  public merge(
    array: number[],
    temp: number[],
    left: number,
    right: number,
    rightEnd: number
  ) {
    let leftEnd: number = right - 1;
    let k: number = left;
    let num: number = rightEnd - left + 1;

    while (left <= leftEnd && right <= rightEnd) {
      if (array[left] <= array[right]) {
        temp[k++] = array[left++];
      } else {
        temp[k++] = array[right++];
      }
    }

    while (left <= leftEnd) {
      temp[k++] = array[left++];
    }

    while (right <= rightEnd) {
      temp[k++] = array[right++];
    }

    for (let i: number = 0; i < temp.length; i++, rightEnd--) {
      array[rightEnd] = temp[rightEnd];
    }
  }
}
