
import Vue from 'vue'
import App from './App'
import axios from 'axios';
import qs from 'qs';
import './scss/components.scss'
import {getnotice,titleUtil} from './common'
import router from './router'
import store from './store'


import { PopupPicker,Group,XInput ,Datetime,Popup ,TransferDom,Alert ,AlertPlugin,Icon,Loading  ,LoadingPlugin ,Toast ,ToastPlugin ,Selector,Checklist ,,Checker, CheckerItem  } from 'vux'
Vue.component('popup-picker', PopupPicker);
Vue.component('Group', Group);
Vue.component('x-input', XInput );
Vue.component('datetime', Datetime );
Vue.component('popup', Popup );
Vue.component('alert', Alert);
Vue.component('icon', Icon);
Vue.component('loading', Loading);
Vue.component('toast', Toast);
Vue.component('selector', Selector);
Vue.component('checklist', Checklist);
Vue.component('checker', Checker);
Vue.component('checker-item', CheckerItem);
Vue.directive('transfer-dom', TransferDom)
Vue.use(AlertPlugin);
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin)

import zh from './lang/zh'
import en from './lang/en';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'en', // 语言标识
  messages:{
        'zh': zh,
        'en': en
    }
})

Vue.filter('changeUnit', function(val) {
      // 超过一百万单位为M，大于等于一千单位为K，不足一千单位为AED。录入的单位为AED
      if(val<1000){
        return `${val}AED`;
    }else if(val>=1000 && val<1000000){
        return `${parseInt(val/1000)}K`;
    }else if(val>=1000000){
        return `${parseInt(val/1000000)}M`;
    }
});

// let str = 'token=eyJ0eXAiOiJKV1QiLCJhbGciOiJTSEEtMjU2In0\u003d.eyJpc3MiOiJtXzIwMTgxMjAzMjEyNzQ3OTk3IiwiZXhwIjoiRGVjIDUsIDIwMTggMTE6Mzg6NTcgQU0iLCJ1c2VySWQiOiI4OCIsImFyZWFDb2RlIjoiODYiLCJtb2JsZSI6IjE4NTcxNTc4MzUzIn0\u003d.YWQwMzE4NGIyNmRkY2YwOWMxOGQ2MjRjYjRiODU5MmE0OGQxMmNhMDMwMWM1YmFlMDgwYzE4ODRhODYzZWRiYQ\u003d\u003d&language=en&city=shenzhen'
let str = window.location.href;
let token = str.substring(str.indexOf('token=')+6,str.indexOf('&language='))//截取token
let lang = str.substr(str.indexOf('&language=')+10,2);//截取语言
let city = str.substr(str.indexOf('&city=')+6);//截取城市
i18n.locale = lang;

Vue.prototype.token = token;
Vue.prototype.lang = lang;
Vue.prototype.city = city;
axios.defaults.withCredentials = true;
 
//图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    error:'./img/lazyload.png',
    loading:'./img/lazyload.png'
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if(lang=='zh'){
    document.title = to.meta.titleCn;
    titleUtil.setTitle(to.meta.titleCn);
  }else if(lang=='en'){
    document.title = to.meta.titleEn;
    titleUtil.setTitle(to.meta.titleEn);
  }
  if( from.name=='detail' ){
    if(sessionStorage.getItem('d_buyData')){
      sessionStorage.removeItem('d_buyData')
    }
  }
  if(from.name=='finance'){
    if(sessionStorage.getItem('financeData')){
      sessionStorage.removeItem('financeData')
    }
  }
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(route => {
  // 从路由的元信息中获取 title 属性
  if (route.meta.title) {
      if(lang=='zh'){
        document.title = route.meta.titleCn; 
        titleUtil.setTitle(route.meta.titleCn);
      }else if(lang=='en'){
        document.title = route.meta.titleEn;
        titleUtil.setTitle(route.meta.titleEn);
      }
  }
  store.commit('updateLoadingStatus', {isLoading: false})
});


axios.defaults.timeout = 15000

axios.interceptors.request.use(config => {
  config.headers['OriginUrl'] = window.location.href;
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  // if (response.data.isVerify && response.data.isVerify == 1) {
  //   window.location.href = response.data.wxAuthUrl;
  // }

  if(response.data.failCode == 'unlogin'){
		// router.push('/login');
	}
	if(response.data.result == 0 && response.data.failCode=="redirect"){
		window.location.href=response.data.failReason;
	}else if(response.data.result == 0 && response.data.failReason){
    getnotice(response.data.failReason)
  }else{
		return response
	}

  return response
}, error => {
  // getnotice('请求超时,请重新加载')
  return Promise.reject(error)
})

axios.defaults.headers.post['X-Requested-With']='XMLHttpRequest';


Vue.prototype.$axios = axios
Vue.prototype.$qs = qs;
export default axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  template: '<App/>',
  components: {App},
})
