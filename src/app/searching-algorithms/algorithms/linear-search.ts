import { ArrayBars } from '../../models/ArrayBars';
import { ArraysService } from '../../shared/arrays.service';

export class LinearSearch {
  animations: AnimationValues[] = [];

  constructor(private readonly arrService: ArraysService) {}

  // linear searching
  linearSearch(arr: ArrayBars[], target: number) {
    for (let i = 0; i < arr.length; i++) {
      this.animations.push({ selectedIndex: i });
      if (arr[i].value === target) {
        this.animations.push({ selectedIndex: i });
        return i;
      }
    }

    return 0;
  }

  // linear animation
  linearSearchAnimation() {
    this.arrService.sortingAnimationsMax = this.animations.length;
    const timer = setInterval(() => {
      let action = this.animations.shift();
      if (action) {
        this.arrService.numbers[action.selectedIndex!].color =
          this.arrService.$selectedIndex;
      } else {
        clearInterval(timer);
        if (this.arrService.isArraySorted(this.arrService.numbers)) {
          this.arrService.sorting = false;
        }
      }
    }, this.arrService.animationSpeed);
  }
}

interface AnimationValues {
  selectedIndex: number | undefined;
}
