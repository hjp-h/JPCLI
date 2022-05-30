const program = require('commander')
const { createProjectAction,addComponentAction,addPageAction,addStoreAction } = require('./actions')
// 创建可执行指令 program.command
const createCommands = () => {
  // action里是回调函数 传入命令中的参数
  program
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    .action(createProjectAction)
  
  program
    .command('addcpn <name>')
    .description('add vue component,例如：jp addcpn HelloWorld [-d src/components]')
    .action(name => {
      addComponentAction(name,program.opts().dest || 'src/components')
    })
  
  program
    .command('addpage <name>')
    .description('add vue page,例如：jp addpage Home [-d src/Home]')
    .action(name => {
      addPageAction(name,program.opts().dest || 'src/pages')
    })
  
  program
    .command('addstore <name>')
    .description('add vuex store,例如：jp addStore Home [-d src/Home]')
    .action(name => {
      addStoreAction(name,program.opts().dest || 'src/store/modules')
    })
}
module.exports = createCommands
