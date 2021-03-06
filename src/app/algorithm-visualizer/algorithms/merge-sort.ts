import { ArraysService } from 'src/app/shared/arrays.service';
import { ArrayBars } from 'src/app/models/ArrayBars';

export class MergeSort {
  animations: animationValues[] = []; // Stores array objects => { key, value }

  constructor(private readonly arrService: ArraysService) {}

  mergeSort(array: ArrayBars[], left: number, right: number): void {
    if (right <= left) {
      return;
    }

    let mid = Math.floor((left + right) / 2);
    this.mergeSort(array, left, mid); // Sort left side of the array, 0 to mid
    this.mergeSort(array, mid + 1, right); // mid to end
    this.merge(array, left, mid, right);
  }

  merge(array: ArrayBars[], left: number, mid: number, right: number): void {
    let aux: ArrayBars[] = [...array];
    let midIndex = mid + 1;
    let leftIndex = left;

    for (let k = leftIndex; k <= right; k++) {
      this.animations.push({ index: k, outerIndex: null, value: null });

      if (leftIndex > mid) {
        if (k !== midIndex)
          this.animations.push({
            index: k,
            outerIndex: midIndex,
            value: aux[midIndex],
          });
        array[k] = aux[midIndex++];
      } else if (midIndex > right) {
        if (k !== leftIndex)
          this.animations.push({
            index: k,
            outerIndex: leftIndex,
            value: aux[leftIndex],
          });
        array[k] = aux[leftIndex++];
      } else if (aux[leftIndex].value > aux[midIndex].value) {
        if (k !== midIndex)
          this.animations.push({
            index: k,
            outerIndex: midIndex,
            value: aux[midIndex],
          });
        array[k] = aux[midIndex++];
      } else {
        if (k !== leftIndex)
          this.animations.push({
            index: k,
            outerIndex: leftIndex,
            value: aux[leftIndex],
          });
        array[k] = aux[leftIndex++];
      }
    }
  }

  mergeSortAnimation(): void {
    this.arrService.sortingAnimationsMax = this.animations.length;
    let timer = setInterval(() => {
      const action: animationValues = this.animations.shift()!;
      this.arrService.sortingAnimationsLeft = this.animations.length;
      if (action) {
        this.arrService.numbers.map(
          (num) => (num.color = this.arrService.$primaryBars)
        );
        if (action.outerIndex == null) {
          this.arrService.numbers[action.index].color =
            this.arrService.$selectedIndex;
        } else {
          this.arrService.numbers[action.index].color =
            this.arrService.$swappedIndex;
          this.arrService.numbers[action.outerIndex].color =
            this.arrService.$swappedIndex;
          this.arrService.numbers[action.index] = action.value!;
        }
      } else {
        clearInterval(timer);
        if (this.arrService.isArraySorted(this.arrService.numbers)) {
          this.arrService.animateSortedArray();
          this.arrService.sorting = false;
        }
      }
    }, this.arrService.animationSpeed);
  }
}

interface animationValues {
  index: number;
  outerIndex: number | null;
  value: ArrayBars | null;
}
