import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

// 引入全局样式
import './assets/css/global.css'

// 引入vue-cesium
import VueCesium from 'vue-cesium'
// 使用在线cdn时地址最好指定测试过的版本，不然最新版本的话可能出现加载上的各种问题
Vue.use(VueCesium, { cesiumPath: 'https://unpkg.com/cesium@1.80.0/Build/Cesium/Cesium.js', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlMDAyYTk0NS01ZTY1LTQ3OTEtYWMyYi0wZTRlOTQ5YjY4YzAiLCJpZCI6Mzc2NjUsImlhdCI6MTYwNTM2MzAzNH0.WHiJUTaGsTxGTkF_wFwGeYapCr3nnumUcLznW2lutbQ' })
Vue.config.productionTip = false
new Vue({
  vuetify,
  // 配置Vue全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: h => h(App)
}).$mount('#app')
