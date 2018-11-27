<template>
  <div class="page b2b-orderlist-page developers-page nomargin" id="spring">

      <!-- <header class="developers-header">
        <i class="icon-fanhui-copy1 gray"></i>
        开发商直售
      </header> -->
      <div class="location-chose">
          <span @click="isShowSort=true,isShowDevelopers=false,isShowArea=false">
            
            <i v-if="searchVal.filter==''">{{$t('sortedBy')}}</i>
            <i v-if="searchVal.filter!=''">{{$t('sortedBy')}}{{searchVal.filter}}</i>
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
        <pull-to :top-load-method="refresh" class="spring-scroller" :on-refresh="refresh" :bottom-load-method="loadmore" :bottomConfig="bottomConfig" :topConfig='topConfig' style="height:84%;">
      <div class="developers-list">
          <div class="developers-list-section">
            <div class="space-notice" v-if="houseList==null || houseList.length==0">
              <i class="icon-Artboard19"></i>
              <p>NONE</p>
            </div>
            <ul v-else>
              <li v-for="(item,idx) in houseList" :key="idx">
                <router-link :to="{path:'/detail',query:{'id':item.id}}" class="clearfix">
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
                </router-link>
              </li>
            </ul>
            
          </div>
      </div>
    </pull-to>

    

    <div class="footer">
      <router-link class="button1 bg-primary" :to="{path:'/bookingList'}">
      {{$t('myAppointment')}}</router-link>
    </div>


    <!-- 弹窗模块 -->
    <!-- 智能排序 -->
    <layer :isShow="isShowSort" @close="isShowSort=false" :iShead="false" :iSfoot="false">
      <div class="select-list">
        <ul>
          <li v-for="(item,idx) in sortList" :key="idx" @click="choseSort(item.value)" 
          :class="item.value==searchVal.filter?'color-primary':''"
          >
            <i class="icon-hook" v-if="item.value==searchVal.filter"></i>
            {{item.value}}
          </li>
        </ul>
      </div>
    </layer>

    <!-- 开发商 -->
    <layer :isShow="isShowDevelopers" @close="isShowDevelopers=false" :iShead="false" :iSfoot="false">
      <div class="select-list">
        <ul>
          <li v-for="(item,idx) in developersList" :key="idx" @click="chosedevelopers(item.developers)" :class="item.developers==searchVal.developers?'color-primary':''">
            <i class="icon-hook" v-if="item.developers==searchVal.developers"></i>
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
            <i class="icon-hook" v-if="item.community==searchVal.area"></i>
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
        filter:'',
        token:this.token
      },
      pageInfo:{},
      houseList:[],
      isShowSort:false,
      isShowDevelopers:false,
      isShowArea:false,
      sortList:[{'value': null, 'text': '请选择'},
            {value: 'A', text: 'A'},
            {value: 'B', text: 'B'},
            {value: 'C', text: 'C'},
            {value: 'D', text: 'D'},
            {value: 'E', text: 'E'},
            {value: 'F', text: 'F'},
            {value: 'G', text: 'G'},
            {value: 'H', text: 'H'},
            {value: 'I', text: 'I'},
            {value: 'J', text: 'J'},
            {value: 'K', text: 'K'},
            {value: 'L', text: 'L'},
            {value: 'M', text: 'M'},
            {value: 'N', text: 'N'},
            {value: 'O', text: 'O'},
            {value: 'S', text: 'S'},
            {value: 'T', text: 'T'},
            {value: 'U', text: 'U'},
            {value: 'V', text: 'V'},
            {value: 'W', text: 'W'},
            {value: 'X', text: 'X'},
            {value: 'Y', text: 'Y'},
            {value: 'Z', text: 'Z'}],
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
      }
    }
  },
  created() {
  },
  mounted() {
      this.getDirectSalesPropertyList();
      this.getDevelopers();
      this.getPropertyArea();
  },
  methods:{
    //获取开发商直售列表
    getDirectSalesPropertyList(loaded){ 
        this.$axios.post('/api/exterior/houses/getDirectSalesPropertyList',this.$qs.stringify(this.searchVal) ).then(res=>{
            // console.log(res.data)
            if(res.data.result==0){
              if(loaded){
                loaded('done');
              }
              if(res.data.dataSet){
                this.houseList = this.houseList.concat(res.data.dataSet);
                this.pageInfo = res.data.pageInfo;
              }

              // console.log( this.houseList);
            }
        }).catch(res=>{})     
    },
    //获取开发商列表
    getDevelopers(){
        this.$axios.post('/api/exterior/houses/getDevelopers',this.$qs.stringify({token:this.token}) ).then(res=>{
            // console.log(res.data)
            if(res.data.result==0){
                this.developersList = res.data.dataSet;
                this.developersList.unshift({developers:''});
                // console.log( this.developersList,'this.developersList'  )
            }
        }).catch(res=>{})     
    },
    // 获取区域列表
    getPropertyArea(){
        this.$axios.post('/api/exterior/houses/getPropertyArea',this.$qs.stringify({token:this.token}) ).then(res=>{
            // console.log(res.data)
            if(res.data.result==0){
                this.housesAreaList = res.data.dataSet;
                this.housesAreaList.unshift({community: ""})
            }
        }).catch(res=>{})       
    },

    choseSort(val){
      this.searchVal.filter = val;
      this.isShowSort = false;
      this.houseList = [];
      this.getDirectSalesPropertyList();
    },
    chosedevelopers(val){
      this.searchVal.developers = val;
      this.isShowDevelopers = false;
      this.houseList = [];
      this.getDirectSalesPropertyList();
    },
    choseCommunity(val){
      this.searchVal.area = val;
      this.isShowArea = false;
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
  }
}
</script> 
