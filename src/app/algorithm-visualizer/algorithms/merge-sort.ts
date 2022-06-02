import { ArraysService } from 'src/app/shared/arrays.service';
import { ArrayBars } from 'src/app/models/ArrayBars';

export class MergeSort {
  animations = []; // Stores array objects => { key, value }

  constructor(private readonly arraysService: ArraysService) {}

  mergeSort(array: ArrayBars[], left: number, right: number): void {
    if (right <= left) {
      return;
    }

    let mid = Math.floor(left + (right - left) / 2);
    this.mergeSort(array, left, mid);
    this.mergeSort(array, mid + 1, right);
    this.merge(array, left, mid, right);
  }

  merge(array: ArrayBars[], left: number, mid: number, right: number): void {
    let aux = [...array];

    let i = left;
    let j = mid + 1;
    for (let k = left; k <= right; k++) {
      if (i > mid) {
        this.animations.push(new animationValues(k, aux[j].value) as never);
        array[k] = aux[j++];
      } else if (j > right) {
        this.animations.push(new animationValues(k, aux[i].value) as never);
        array[k] = aux[i++];
      } else if (aux[i].value > aux[j].value) {
        this.animations.push(new animationValues(k, aux[j].value) as never);
        array[k] = aux[j++];
      } else {
        this.animations.push(new animationValues(k, aux[i].value) as never);
        array[k] = aux[i++];
      }
    }
  }

  mergeSortAnimation(): void {
    let animation = setInterval(() => {
      const action: animationValues = this.animations.shift() as never;
      console.log('animations: ', this.animations);
      if (action) this.arraysService.numbers[action.key].value = action.value;
      else clearInterval(animation);
    }, this.arraysService.ANIMATION_SPEED);
  }
}

class animationValues {
  key: number;
  value: number;

  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
  }
}
