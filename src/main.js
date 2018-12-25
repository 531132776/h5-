
import Vue from 'vue'
import App from './App'
import axios from 'axios';
import qs from 'qs';
import './scss/components.scss'
import {getnotice,titleUtil} from './common'
import router from './router'
import store from './store'


import { PopupPicker,Group,XInput ,Datetime,Popup ,TransferDom,Alert ,AlertPlugin,Icon,Loading  ,LoadingPlugin ,Toast ,ToastPlugin ,Selector,Checklist ,Checker, CheckerItem,Confirm ,ConfirmPlugin   } from 'vux'
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
Vue.component('confirm', Confirm);
Vue.directive('transfer-dom', TransferDom)
Vue.use(AlertPlugin);
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
Vue.use(ConfirmPlugin);


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

let str = "";
if(window.location.hostname == "localhost"){
  str = 'token=eyJ0eXAiOiJKV1QiLCJhbGciOiJTSEEtMjU2In0=.eyJpc3MiOiJtXzIwMTgxMjIwMTE1NDQzNjcxIiwiZXhwIjoiRGVjIDIwLCAyMDE4IDEyOjAyOjE3IFBNIiwidXNlcklkIjoiNDY0OCIsImFyZWFDb2RlIjoiODYiLCJtb2JsZSI6IjE4NTcxNTc4MzUzIn0=.OGUyYjE3OWRmYzM5ODc2MTI5ODE4YTFmNzRmYWRlOTIxZjNmNGIyZjkxMzgxM2IyMDI1ZmNmYzNmODAxYzBhNg==&language=en&city=shenzhen'
}else{
  str = window.location.href;
}

let token = str.substring(str.indexOf('token=')+6,str.indexOf('&language='))=='http:'?"":str.substring(str.indexOf('token=')+6,str.indexOf('&language='))//截取token
let lang = str.substr(str.indexOf('&language=')+10,2);//截取语言
let city = str.indexOf('&city=')==-1?"":str.substr(str.indexOf('&city=')+6);//截取城市

i18n.locale = lang;

//判断是ios还是安卓
let u = navigator.userAgent, app = navigator.appVersion; 
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 ;

Vue.prototype.token = token;
Vue.prototype.lang = lang;
Vue.prototype.city = city;
Vue.prototype.isAndroid = isAndroid;
Vue.prototype.isiOS = isiOS;

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
  console.log( response.data )
  if( response.data.result === 0 || response.data.result === 1002 || response.data.state==0){	//正常状态码
    return Promise.resolve(response.data);
  }else if( response.data.result === 2001){
    // token失效，让用户重新登录
    Vue.$vux.confirm.show({
      title:i18n.t('prompt'),
      content:i18n.t('loginFaild'),
      confirmText:i18n.t('confirm'),
      cancelText:i18n.t('cancel'),
      onCancel () {

      },  
      onConfirm () {
        if(isAndroid){
            window.android.goLogin();
        }else if(isiOS  ){
            window.webkit.messageHandlers.goLogin.postMessage(0);
        }
      }
    })
  }else{
    Vue.$vux.toast.text(response.data.message);
    return Promise.reject(response.data);
  }
}, error => {
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
