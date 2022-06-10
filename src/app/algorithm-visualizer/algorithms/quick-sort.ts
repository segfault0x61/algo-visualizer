import { ArrayBars } from '../../models/ArrayBars';
import { ArraysService } from '../../shared/arrays.service';

export class QuickSort {
  animations: animationValues[] = [];

  constructor(private readonly arrService: ArraysService) {}

  quickSort(arr: ArrayBars[]): void {
    /* 
    Edge case: If the array is already sorted, then we do not need to perform quicksort.
    The reason this check is needed, is because quicksort will still be performed
    on the sorted array, thus making the time complexity o(N^2), but by performing 
    a simple o(N) check condition, we can then get the average case: o(n log(n))
    */
    if (this.arrService.isArraySorted(arr)) {
      return;
    } else {
      this.sort(arr, 0, arr.length - 1);
    }
  }

  sort(arr: ArrayBars[], left: number, right: number): void {
    if (left < right) {
      // partitioning index
      let pi = this.partition(arr, left, right);

      // recursively sort elements before/after partition
      this.sort(arr, left, pi - 1);
      this.sort(arr, pi + 1, right);
    }
  }

  partition(arr: ArrayBars[], left: number, right: number): number {
    const pivotValue = arr[right].value; // pivot set to last element
    let low = left - 1; // left/low index

    for (let i = left; i < right; i++) {
      if (arr[i].value < pivotValue) {
        low++;
        this.animations.push({
          leftIndex: low,
          index: i,
          pivot: right,
        } as never);
        this.arrService.swap(arr, low, i);
      }
    }

    this.animations.push({
      leftIndex: low + 1,
      index: right,
      pivot: right,
    } as never);
    this.arrService.swap(arr, low + 1, right);

    return low + 1;
  }

  quickSortAnimation(): void {
    const timer = setInterval(() => {
      const action: animationValues = this.animations.shift()!;
      console.log(action);

      if (action) {
        // pivot
        this.arrService.numbers.map((num) => (num.color = '#09A8A8'));
        this.arrService.numbers[action.pivot].color = 'red';

        // swap
        this.arrService.swap(
          this.arrService.numbers,
          action.leftIndex,
          action.index
        );
      } else {
        clearInterval(timer);

        if (this.arrService.isArraySorted(this.arrService.numbers))
          this.arrService.animateSortedArray();
      }
    }, this.arrService.animationSpeed);
  }
}

interface animationValues {
  leftIndex: number;
  index: number;
  pivot: number;
}
