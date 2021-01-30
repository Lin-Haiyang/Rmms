import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// false 开发环境：Vue会提供很多警告来方便调试代码。
// true 生产环境：警告却没有用，反而会增加应用的体积
// Vue.config.productionTip = false;
// process.env.NODE_ENV
Vue.config.productionTip = process.env.NODE_ENV === 'production';
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
