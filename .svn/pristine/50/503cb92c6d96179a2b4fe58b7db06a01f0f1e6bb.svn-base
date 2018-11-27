<template>
    <div class="page developers-page nomargin" id="spring">
        <pull-to :top-load-method="refresh" class="spring-scroller" :on-refresh="refresh" :bottom-load-method="loadmore" :bottomConfig="bottomConfig" :topConfig='topConfig'>
        <!-- <header class="developers-header">
            <router-link :to="{path:'/'}"><i class="icon-fanhui-copy1 gray"></i></router-link>
            预约详情
        </header> -->
        <div class="developers-list booking-list">
            <div class="developers-list-section">
            <ul >
                <li v-for="(item,idx) in houseList" :key="idx">
                <!-- <router-link :to="{path:'/detail',query:{'id':item.id}}" class="clearfix"> -->
                    <div class="clearfix">
                    <div class="left">
                    <img alt="" v-lazy="item.projectMainImg" :key="item.projectMainImg">
                    </div>
                    <div class="right booking">
                        <h4>
                            {{item.projectName}}
                        </h4>
                        <p class="color-light margin14">
                            <!-- <span class="houseAcreage">{{item.houseAcreage}} SqFt</span> -->
                            <span> <img class="map-img" src="../../static/img/map.png" alt=""> {{item.area}}</span>
                        </p>
                        <p class="color-orange">
                            <span>{{item.minHouseRent|changeUnit}} - {{item.maxHouseRent|changeUnit}}</span>
                            
                            <router-link class="color-primary right" :to="{path:'/bookingDetail',query:{'id':item.id}}" style="margin-top:-3px;">{{$t('ViewDetails')}}<i class="icon-Artboard11 color-light "></i> </router-link>
                        </p>
                    
                    </div>
                    </div>
                <!-- </router-link> -->
                </li>
            </ul>
            <div class="space-notice" v-if="houseList==null || houseList.length==0">
                <i class="icon-Artboard19"></i>
                <p>暂无</p>
            </div>
            </div>
        </div>
        </pull-to>
    </div>
</template>
<script>
import PullTo from 'vue-pull-to'

export default {
    components:{
        PullTo
    },
    data(){
        return{
            searchVal:{
                pageIndex:1,
                developers:'',
                area:'',
                token:this.token
            },
            houseList:[],
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
            pageInfo:{},
        }
    },
    mounted() {
        this.getPurchaseApplyList();
    },
    methods:{
        getPurchaseApplyList(loaded){
            this.$axios.post('/api/exterior/member/getPurchaseApplyList',this.$qs.stringify(this.searchVal) ).then(res=>{
                if(res.data.result==0){
                    if(loaded){
                        loaded('done');
                    }
                    this.houseList = this.houseList.concat(res.data.dataSet);
                    this.pageInfo = res.data.pageInfo;
                    console.log( this.houseList )
                }
            }).catch(res=>{})
        },
        // pull-to组件
        refresh(loaded) {
            var _this = this;
            this.houseList = [];
            this.searchVal.pageIndex = 1;
            this.bottomConfig.pullText = 'Pull on loading'
            this.bottomConfig.doneText = 'loaded'
            this.getPurchaseApplyList(loaded);
        },
        loadmore(loaded) {
            var _this = this;
            if(this.pageInfo.pages <= this.searchVal.pageIndex){
                loaded('done');
                return false;
            }else{
                this.searchVal.pageIndex++;
            }
            this.getPurchaseApplyList(loaded);
        },
    }
}
</script>

