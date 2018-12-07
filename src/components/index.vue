<template>
  <div class="page b2b-orderlist-page developers-page nomargin" id="spring">

      <!-- <header class="developers-header">
        <i class="icon-fanhui-copy1 gray"></i>
        开发商直售
      </header> -->
      <div class="location-chose">
          <span @click="isShowSort=true,isShowDevelopers=false,isShowArea=false">
            
            <i v-if="searchVal.filter==''">{{$t('sortedBy')}}</i>
            <i v-if="searchVal.filter!=''">{{$t('sortedBy')}}</i>
            <i class="icon-sanjiaoxing" :class="isShowSort==true?'color-primary':''"></i> 
          </span>
          <span @click="isShowDevelopers=true,isShowSort=false,isShowArea=false">
            <i v-if="searchVal.developers==''">{{$t('developer')}}</i>
            <i v-if="searchVal.developers!=''">{{searchVal.developers}}</i>
            <i class="icon-sanjiaoxing" :class="isShowDevelopers==true?'color-primary':''"></i>
          </span>
          <span @click="isShowArea=true,isShowSort=false,isShowDevelopers=false">
            <i v-if="searchVal.area==''">{{$t('projectLocation')}}</i>
            <i v-if="searchVal.area!=''">{{searchVal.area}}</i>
            <i class="icon-sanjiaoxing" :class="isShowArea==true?'color-primary':''"></i>  
          </span>       
      </div>
        <pull-to :top-load-method="refresh" ref="a" class="spring-scroller" :on-refresh="refresh" :bottom-load-method="loadmore" :bottomConfig="bottomConfig" :topConfig='topConfig' style="height:84%;">
      <div class="developers-list" >
          <div class="developers-list-section">
            <div class="space-notice" v-if="houseList==null || houseList.length==0">
              <i class="icon-Artboard19"></i>
              <p>NONE</p>
            </div>
            <ul v-else>
              <li v-for="(item,idx) in houseList" :key="idx" @click="setSession(0,item)">
                <!-- <router-link :to="{path:'/detail',query:{'id':item.id}}" class="clearfix" > -->
                  <div class="clearfix">
                  <div class="left">
                    <img alt="" v-lazy="item.projectMainImg" :key="item.projectMainImg">
                  </div>
                  <div class="right">
                    <h4>
                      <!-- {{item.city}}{{item.community}}{{item.subCommunity}}{{item.address}} -->
                      {{item.projectName}}
                    </h4>
                    

                    <p class="color-light margin14">
                            <!-- <span class="houseAcreage">{{item.houseAcreage}} SqFt</span> -->
                            <span> 
                              <img class="map-img" src="../../static/img/map.png" alt="">
                                <i v-if="!item.subCommunity">{{item.community}}</i>
                                <i v-else>{{item.subCommunity}}</i>
                              </span>
                        </p>
                        <p class="color-orange">
                           {{item.minHouseRent|changeUnit}} - {{item.maxHouseRent|changeUnit}}
                        </p>
                  </div>
                  </div>
                <!-- </router-link> -->
              </li>
            </ul>
            
          </div>
      </div>
    </pull-to>

    

    <div class="footer" @click="setSession(1)">
      <router-link class="button1 bg-primary" v-if="token" :to="{path:'/bookingList'}">
      {{$t('myAppointment')}}</router-link>
      <a href="javascript:;" v-else class="button1 bg-primary" @click="goToLogin">{{$t('myAppointment')}}</a>
    </div>


    <!-- 弹窗模块 -->
    <!-- 智能排序 -->
    <layer :isShow="isShowSort" @close="isShowSort=false" :iShead="false" :iSfoot="false">
      <div class="select-list">
        <!-- <checklist label-position="center" required :options="sortList" v-model="filterList" @on-change="change">
          
        </checklist> -->
        <ul>
          
          <li @click="choseSort(null,'filter')" 
          :class="searchVal.filter==null?'color-primary':''"
          >
            <i class="icon-hook"></i>
            {{$t('ALL')}}
          </li>
        </ul>
        <checker v-model="filterList" type="checkbox" default-item-class="demo1-item" selected-item-class="color-primary" @on-change="change">
          <checker-item v-for="(item,idx) in sortList" :key="idx" :value="item.value"><i class="icon-hook"></i> {{ item.key }}</checker-item>
        </checker>
        
      </div>
      <div class="f-layer-card-footer">
            <a href="javascript:;" class="cancel-btn" @click="choseSort(null,'filter')">{{$t('cancel')}}</a>
            <a href="javascript:;" class="ok-btn bg-primary" @click="choseSort(filterList,'filter')">{{$t('confirm')}}</a>
        </div>
    </layer>

    <!-- 开发商 -->
    <layer :isShow="isShowDevelopers" @close="isShowDevelopers=false" :iShead="false" :iSfoot="false">
      <div class="select-list">
        <ul>
          <li v-for="(item,idx) in developersList" :key="idx" @click="chosedevelopers(item.developers)" :class="item.developers==searchVal.developers?'color-primary':''">
            <i class="icon-hook" ></i>
            {{item.developers}}
            <i v-if="item.developers==''">{{$t('ALL')}}</i>
          </li>
        </ul>
      </div>
      <!-- <div class="f-layer-card-footer">
          <a href="javascript:;" class="cancel-btn" >取消</a>
          <a href="javascript:;" class="ok-btn bg-primary" >确定</a>
      </div> -->
    </layer>

    <!-- 区域 -->
    <layer :isShow="isShowArea" @close="isShowArea=false" :iShead="false" :iSfoot="false">
      <div class="select-list">
        <ul>
          <li v-for="(item,idx) in housesAreaList" :key="idx"  :class="item.community==searchVal.area?'color-primary':''" @click="choseCommunity(item.community)">
            <i class="icon-hook"></i>
            {{item.community}}
            <i v-if="item.community==''">{{$t('ALL')}}</i>
          </li>
        </ul>
      </div>
    </layer>
  </div>
</template>


<script>
import PullTo from 'vue-pull-to'
import layer from '../newComponents/layer'

export default {
  components:{
    PullTo,
    layer
  },
  data(){
    return{
      searchVal:{
        pageIndex:1,
        developers:'',
        area:'',
        filter:null,
        city:this.city,
        token:this.token,
        
      },
      pageInfo:{},
      houseList:[],
      isShowSort:false,
      isShowDevelopers:false,
      isShowArea:false,
      sortList:[
            // {value: "", 'text': this.$t('ALL'),key:this.$t('ALL')},
            {value: 'A', text: 'A',key:'A'},
            {value: 'B', text: 'B',key:'B'},
            {value: 'C', text: 'C',key:'C'},
            {value: 'D', text: 'D',key:'D'},
            {value: 'E', text: 'E',key:'E'},
            {value: 'F', text: 'F',key:'F'},
            {value: 'G', text: 'G',key:'G'},
            {value: 'H', text: 'H',key:'H'},
            {value: 'I', text: 'I',key:'I'},
            {value: 'J', text: 'J',key:'J'},
            {value: 'K', text: 'K',key:'K'},
            {value: 'L', text: 'L',key:'L'},
            {value: 'M', text: 'M',key:'M'},
            {value: 'N', text: 'N',key:'N'},
            {value: 'O', text: 'O',key:'O'},
            {value: 'S', text: 'S',key:'S'},
            {value: 'T', text: 'T',key:'T'},
            {value: 'U', text: 'U',key:'U'},
            {value: 'V', text: 'V',key:'V'},
            {value: 'W', text: 'W',key:'W'},
            {value: 'X', text: 'X',key:'X'},
            {value: 'Y', text: 'Y',key:'Y'},
            {value: 'Z', text: 'Z',key:'Z'}],
      developersList:[],
      housesAreaList:[],
      bottomConfig: {  //下拉刷新组件传值
        pullText: 'Pull on loading',
        triggerText: 'refresh',
        loadingText: 'loading...',
        doneText: 'loaded',
        failText: 'Load failed',
        loadedStayTime: 400,
        stayDistance: 50,
        triggerDistance: 70
      },
      topConfig:{
        pullText: 'Pull on loading',
        triggerText: 'refresh',
        loadingText: 'loading...',
        doneText: 'loaded',
        failText: 'Load failed',
        loadedStayTime: 400,
        stayDistance: 50,
        triggerDistance: 70        
      },
      filterList:[],
      scrollTop:''
    }
  },
  //路由变化
  beforeRouteLeave(to, from ,next) {
    window.removeEventListener('scroll',this.handelscroll,true);
    window.removeEventListener('popstate', this.goBack, false);
    next();
  },
  created() {
  },
  mounted() {
    // console.log(this.$refs.a)
      // if(sessionStorage.getItem('searchVal')){
      //     this.searchVal = JSON.parse(sessionStorage.getItem('searchVal')) ;
      // }
      this.getDirectSalesPropertyList();
      this.getDevelopers();
      this.getPropertyArea();

      if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.goBack, false);
      }
      //监听滚动事件
      window.addEventListener('scroll',this.handelscroll,true)
  },
  

  deactivated (){
   sessionStorage.setItem('scrollTop',this.scrollTop)
  },
  activated () {
   this.$refs.a.scrollEl.scrollTop = sessionStorage.getItem('scrollTop');
   window.addEventListener('scroll',this.handelscroll,true)
   if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.goBack, false);
      }
  },


  methods:{
    //获取滚动高
    handelscroll() {
      this.$nextTick(()=>{
        let el = this.$refs.a.scrollEl;
        this.scrollTop = el.scrollTop
        // console.log(this.$refs.a.scrollEl.scrollTop)
        sessionStorage.setItem('scrollTop',this.scrollTop)
      })
    },
    
    //获取开发商直售列表
    getDirectSalesPropertyList(loaded){ 
        if(!this.$store.state.isLoading){
            this.$vux.loading.show();
        }
        this.$axios.post('/api/exterior/houses/getDirectSalesPropertyList',this.$qs.stringify(this.searchVal) ).then(res=>{
            if(res.result==0){
              if(loaded){
                loaded('done');
              }
              
              if(res.dataSet){
                this.houseList = this.houseList.concat(res.dataSet);
                this.pageInfo = res.pageInfo;
              }
            }
        }).catch(res=>{}).finally(() => this.$vux.loading.hide());  
    },
    //获取开发商列表
    getDevelopers(){
        this.$axios.post('/api/exterior/houses/getDevelopers',this.$qs.stringify({token:this.token,city:this.city}) ).then(res=>{
            if(res.result==0){
                this.developersList = res.dataSet;
                this.developersList.unshift({developers:''});
                // console.log( this.developersList,'this.developersList'  )
            }
        }).catch(res=>{})     
    },
    // 获取区域列表
    getPropertyArea(){
        this.$axios.post('/api/exterior/houses/getPropertyArea',this.$qs.stringify({token:this.token,city:this.city}) ).then(res=>{
            if(res.result==0){
                this.housesAreaList = res.dataSet;
                this.housesAreaList.unshift({community: ""})
            }
        }).catch(res=>{})       
    },

    choseSort(val,name){
      if(val==null&&name){
        this.searchVal.filter = val;
      }else{
        this.searchVal.filter = typeof val == "string"? val:val.join(',');
      }
      if(val==null&&name){
        this.filterList = [];
      }
      this.searchVal.pageIndex = 1;
      this.isShowSort = false;
      this.houseList = [];
      this.getDirectSalesPropertyList();
    },
    chosedevelopers(val){
      this.searchVal.developers = val;
      this.isShowDevelopers = false;
      this.searchVal.pageIndex = 1;
      this.houseList = [];
      this.getDirectSalesPropertyList();
    },
    choseCommunity(val){
      this.searchVal.area = val;
      this.isShowArea = false;
      this.searchVal.pageIndex = 1;
      this.houseList = [];
      this.getDirectSalesPropertyList();
    },
    // pull-to组件
    refresh(loaded) {
      var _this = this;
      this.houseList = [];
      this.searchVal.pageIndex = 1;
      this.bottomConfig.pullText = 'Pull on loading'
      this.bottomConfig.doneText = 'loaded'
      this.getDirectSalesPropertyList(loaded);
    },
    loadmore(loaded) {
      var _this = this;
      
      if(this.pageInfo.pages <= this.searchVal.pageIndex){
        loaded('done');
        return false;
      }else{
        this.searchVal.pageIndex++;
      }
      this.getDirectSalesPropertyList(loaded);
    },
    gettest(){
        
    },
    setSession(type,item){
      document.removeEventListener('scroll', this.handelscroll ,true);
      this.$router.push({
        path:'/detail',
        query:{'id':item.id}
      })
      if(type==0){
        sessionStorage.setItem('searchVal',JSON.stringify(this.searchVal))
      }else{
        if( sessionStorage.getItem('searchVal') ){
            sessionStorage.removeItem('searchVal')
        }
      }
    },
    change(arr){
      if(arr.length==this.sortList.length){
        this.searchVal.filter = null;
      }else if(arr.length==0){
        this.searchVal.filter = null;
      }else{
        this.searchVal.filter = arr.join(',');
      }    
    },
    goBack(){
      document.addEventListener('scroll',this.handelscroll,true)
        console.log(this.isAndroid,'aaa'  )
        if(this.isAndroid){
            window.android.goHome();
        }else if(this.isiOS  ){
            window.webkit.messageHandlers.goHome.postMessage(0);
        }
    },
    goToLogin(){
      let _this = this;
      this.$vux.confirm.show({
        title:_this.$t('prompt'),
        content:_this.$t('viewAfterLogin'),
        confirmText:_this.$t('confirm'),
        cancelText:_this.$t('cancel'),
        onCancel () {
        //you can view after login,please select whether to log in or not
        },  
        onConfirm () {
          if(_this.isAndroid){
              window.android.goLogin();
          }else if(_this.isiOS  ){
              window.webkit.messageHandlers.goLogin.postMessage(0);
          }
        }
      })
    },   
  },
  
  destroyed(){
      window.removeEventListener('popstate', this.goBack, false);
  },

}
</script> 
