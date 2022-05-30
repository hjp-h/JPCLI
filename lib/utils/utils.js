const path = require('path')
const fs = require('fs')
const ejs = require('ejs')

// 解析ejs模板
const compile = (templateName, data) => {
  // 1.找到模板的路径
  const templateDest = `../templates/${templateName}`
  const templatePath = path.resolve(__dirname, templateDest)

  // 2.解析模板 调用ejs.renderFile方法 将结果通过promise的方式返回
  // 注意这里必须是{data} 而不能直接是data 因为模板里拿的是data
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        console.log(err)
        reject(err)
        return
      }
      resolve(result)
    })
  })
}

// 判断文件是否存在及创建
const makeFileSync = (pathName) => {
  // 文件存在则返回true
  if (fs.existsSync(pathName)) {
    return true
  } else {
    // 当前目录不存在 但是父级目录存在 即可直接创建
    if (makeFileSync((path.dirname(pathName)))) {
      fs.mkdirSync(pathName)
      return true
    }
  }
}

// 将文件写入目标文件夹
const writeToFile = (filePath, content) => fs.promises.writeFile(filePath,content)
module.exports = {
  compile,
  writeToFile,
  makeFileSync
}
