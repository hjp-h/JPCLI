// 执行终端命令相关代码  例如 npm install
// 终端代码的运行都需要开启子进程
const { spawn } = require('child_process')

const commandSpawn = (...args) => {
  return new Promise(resolve => {
    const childProcess = spawn(...args)
    // 打印项目的输出信息
    childProcess.stdout.pipe(process.stdout)
    // 错误信息
    childProcess.stderr.pipe(process.stderr)
    childProcess.on('close',() => resolve())
  })
}

module.exports = {
  commandSpawn
}
