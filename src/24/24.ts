type BinaryTree =
  | { value: string; left?: BinaryTree; right?: BinaryTree }
  | undefined;

export function isTreesSynchronized(
  tree1: BinaryTree,
  tree2: BinaryTree,
): [boolean, string] {
  const isMirror = (node1: BinaryTree, node2: BinaryTree): boolean => {
    if (!node1 && !node2) return true;
    if (!node1 || !node2) return false;
    if (node1.value !== node2.value) return false;

    return (
      isMirror(node1.left, node2.right) && isMirror(node1.right, node2.left)
    );
  };

  const star = tree1?.value ?? '';

  return [isMirror(tree1, tree2), star];
}
