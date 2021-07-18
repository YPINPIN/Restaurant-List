// 檢查值是否相同
function isEqual(target1, target2) {
  return target1 === target2
}

// 設定參數
function setVariable(varName, varValue, options) {
  if (!options.data.root) {
    options.data.root = {}
  }
  options.data.root[varName] = varValue
}

module.exports = { isEqual, setVariable }
