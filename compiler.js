const tokenizer = require('./tokenizer')
const parser = require('./parser')
const transformer = require('./transformer')
const generator = require('./generator')

const compiler = (input) => {
  const tokens = tokenizer(input)
  const ast = parser(tokens)
  const newAst = transformer(ast)
  const output = generator(newAst)

  return output
}

module.exports = {
  tokenizer,
  parser,
  transformer,
  generator,
  compiler
}
