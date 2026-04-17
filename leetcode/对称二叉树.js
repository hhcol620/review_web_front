// ============ 节点定义 ============
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }
}

// ============ 构造二叉树 ============

// 对称二叉树：
//        1
//       / \
//      2   2
//     / \ / \
//    3  4 4  3
const symmetricTree = new TreeNode(1,
  new TreeNode(2,
    new TreeNode(3),
    new TreeNode(4)
  ),
  new TreeNode(2,
    new TreeNode(4),
    new TreeNode(3)
  )
)

// 不对称二叉树：
//        1
//       / \
//      2   2
//       \   \
//        3   3
const asymmetricTree = new TreeNode(1,
  new TreeNode(2,
    null,
    new TreeNode(3)
  ),
  new TreeNode(2,
    null,
    new TreeNode(3)
  )
)

// ============ 方法一：递归 ============
// 思路：对称树的左子树和右子树互为镜像
// 镜像条件：左节点值 === 右节点值，且左的左 === 右的右，左的右 === 右的左
function isSymmetric(root) {
  if (!root) return true

  function isMirror(left, right) {
    if (!left && !right) return true   // 都为空，对称
    if (!left || !right) return false  // 一个为空，不对称
    return (
      left.val === right.val &&
      isMirror(left.left, right.right) &&  // 外侧
      isMirror(left.right, right.left)     // 内侧
    )
  }

  return isMirror(root.left, root.right)
}

// ============ 方法二：迭代（队列） ============
// 思路：每次取出两个节点比较，再把它们的子节点按镜像顺序入队
function isSymmetricIterative(root) {
  if (!root) return true

  const queue = [root.left, root.right]

  while (queue.length) {
    const left = queue.shift()
    const right = queue.shift()

    if (!left && !right) continue      // 都空，继续
    if (!left || !right) return false  // 一个空，不对称
    if (left.val !== right.val) return false

    // 外侧入队
    queue.push(left.left, right.right)
    // 内侧入队
    queue.push(left.right, right.left)
  }

  return true
}

// ============ 验证 ============
console.log('--- 递归 ---')
console.log('对称树:', isSymmetric(symmetricTree))    // true
console.log('不对称树:', isSymmetric(asymmetricTree)) // false

console.log('--- 迭代 ---')
console.log('对称树:', isSymmetricIterative(symmetricTree))    // true
console.log('不对称树:', isSymmetricIterative(asymmetricTree)) // false
