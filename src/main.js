// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
// App 在UI库css 后引用可以避免生产环境与开发环境中样式不一致的问题
// 引用顺序决定打包后css 顺序
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import Element from 'element-ui'
import store from './store'
import './styles/index.scss' // global css
import icons from '@/components/icons/index'
import subTab from '@/components/subTab'
import uuForm from '@/components/form'
import obList from '@/components/data-list'
import obListItem from '@/components/data-list/sub-item'
import obDialogForm from '@/components/dialog-form'
import obGroupNav from '@/components/group-nav'
import obListEmpty from '@/components/list-empty'
import * as filters from './filters'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.use(require('./utils/global'))
Vue.use(require('vue-wechat-title'))
Vue.use(Element, {
  size: 'small'
})

Vue.component(icons.name, icons)
Vue.component(subTab.name, subTab)
Vue.component(uuForm.name, uuForm)
Vue.component(obList.name, obList)
Vue.component(obListItem.name, obListItem)
Vue.component(obGroupNav.name, obGroupNav)
Vue.component(obDialogForm.name, obDialogForm)
Vue.component(obListEmpty.name, obListEmpty)
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
