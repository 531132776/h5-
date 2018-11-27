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
          titleCn:'开发商直售'
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
          titleCn:'楼盘信息'
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
          titleCn:'预约详情'
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
          titleCn:'申购详情'
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
          titleCn:'合同信息'
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
          titleCn:'申请结果'
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
          titleCn:'合同签名'
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
          titleCn:'国籍选择'
      }
    },
    {
      path: '/finance',
      name: 'finance',
      component: (resolve)=> {
        require(['../components/finance.vue'], resolve);
      },
      meta: {
          titleEn: 'Sandy finance',
          titleCn:'Sandy 服务'
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
      }
    }
  ]
})
