const program = require('commander')
const helpOptions = () => {
  // 自定义选项
  program.option('-f --framework <framework>','项目框架，例如vue,react')
  program.option('-d --dest <dest>','a destination folder,例如： -d /src/components')
  program.option('-f --framework <framework>','项目框架，例如vue,react')

  // 监听某些命令
  program.on('--help', function () {
    console.log('')
    console.log('other custom help')
  })
}
module.exports = {
  helpOptions
}
