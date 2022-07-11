import { Injectable } from '@angular/core';
import { ArrayBars } from '../models/ArrayBars';

@Injectable({
  providedIn: 'root',
})
export class ArraysService {
  public arrayLength: number = 10;
  public animationSpeed: number = 0;
  public barWidth: number = 32;

  sortingAnimationsMax!: number; // max animations left
  sortingAnimationsLeft!: number;
  sorting: boolean = false;
  isSorted: boolean = false;
  isPaused: boolean = false;
  numbers: ArrayBars[] = [];

  $primaryBars: string = '#0F5257';
  $selectedIndex: string = 'red';
  $swappedIndex: string = 'green';
  $finishedBars: string = '#9C92A3';

  completedAnimation: animationValues[] = []; // Iterating the array once last time, to show it is completed

  constructor() {}

  resetArray(): void {
    this.numbers = [];
    for (let i = 0; i < this.arrayLength; i++) {
      const randInt = this.randomInteger(20, 200);
      this.numbers.push({
        value: randInt,
        color: this.$primaryBars,
        width: this.barWidth,
      });
    }

    this.sortingAnimationsMax = this.sortingAnimationsLeft =
      this.numbers.length;
    this.isSorted = this.sorting = false;
  }

  randomInteger(min: number, max: number): number {
    //https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  swap(arr: ArrayBars[], left: number, right: number): void {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
  }

  sortArray() {
    this.numbers.sort((a, b) => a.value - b.value);
  }

  isArraySorted(array: ArrayBars[]): boolean {
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i].value > array[i + 1].value) {
        return false;
      }
      this.completedAnimation.push({ index: i });
    }
    this.completedAnimation.push({ index: array.length - 1 }); // Append last index
    this.isSorted = true;
    return true;
  }

  animateSortedArray(): void {
    const timer = setInterval(() => {
      const action: animationValues = this.completedAnimation.shift()!;
      if (action) {
        this.numbers[action.index].color = this.$finishedBars;
      } else {
        clearInterval(timer);
      }
    }, 20);
  }

  setBarWidth(): number {
    const arrSize = this.arrayLength;
    if (arrSize < 20) return (this.barWidth = 32);
    if (arrSize >= 20 && arrSize < 30) return (this.barWidth = 22);
    if (arrSize >= 30 && arrSize < 40) return (this.barWidth = 18);
    if (arrSize >= 40 && arrSize < 50) return (this.barWidth = 16);
    if (arrSize >= 50 && arrSize < 60) return (this.barWidth = 12);
    if (arrSize >= 60 && arrSize < 70) return (this.barWidth = 10);
    if (arrSize >= 70 && arrSize < 80) return (this.barWidth = 8);
    if (arrSize >= 80 && arrSize < 90) return (this.barWidth = 6);
    if (arrSize >= 90 && arrSize < 120) return (this.barWidth = 5);
    if (arrSize >= 120 && arrSize < 150) return (this.barWidth = 4);
    if (arrSize >= 150 && arrSize < 180) return (this.barWidth = 3);
    if (arrSize >= 190) return (this.barWidth = 2);

    return arrSize;
  }

  formatLabel(value: number): string {
    value /= 1000;
    if (value.toString().length > 1)
      return value.toString().substring(0, 4) + 's';
    return value + 's';
  }
}

interface animationValues {
  index: number;
}
