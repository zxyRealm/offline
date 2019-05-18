
// 根据出入口类型返回标签列表
export function tagListByType (type) {
  let arr = [
    { value: 1, label: '地下车库' },
    { value: 2, label: '临街入口' },
    { value: 3, label: '直梯' },
    { value: 4, label: '扶梯' },
    { value: 5, label: '商场内部' }
  ]
  switch (type) {
    case 1:
      arr = arr.splice(0, 2)
      break
    case 2:
      arr = arr.splice(2)
      break
    case 3:
      arr = []
      break
  }
  return arr
}
