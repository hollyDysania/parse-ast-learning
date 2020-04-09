/**
 * 解析器（语法分析初步生成ast）
 * @param {*} tokens
 */
const parser = (tokens) => {
  // 记录位置
  let current = 0

  // 声明语法树
  let ast = {
    type: 'Program',
    body: [],
  }

  // ast.body记录语法树
  while (current < tokens.length) {
    ast.body.push(walk())
  }

  function walk() {
    let token = tokens[current]

    // 数字
    if (token.type === 'number') {
      current++

      return {
        type: 'NumberLiteral',
        value: token.value,
      }
    }

    // 字符串
    if (token.type === 'string') {
      current++

      return {
        type: 'StringLiteral',
        value: token.value,
      }
    }

    // 括号处理
    if (token.type === 'operator' && token.value === '(') {
      // 跳过括号
      token = tokens[++current]

      // 括号为调用表达式
      let node = {
        type: 'CallExpression',
        name: token.value,
        params: [],
      }

      // 跳过方法名
      token = tokens[++current]

      // 遍历括号内（参数）
      while (
        token.type !== 'operator' ||
        (token.type === 'operator' && token.value !== ')')
      ) {
        // 记录改节点参数 (参数存在调用表达式此处递归)
        node.params.push(walk())
        token = tokens[current]
      }

      current++

      return node
    }

    throw new TypeError(token.type)
  }

  return ast
}
module.exports = parser
