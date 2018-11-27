<template>

  <div id="app">
    <!--<transition name="slide">-->
      
    <router-view></router-view>
    <loading v-model="isLoading"></loading>
    <!--</transition>-->
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data(){
    return{  

    }
    
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading
    })
  },
  created() {
    try {
        document.body.removeChild(document.getElementById('loading'))
        setTimeout(function() {
          document.getElementById('app').style.display = 'block';
        }, 500)
      } catch (e) {

      }
  },
  mounted() {
    
    // let u = navigator.userAgent, app = navigator.appVersion; 
    // let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器 
    // let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
    // if(isAndroid){
    //   this.$i18n.locale = window.android.isZhLanguage()?'zh':'en';
    // }

  },
}

</script>
<style>

  #app{
    height: 100%;
  }
</style>
