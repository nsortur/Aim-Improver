import Vue from 'vue'
import App from './App.vue'
import VueTimers from 'vue-timers'

Vue.config.productionTip = false
Vue.use(VueTimers)

new Vue({
  render: h => h(App)
}).$mount('#app')
