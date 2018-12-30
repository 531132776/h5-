import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component:  (resolve)=> {
        require(['../components/index.vue'], resolve);
      },
      meta: {
          titleEn: 'Directly from developer',
          titleCn:'开发商直售',
          keepAlive:true,
          requireAuth: false
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: (resolve)=> {
        require(['../components/detail.vue'], resolve);
      },
      meta: {
          titleEn: 'Project Information',
          titleCn:'楼盘信息',
          requireAuth: false
      }
    },
    {
      path: '/bookingList',
      name: 'bookingList',
      component: (resolve)=> {
        require(['../components/bookingList.vue'], resolve);
      },
      meta: {
          titleEn: 'Appointment details',
          titleCn:'预约详情',
          requireAuth: true
      }
    },
    {
      path: '/bookingDetail',
      name: 'bookingDetail',
      component: (resolve)=> {
        require(['../components/bookingDetail.vue'], resolve);
      },
      meta: {
          titleEn: 'Purchase application details',
          titleCn:'申购详情',
          requireAuth: true
      }
    },
    {
      path: '/buyData',
      name: 'buyData',
      component: (resolve)=> {
        require(['../components/buyData.vue'], resolve);
      },
      meta: {
          titleEn: 'Complete personal information',
          titleCn:'完善个人信息',
          // keepAlive:true
          requireAuth: true
      }
    },
    {
      path: '/contract',
      name: 'contract',
      component: (resolve)=> {
        require(['../components/contract.vue'], resolve);
      },
      meta: {
          titleEn: 'Contract information',
          titleCn:'合同信息',
          requireAuth: true
      }
    },
    {
      path: '/contractApplyResult',
      name: 'contractApplyResult',
      component: (resolve)=> {
        require(['../components/contractApplyResult.vue'], resolve);
      },
      meta: {
          titleEn: 'Application results',
          titleCn:'申请结果',
          requireAuth: true
      }
    },
    {
      path: '/sign',
      name: 'sign',
      component: (resolve)=> {
        require(['../components/sign.vue'], resolve);
      },
      meta: {
          titleEn: 'Contract information',
          titleCn:'合同签名',
          requireAuth: true
      }
    },
    // nationalList 国籍选择列表
    {
      path: '/test',
      name: 'test',
      component: (resolve)=> {
        require(['../components/test.vue'], resolve);
      },
      meta: {
          titleEn: 'Nationality selection',
          titleCn:'国籍选择',
          requireAuth: true
      }
    },
    {
      path: '/finance',
      name: 'finance',
      component: (resolve)=> {
        require(['../components/finance.vue'], resolve);
      },
      meta: {
          titleEn: 'Sandy services',
          titleCn:'Sandy服务',
          requireAuth: true
      }
    },
    {
      path: '/finance_personal',
      name: 'finance_personal',
      component: (resolve)=> {
        require(['../components/finance_personal.vue'], resolve);
      },
      meta: {
          titleEn: 'Complete personal information',
          titleCn:'完善个人信息',
          // keepAlive:true
          requireAuth: true
      }
    },
    //分享
    {
      path: '/wxShare',
      name: 'wxShare',
      component: (resolve)=> {
        require(['../components/wxShare.vue'], resolve);
      },
      meta: {
          titleEn: 'Details of housing supply',
          titleCn:'房源详情',
          // keepAlive:true
          requireAuth: true
      }
    },
    {
      path: '/Onlinebargaining',
      name: 'Onlinebargaining',
      component: (resolve)=> {
        require(['../components/Onlinebargaining.vue'], resolve);
      },
      meta: {
          titleEn: 'App install',
          titleCn:'App install',
          // keepAlive:true
          requireAuth: true
      }
    },
  ]
})
