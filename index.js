#!/usr/bin/env node
// 配置环境 找到node环境
const program = require('commander')
const helpOpt = require('./lib/core/help')
const createCommands = require('./lib/core/create')

// 显示当前的版本
program.version(require('./package.json').version)
// 帮助和可选信息
helpOpt.helpOptions()
createCommands()


// 根据指令显示不同的操作 process.argv是命令行的参数
program.parse(process.argv)

console.log('dest',program.opts().dest)

