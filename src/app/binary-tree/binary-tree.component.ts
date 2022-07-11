import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TreeNode } from '../shared/models/TreeNode';

@Component({
  selector: 'app-binary-tree',
  templateUrl: './binary-tree.component.html',
  styleUrls: ['./binary-tree.component.scss'],
})
export class BinaryTreeComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;
  // The HTMLCanvasElement.getContext() method returns a drawing context on the canvas,
  // or null if the context identifier is not supported, or the canvas has already been set to a different context mode.
  // Later calls to this method on the same canvas element, with the same contextType argument,
  // will always return the same drawing context instance as was returned the first time the method was invoked.
  // It is not possible to get a different drawing context object on a given canvas element.

  private ctx!: CanvasRenderingContext2D;

  hello = 'Hello World!';
  nodes: TreeNode[] = [];
  arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  preOrderArr = [];

  constructor() {}

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext(
      '2d'
    ) as CanvasRenderingContext2D;
    // this.ctx.fillStyle = 'yellow';
    // this.ctx.fillRect(0, 0, 1000, 400);

    // for (let i = 0; i < 10; i++) {
    //   this.ctx.fillStyle = 'red';
    //   this.ctx.beginPath();
    //   this.ctx.arc((100 * i) % 1000, 100, 30, 0, 90); //CanvasPath.arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean)
    //   this.ctx.stroke();
    //   this.ctx.font = '30px Arial';
    //   this.ctx.fillText('4', (97 * i) % 1000, 110);
    // }

    let root = this.sortedArrayToBinaryTree(0, this.arr.length - 1);
    this.preOrder(root);

    this.displayNodes();
  }

  preOrder(root: TreeNode | null) {
    if (root == null) {
      return;
    }
    this.preOrderArr.push(root.data as never);
    this.preOrder(root.left);
    this.preOrder(root.right);
  }

  sortedArrayToBinaryTree(start: number, end: number): TreeNode | null {
    if (start > end) {
      return null;
    }

    let mid = Math.floor((start + end) / 2);
    let newNode = new TreeNode(this.arr[mid]);
    newNode.xAxis = 300;
    newNode.yAxis = 300;

    newNode.left = this.sortedArrayToBinaryTree(start, mid - 1);
    if (newNode.left != null) {
      newNode.left.xAxis = newNode.xAxis - 50;
      newNode.left.yAxis = newNode.yAxis + 50;
    }

    newNode.right = this.sortedArrayToBinaryTree(mid + 1, end);
    if (newNode.right != null) {
      newNode.right.xAxis = newNode.xAxis + 50;
      newNode.right.yAxis = newNode.yAxis + 50;
    }

    this.nodes.push(newNode);

    return newNode;
  }

  displayNodes() {
    for (let i = 0; i < this.nodes.length; i++) {
      this.ctx.beginPath();
      this.ctx.arc(this.nodes[i].xAxis!, this.nodes[i].yAxis!, 30, 0, 90); //CanvasPath.arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean)
      this.ctx.stroke();
      this.ctx.font = '30px Arial';
      this.ctx.fillText('4', this.nodes[i].xAxis!, this.nodes[i].yAxis!);
    }
  }
}
