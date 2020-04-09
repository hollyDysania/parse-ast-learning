/**
 * 遍历器
 * @param {*} ast 语法树
 * @param {*} visitor 根据类型提供的方法
 */
const traverser = (ast, visitor) => {
  // ast父节点为null
  traverseNode(ast, null)

  /**
   * @param {*} node 当前节点
   * @param {*} parent 父节点
   */
  function traverseNode(node, parent) {
    // 根据节点类型拿到方法
    let methods = visitor[node.type]

    if (methods && methods.enter) {
      // 执行
      methods.enter(node, parent)
    }

    switch (node.type) {
      // 程序body数组 需遍历
      case 'Program':
        traverseArray(node.body, node)
        break
      // 调用表达式params为数组 需遍历
      case 'CallExpression':
        traverseArray(node.params, node)
        break
      // 数字及字符串无需遍历调用
      case 'NumberLiteral':
      case 'StringLiteral':
        break
      default:
        throw new TypeError(node.type)
    }

    function traverseArray(array, parent) {
      array.forEach((child) => {
        traverseNode(child, parent)
      })
    }

    if (methods && methods.exit) {
      methods.exit(node, parent)
    }
  }
}

module.exports = traverser