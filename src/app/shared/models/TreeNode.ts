export class TreeNode {
  data: number;
  left: TreeNode | null;
  right: TreeNode | null;
  xAxis: number | null;
  yAxis: number | null;

  constructor(data: number) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.xAxis = null;
    this.yAxis = null;
  }
}
