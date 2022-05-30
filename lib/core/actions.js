const { promisify } = require('util')
const path = require('path')

const downloadGit = promisify(require('download-git-repo'))
const open = require('open')

const { VUE_REPO } = require('../config/repo-config')
const { commandSpawn } = require('../utils/termiinal')
const { compile,writeToFile,makeFileSync } = require('../utils/utils')
// download-git-repo 返回的是一个函数 但是它返回的结果是在回调函数中
// 那么这种就可能导致回调地狱  用promisify来解决 支持使用promise的方式
const createProjectAction = async (project) => {
  console.log(`jp helps you create project ${project}`)
  // 1.clone项目到本地
  await downloadGit(VUE_REPO,project,{clone:true})
  // 2.npm install
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command,['install'],{cwd:`./${project}`})
  // 3.npm run serve
  // 这里不需要await 因为npm run serve 的时候该子进程不会结束 只有control c才结束
  // 使用await 的话后面代码永远不会执行
  commandSpawn(command,['run','serve'],{cwd:`./${project}`})
  // 4.打开浏览器（一般由项目的webpack来配置）
  open('http://localhost:8080')
}
const addComponentAction = async (name, dest) => {
  console.log('destAct',dest)
  // 1.编译ejs模板
  const result = await compile('vue-component.ejs',{name,lowerName:name.toLowerCase()})
  // 2.将编译好的模板写入最终的文件目录
  try {
    const targetPath = path.resolve(dest, `${name}.vue`)
    console.log('targetPath',targetPath)
    writeToFile(targetPath,result)
  } catch (e) {
    console.log(e)
  }
}

const addPageAction = async (name, dest) => {
  try {
    // 1.编译vue模板和router模板
    const data = { name, lowerName: name.toLowerCase() }
    const [vueCptResut, routerResult] = await Promise.all([compile('vue-component.ejs', data), compile('vue-router.ejs', data)])
    // const vueCptResut = await compile('vue-component.ejs', data)
    // const routerResult = await compile('vue-router.ejs', data)
    
    // 2.将文件写入到对应的文件夹 文件夹不存在时需要创建
    // 自动创建与文件名同名的文件夹
    dest = path.resolve(dest,name.toLowerCase())
    if (makeFileSync(dest)) {
      const targetPagePath = path.resolve(dest, `${name}.vue`)
      const targetRouterPath = path.resolve(dest, `router.js`)
      writeToFile(targetPagePath, vueCptResut)
      writeToFile(targetRouterPath,routerResult)
    }
  } catch(e) {
    console.log(e)
  }
}

const addStoreAction = async (name, dest) => {
  try {
    // 1.编译vue模板和router模板
    const [storeResult, typeResult] = await Promise.all([compile('vue-store.ejs', {}), compile('vue-types.ejs', {})])
    // const vueCptResut = await compile('vue-component.ejs', data)
    // const routerResult = await compile('vue-router.ejs', data)

    // 2.将文件写入到对应的文件夹 文件夹不存在时需要创建
    // 自动创建与文件名同名的文件夹
    dest = path.resolve(dest,name.toLowerCase())
    if (makeFileSync(dest)) {
      const targetStorePath = path.resolve(dest, `${name}.js`)
      const targetTypePath = path.resolve(dest, `type.js`)
      writeToFile(targetStorePath, storeResult)
      writeToFile(targetTypePath,typeResult)
    }
  } catch(e) {
    console.log(e)
  }
}
module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAction,
  addStoreAction
}
