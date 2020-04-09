const traverser = require('./traverser')

/**
 * 语义分析器 结合遍历器转化完善ast
 * @param {*} ast
 */
const transformer = (ast) => {
  let newAst = {
    type: 'Program',
    body: []
  }

  ast._context = newAst.body

  const visitor = {
    NumberLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: 'NumberLiteral',
          value: node.value
        })
      }
    },

    StringLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: 'StringLiteral',
          value: node.value
        })
      }
    },
    // 调用表达式
    CallExpression: {
      enter(node, parent) {
        let expression = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: node.name
          },
          arguments: []
        }

        node._context = expression.arguments

        if(parent.type !== 'CallExpression') {
          // 表达式语句
          expression = {
            type: 'ExpressionStatement',
            expression: expression,
          }
        }

        parent._context.push(expression)
      }
    }
  }
  traverser(ast, visitor)

  return newAst
}

module.exports = transformer
