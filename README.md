> Thie-super-tiny-compiler 学习笔记

[传送门](https://github.com/jamiebuilds/the-super-tiny-compiler)

**Lisp** => **C**

编译器整个工作流程：

1. 词法分析：input => tokenizer => tokens
2. 语法分析：tokens => parser => ast
3. 语义分析：ast => transformer => newAst
4. 生成（目标）代码：newAst => generator => output