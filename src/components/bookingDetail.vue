<template>
    <div class="page developers-page">
        <!-- <header class="developers-header">
            <router-link :to="{path:'/bookingList'}"><i class="icon-fanhui-copy1 gray"></i></router-link>
            申购详情
        </header> -->
        <div class="developers-list">
            <div class="developers-list-section">
            <ul v-if="houseDetail.length!=0">
                <li>
                    <p class="applicationNumber">
                        <span class="color-light">{{$t('orderCode')}}</span>
                        <span >{{houseDetail.code}}</span> 
                    </p>
                    <div class="clearfix">
                        <div class="left">
                            <img alt="" v-lazy="houseDetail.projectMainImg" :key="houseDetail.projectMainImg">
                        </div>
                        <div class="right booking">
                            <h4>
                                {{houseDetail.projectName}}
                            </h4>
                            <ul class="booking-ul">
                                <li>
                                    <span class="color-light">{{$t('applyName')}}</span><span >{{houseDetail.familyName}}{{houseDetail.name}}</span>
                                </li>
                                <li>
                                    <span class="color-light">{{$t('ProjectLocation2')}}</span><span >{{houseDetail.area}}</span>
                                </li>
                                <li>
                                    <span class="color-light">{{$t('applyDate')}}</span><span >{{houseDetail.createTime}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="border-b"></div>
                    <div class="purchaseStatus clearfix">
                        <a href="javascript:;" class="button color-primary right">

                                    <span  v-if="houseDetail.status==0">{{$t('Complete personal information')}}</span>
                                    <span class=" color-primary" v-if="houseDetail.status==1">{{$t('approved')}}</span>
                                    <span  v-if="houseDetail.status==2">{{$t('auditFail')}}</span>
                                    <span  v-if="houseDetail.status==3">{{$t('PurchaseSuccessful')}}</span>
                        </a>
                    </div>
                </li>
            </ul>
            <div class="space-notice" v-if="houseDetail==null || houseDetail.length==0">
                <i class="icon-Artboard19"></i>
                <p>NONE</p>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            searchVal:{
                pageIndex:1,
                developers:'',
                area:'',
                token:this.token
            },
            houseDetail:[]
        }
    },
    mounted() {
        this.getPurchaseApplyList();
    },
    methods:{
        getPurchaseApplyList(){
            if(!this.$store.state.isLoading){
                this.$vux.loading.show();
            }
            this.$axios.post('/api/exterior/member/getPurchaseApplyDetails',this.$qs.stringify({id:this.$route.query.id,token:this.token}) ).then(res=>{
                if(res.result==0){
                    this.houseDetail = res.dataSet;
                    this.houseDetail.createTime = this.houseDetail.createTime? this.houseDetail.createTime.split(' ')[0].split('-').reverse().join('/'):"";
                }
            }).catch(res=>{}).finally(() => this.$vux.loading.hide());  
        }
    }
}
</script>

