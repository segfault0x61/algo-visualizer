import { ArraysService } from 'src/app/shared/arrays.service';
import { ArrayBars } from 'src/app/models/ArrayBars';
export class BubbleSort {
  animations: animationValues[] = [];

  constructor(private readonly arrService: ArraysService) {}

  bubbleSort(array: ArrayBars[]): void {
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        this.animations.push({ leftIndex: null, rightIndex: null, index: j });
        if (array[j].value > array[j + 1].value) {
          this.animations.push({
            leftIndex: j,
            rightIndex: j + 1,
            index: null,
          });
          this.arrService.swap(array, j, j + 1);
        }
      }
    }
  }

  bubbleSortAnimation(): void {
    this.arrService.sortingAnimationsMax = this.animations.length;
    const timer = setInterval(() => {
      const action: animationValues = this.animations.shift()!;
      this.arrService.sortingAnimationsLeft = this.animations.length;
      if (action) {
        this.arrService.numbers.map(
          (num) => (num.color = this.arrService.$primaryBars)
        );

        if (action.index != null) {
          this.arrService.numbers[action.index].color =
            this.arrService.$selectedIndex;
        } else {
          this.arrService.numbers[action.leftIndex!].color =
            this.arrService.$swappedIndex;
          this.arrService.numbers[action.rightIndex!].color =
            this.arrService.$swappedIndex;
          this.arrService.swap(
            this.arrService.numbers,
            action.leftIndex!,
            action.rightIndex!
          );
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
  leftIndex: number | null;
  rightIndex: number | null;
  index: number | null;
}
