<template>
    <div class="page developers-page" >
        <!-- <header class="developers-header">
            <router-link :to="{path:'/'}"><i class="icon-fanhui-copy1 gray"></i></router-link>
            楼盘信息
        </header> -->
        <div class="developers-list">
            <img class="big-img" v-lazy="houseDetail.projectMainImg" alt="">
            <ul class="block">
                <li class="auto"><span class="gray">RERA permit NO: </span> <span>{{houseDetail.reraPermitNo}}</span></li>    
                <li class="auto"><span class="gray">DED licence NO:</span> <span>796680</span></li>  
                <li class="auto underline"><span class="gray">RERA Registration NO:</span> <span>20666</span></li>  
                <li><span class="gray">{{$t('ProjectName')}}:</span><span>{{houseDetail.projectName}}</span></li>
                <li><span class="gray">{{$t('developer')}}:</span><span>{{houseDetail.developers}}</span></li>
                <li><span class="gray">{{$t('ProjectLocation2')}}:</span><span>{{houseDetail.community}}</span></li>
                <li><span class="gray">{{$t('PropertyType')}}:</span><span>{{houseDetail.houseTypeName}}</span></li>
                <li>
                    <span class="gray">{{$t('CompletionTime')}}:</span>
                    <span class="lineheight">{{$t('anticipatedCompletionDate')}}({{houseDetail.deliveryTime}}) 
                        <br/>
                        {{$t('actualCompletionDate')}}
                    </span>
                </li>
                <li><span class="gray">{{$t('available')}}:</span>
                <span>
                    <i v-for="(item,idx) in houseDetail.bedroomNum" :key="idx">
                        <template v-if="item==1">{{$t('one')}}  </template>
                        <template v-if="item==2">{{$t('two')}}  </template>
                        <template v-if="item==3">{{$t('three')}}</template>
                        <template v-if="item==4">{{$t('four')}} </template>
                        <template v-if="item==5">{{$t('five')}} </template>
                        <template v-if="item==6">{{$t('six')}}  </template>
                        <template v-if="item==7">{{$t('seven')}}</template>
                        <template v-if="item==8">{{$t('eight')}}</template>
                        <template v-if="item==9">{{$t('nine')}} </template>
                        <template v-if="item==10">{{$t('ten')}} </template>
                        <template v-if="item==100">{{$t('studio')}} </template>
                        <template v-if="idx!=houseDetail.bedroomNum.length-1">
                             
                        </template>
                    </i>
                </span>
                </li>
                <li><span class="gray">{{$t('price')}}:</span><span>{{houseDetail.minHouseRent}}AED - {{houseDetail.maxHouseRent}}AED</span></li>
            </ul>
            <img v-if="houseDetail.projectMainImg2" class="big-img" v-lazy="houseDetail.projectMainImg2" alt="">
        </div>
        <div class="footer">
           
            <router-link class="button1 bg-primary" v-if="houseDetail.applyId>=0&&houseDetail.applyId!=null" :to="{path:'/buyData',query:{'id':houseDetail.id,'applyId':houseDetail.applyId}}">{{$t('Apply')}}</router-link>
            <a href="javascript:;" v-else-if="houseDetail.applyId==null"  class="button1 bg-primary" @click="goToLogin">{{$t('Apply')}}</a>
            <a href="javascript:;" v-else class="button1 bg-primary a_disable">{{$t('Apply')}}</a>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            houseDetail:{},
            houseTypeName:'',
            item:[]
        }
    },
    created() {
             
    },
    mounted() {
        if(sessionStorage.getItem('getDict1')){
            this.item = JSON.parse(sessionStorage.getItem('getDict1'));
        }else{
            this.getDict();    
        }
        
        this.getDirectSalesDetails();
    },
    methods:{
        getDirectSalesDetails(){
            if(!this.$store.state.isLoading){
                this.$vux.loading.show();
            }
            this.$axios.post('/api/exterior/houses/getDirectSalesDetails',this.$qs.stringify({'id':this.$route.query.id,'token':this.token}) ).then(res=>{
                if(res.result==0){    
                    sessionStorage.setItem('projectData',JSON.stringify({
                        'projectName':res.dataSet.projectName,
                        'developers':res.dataSet.developers,
                        'id':res.dataSet.id,
                        'applyId':res.dataSet.applyId,
                    }))    
                    if(res.dataSet.housingTypeDictcode!=""){
                        this.item.forEach(ele=>{
                            if(ele.id==res.dataSet.housingTypeDictcode){
                                this.houseTypeName = ele.itemValueEn;
                            }
                        })
                    }
                    this.houseDetail = res.dataSet;
                    this.houseDetail.houseTypeName = this.houseTypeName;
                    this.houseDetail.bedroomNum = this.houseDetail.bedroomNum? this.houseDetail.bedroomNum.split(','):"";
                    this.houseDetail.deliveryTime = this.houseDetail.deliveryTime ? this.houseDetail.deliveryTime.split(' ')[0].split('-').reverse().join('/') : "";
                }
            }).catch(res=>{}).finally(() => this.$vux.loading.hide());   
        },
        getDict(val){
            this.$axios.post('/api/exterior/get/dict/1').then(res=>{
                if(res.result ==0){
                    // var arr = res.dataSet.items;
                    this.item = res.dataSet.items;
                    // console.log(this.item)
                    sessionStorage.setItem('getDict1',JSON.stringify(this.item));
                }
            }).catch(err=>{

            })
        },
    goToLogin(){
      let _this = this;
      this.$vux.confirm.show({
        title:_this.$t('prompt'),
        content:'you can view after login, please select whether to log in or not',
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
    }
    }
}
</script>

