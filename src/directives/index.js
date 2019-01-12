
export default {
  // 元素内容区滚动到顶部
  'scroll-top': {
    componentUpdated (el, binding) {
      let child = el.children[0]
      if (child && binding.value !== binding.oldValue) {
        child.scrollTop = 0
      }
    }
  }
}
