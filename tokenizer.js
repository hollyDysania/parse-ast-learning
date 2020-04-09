/**
 * 分词器
 * @param {*} input 
 */
const tokenizer = (input) => {
  // 记录位置
  let current = 0

  // 接收分词
  let tokens = []

  while (current < input.length) {
    let char = input[current]
    // ===== 括号场景 - 记录token =====
    if (char === '(') {
      tokens.push({
        type: 'operator',
        value: '(',
      })

      // 跳过
      current++

      continue
    }

    if (char === ')') {
      tokens.push({
        type: 'operator',
        value: ')',
      })

      // 跳过
      current++

      continue
    }

    // ===== 空格场景 - 忽略 =====
    const WHITE_SPACE = /\s/
    if (WHITE_SPACE.test(char)) {
      // 跳过空格
      current++

      continue
    }

    // ==== 数字场景 - 考虑连续数字并记录 ====
    const NUMBERS = /[0-9]/
    if (NUMBERS.test(char)) {
      // 需要考虑连续数字的情况
      let value = ''

      while (NUMBERS.test(char)) {
        value += char
        char = input[++current]
      }

      tokens.push({
        type: 'number',
        value,
      })

      continue
    }

    // ==== 引号场景 - 考虑连续字符串并记录 ====
    if (char === '"') {
      let value = ''

      // 跳过第一个双引号
      char = input[++current]

      while (char !== '"') {
        // 累加非闭合引号内的内容
        value += char
        char = inpu[++current]
      }

      // 跳过闭合引号
      char = input[++current]

      tokens.push({
        type: 'string',
        value,
      })

      continue
    }

    // ==== 变量场景 - 考虑连续字母并记录 ====
    const LETTERS = /[A-Za-z]/i
    if (LETTERS.test(char)) {
      let value = ''

      while (LETTERS.test(char)) {
        value += char
        char = input[++current]
      }

      tokens.push({
        type: 'identifier',
        value,
      })

      continue
    }

    // 其他情况抛异常

    throw new TypeError('I dont know what this character is: ' + char)
  }

  return tokens
}

module.exports = tokenizer