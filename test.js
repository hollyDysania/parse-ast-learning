const {
  tokenizer,
  parser,
  transformer,
  generator,
  compiler,
} = require('./compiler')
const assert = require('assert')

const input = '(add 2 (subtract 4 2))'
const output = 'add(2, subtract(4, 2));'

const tokens = [
  { type: 'operator', value: '(' },
  { type: 'identifier', value: 'add' },
  { type: 'number', value: '2' },
  { type: 'operator', value: '(' },
  { type: 'identifier', value: 'subtract' },
  { type: 'number', value: '4' },
  { type: 'number', value: '2' },
  { type: 'operator', value: ')' },
  { type: 'operator', value: ')' },
]

const ast = {
  type: 'Program',
  body: [
    {
      type: 'CallExpression',
      name: 'add',
      params: [
        {
          type: 'NumberLiteral',
          value: '2',
        },
        {
          type: 'CallExpression',
          name: 'subtract',
          params: [
            {
              type: 'NumberLiteral',
              value: '4',
            },
            {
              type: 'NumberLiteral',
              value: '2',
            },
          ],
        },
      ],
    },
  ],
}

const newAst = {
  type: 'Program',
  body: [
    {
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: 'add',
        },
        arguments: [
          {
            type: 'NumberLiteral',
            value: '2',
          },
          {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: 'subtract',
            },
            arguments: [
              {
                type: 'NumberLiteral',
                value: '4',
              },
              {
                type: 'NumberLiteral',
                value: '2',
              },
            ],
          },
        ],
      },
    },
  ],
}

// 断言测试
assert.deepStrictEqual(
  tokenizer(input),
  tokens,
  'Tokenizer should turn `input` string into `tokens` array'
)
assert.deepStrictEqual(
  parser(tokens),
  ast,
  'Parser should turn `tokens` array into `ast`'
)
assert.deepStrictEqual(
  transformer(ast),
  newAst,
  'Transformer should turn `ast` into a `newAst`'
)
assert.deepStrictEqual(
  generator(newAst),
  output,
  'Code Generator should turn `newAst` into `output` string'
)
assert.deepStrictEqual(
  compiler(input),
  output,
  'Compiler should turn `input` into `output`'
)

console.log('All Passed!')
