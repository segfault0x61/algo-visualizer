import { Injectable } from '@angular/core';
import { TreeNode } from './models/TreeNode';

@Injectable({
  providedIn: 'root',
})
export class BinaryTreeService {
  amount: number = 10;
  preOrderArray: number[] = [];

  constructor() {
    let root: TreeNode | null = null;
    const res = [1, null, 2, 3, 4, 5, 6, 7];

    while (this.amount-- > 0 && res.length) {
      root = this.insert(root!, res.shift()!);
    }

    console.log(root);
    this.preOrderTraversal(root!);
  }

  insert(root: TreeNode, data: number): TreeNode {
    if (root === null) {
      return new TreeNode(data);
    }

    if (data <= root.data) {
      root.left = this.insert(root.left!, data);
    } else {
      root.right = this.insert(root.right!, data);
    }

    return root;
  }

  preOrderTraversal(root: TreeNode) {
    this.dfs(root);
    return this.preOrderArray;
  }

  dfs(root: TreeNode) {
    if (root === null) {
      return;
    }

    this.preOrderArray.push(root.data);
    this.dfs(root.left!);
    this.dfs(root.right!);
  }
}
