/**
 * 生成代码
 * @param {*} node 
 */
const generator = (node) => {
  switch (node.type) {
    // 遍历递归节点body并以换行形式输出
    case 'Program':
      return node.body.map(generator).join('\n')
    // 表达式加分号
    case 'ExpressionStatement':
      return (
        generator(node.expression) + ';' 
      )
    // 函数添加括号及参数以逗号分隔
    case 'CallExpression':
      return (
        generator(node.callee) +
        '(' +
        node.arguments.map(generator).join(', ') +
        ')'
      )

    case 'Identifier':
      return node.name

    case 'NumberLiteral':
      return node.value

    case 'StringLiteral':
      return '"' + node.value + '"'

    default:
      throw new TypeError(node.type)
  }
}

module.exports = generator
