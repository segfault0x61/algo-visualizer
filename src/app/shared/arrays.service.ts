import { Injectable } from '@angular/core';
import { ArrayBars } from '../models/ArrayBars';

@Injectable({
  providedIn: 'root',
})
export class ArraysService {
  public arrayLength: number = 30;
  public animationSpeed: number = 10;

  completedAnimation: any[] = [];
  numbers: ArrayBars[] = [];

  constructor() {}

  resetArray() {
    this.numbers = [];
    for (let i = 0; i < this.arrayLength; i++) {
      let randInt = this.randomInteger(20, 100);
      this.numbers.push({ value: randInt, color: '#09A8A8' });
    }
  }

  randomInteger(min: number, max: number) {
    //https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  isArraySorted(array: ArrayBars[]) {
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i].value > array[i + 1].value) {
        return false;
      }
      this.completedAnimation.push({ index: i });
    }
    this.completedAnimation.push({ index: array.length - 1 }); // Append last index

    return true;
  }

  animateSortedArray() {
    const timer = setInterval(() => {
      const action: animationValues = this.completedAnimation.shift();
      if (action) {
        this.numbers[action.index].color = 'purple';
      } else {
        clearInterval(timer);
      }
    }, this.animationSpeed);
  }
}

interface animationValues {
  index: number;
}
