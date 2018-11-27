<template>
    <div class="page finance-page">
        <!-- <header class="developers-header">
            <router-link :to="{path:'/detail',query:{'id':this.$route.query.id}}"><i class="icon-fanhui-copy1 gray"></i></router-link>
            完善信息
        </header> -->
        <p class="mb10 correct-tip">{{$t('correctInformation')}}</p>
        <group :title="$t('customerDetail')" label-width="5em" class="group1-personal">
            <x-input :title="$t('LastName')" v-model="saveData.familyName" :placeholder="$t('pleaseenter')"></x-input>

            <x-input :title="$t('FirstName')" v-model="saveData.name" :placeholder="$t('pleaseenter')"></x-input>
                <!--show8=true    -->
             <!-- <button @click="getNationality"
                 style="position:absolute;width:100%;height:44px;opacity: 0;z-index:10;"
             >dian</button>
             <x-input :title="$t('nationality')" v-model="saveData.nationality" :placeholder="$t('pleaseSelect')"></x-input> -->
            <div style="position: relative;">
                <button @click="getNationality"
                    style="position:absolute;width:100%;height:44px;opacity: 0;z-index:100"
                >dian</button>
                <popup-picker 
                    :title="$t('nationality')" 
                    :data="nationaldataList" 
                    v-model="nationaldataValue"
                    show-name:true
                    :confirm-text="$t('confirm')"
                    :cancel-text="$t('cancel')"
                    :placeholder="$t('pleaseSelect')">
                </popup-picker>
            </div>
            <x-input :title="$t('passportNumber')" v-model="saveData.passportNumber" :placeholder="$t('pleaseenter')"></x-input>

            <x-input :title="$t('Telephone')" v-model="saveData.contactWay" :placeholder="$t('pleaseenter')"></x-input>

            <x-input :title="$t('email')" v-model="saveData.email" :placeholder="$t('pleaseenter')"></x-input>
        </group>
        <group :title="$t('ProjectDetail')" label-width="5em">
            <x-input :title="$t('ProjectName')" v-model="projectData.projectName" :placeholder="$t('pleaseenter')" :readonly="true"></x-input>
            <x-input :title="$t('developer')" v-model="projectData.developers" :placeholder="$t('pleaseenter')" :readonly="true"></x-input>
        </group>    
        <div class="footer developer-footer">
            
            <!-- <a href="javascript:;" class="button2 bg-primary" @click="updateNewBuildingMemberApply()" v-if="projectData.applyId>0">{{$t('modify')}}</a> -->
            <a href="javascript:;" class="button2 bg-primary" @click="submitData()" >{{$t('Submit')}}</a>
        </div>   
        <!-- <div v-transfer-dom>
            <popup v-model="show8" position="right" width="100%">
                <div class="position-horizontal-demo">
                    <national @close="close()" @getValue="getValue"></national>
                </div>
            </popup>
        </div> -->
    </div>
</template>

<script>
// import national from  './test.vue'
export default {
    // components:{
    //     national
    // },
    data(){
        return{
            saveData:{
                token:this.token,
                projectId:'',
                familyName:'',
                name:'',
                nationality:'',
                passportNumber:'',
                contactWay:'',
                email:'',
                id:''
            },
            projectData: '',
            nationalList:[],
            isShownationalList:false,
            show8:false,
            nationaldataList:[],
            nationaldataValue:[],
            ErrorMsg:'',
            projectId:'',
            id:''
        }
    },
    created() {
        if(sessionStorage.getItem('d_buyData') ){
            this.saveData = JSON.parse(sessionStorage.getItem('d_buyData'));
        }
        this.saveData.token = this.token;
        this.projectData = JSON.parse(sessionStorage.getItem('projectData'));
        this.saveData.projectId = this.projectData.id;        
        this.saveData.id = this.projectData.applyId==0?'':this.projectData.applyId;
        console.log( this.saveData.id  )

        // 防止提交申请但是没有合同签名后直接按浏览器退回，再次修改提交，需每次进入页面就获取applyId，判断是走修改还是新增接口
        this.getDirectSalesDetails();     
    },
    mounted() {        

    },
    methods:{
        verifiData(){
            if(this.saveData.familyName==''){
                this.ErrorMsg = this.$t('p_lastName');
                this.alertTips();
                return false;
            }else if( this.saveData.name=='' ){
                this.ErrorMsg = this.$t('p_firstName');
                this.alertTips();
                return false;
            }else if( this.saveData.nationality=='' ){
                this.ErrorMsg = this.$t('p_nationality');
                this.alertTips();
                return false;
            }else if( this.saveData.passportNumber=='' ){
                this.ErrorMsg = this.$t('p_passportNumber');
                this.alertTips();
                return false;
            }else if( this.saveData.contactWay=='' ){
                this.ErrorMsg = this.$t('p_telephone');
                this.alertTips();
                return false;
            }else if( this.saveData.email=='' ){
                this.ErrorMsg = this.$t('p_email');
                this.alertTips();
                return false;
            }else{
                return true;
            }
        },
        submitData(){
            if(!this.verifiData()){
                 return false;
            }else{
                console.log(this.saveData  )
                this.$axios.post('/api/exterior/member/saveNewBuildingMemberApply',this.$qs.stringify(this.saveData) ).then(res=>{
                    console.log(res.data,res.data.result==0)
                    
                    if(res.data.result==0){
                        this.$router.push({path:'/contract',query:{'projectId':res.data.dataSet.projectId,'id':res.data.dataSet.id}});
                    }else{
                        // this.$vux.toast.text(res.data.message)
                    }
                }).catch(res=>{
                    // this.$vux.toast.text(res.data.message);
                    })                  
            }
           
        },
        // 如果已申购，但是未签名，回显已填过的数据
        getPurchaseApplyDetails(){
            console.log( this.saveData.id,'aaa')
            this.$axios.post('/api/exterior/member/getPurchaseApplyDetails',this.$qs.stringify({id:this.projectData.applyId,token:this.token}) ).then(res=>{
                if(res.data.result==0){
                    let obj = res.data.dataSet;
                    this.saveData.familyName = obj.familyName;
                    this.saveData.name = obj.name;
                    this.nationaldataValue = [obj.nationality];
                    this.saveData.nationality = obj.nationality;
                    this.saveData.passportNumber = obj.passportNumber;
                    this.saveData.contactWay = obj.contactWay;
                    this.saveData.email = obj.email;
                    if(this.saveData.id==0){
                        if(this.$route.query.nationalName &&　this.$route.query.nationalName!=""){
                            this.saveData.nationality = this.$route.query.nationalName;
                            this.nationaldataList = [[this.$route.query.nationalName]]
                            this.nationaldataValue = [this.$route.query.nationalName]
                        } 
                        if(sessionStorage.getItem('d_buyData') ){
                            this.saveData = JSON.parse(sessionStorage.getItem('d_buyData'));
                        }
                    }


                }else{
                    this.$vux.toast.text(res.data.message)
                }
            }).catch(res=>{this.$vux.toast.text(res.data.message);})             
        },
        // 修改个人楼盘申购
        updateNewBuildingMemberApply(){
            if(!this.verifiData()){
                 return false;
            }else{
                this.$axios.post('/api/exterior/member/updateNewBuildingMemberApply',this.$qs.stringify(this.saveData) ).then(res=>{
                    if(res.data.result==0){
                        this.$router.push({path:'/contract',query:{'projectId':res.data.dataSet.projectId,'id':res.data.dataSet.id}});
                    }else{
                        this.$vux.toast.text(res.data.message)
                    }
                }).catch(res=>{this.$vux.toast.text(res.data.message);})  
            }
              
        },
        getNationality(){
            if( sessionStorage.getItem('d_buyData' )){
                sessionStorage.removeItem('d_buyData');
            }
            sessionStorage.setItem('d_buyData', JSON.stringify(this.saveData) )
            
            // this.$router.push({
            //     name:'test',
            //     query:{'type':1}
            //     })
            this.$router.push({
                name:'test',
                query:{'type':1},
            });
        } ,
        close(){
            console.log(111)
            this.show8 = false;
        },
        getValue(val){
            console.log(val)
            this.saveData.nationality = val;
            this.show8 = false;
        },  
        alertTips(){
            this.$vux.alert.show({
                title: 'Tips',
                content: this.ErrorMsg,
                buttonText:'OK',
                onShow () {
                },
                onHide () {
                }
            })
        },  
        
        // 防止提交申请但是没有合同签名后直接按浏览器退回，再次修改提交，需获取applyId，判断是走修改还是新增接口
        getDirectSalesDetails(){
            this.$axios.post('/api/exterior/houses/getDirectSalesDetails',this.$qs.stringify({'id':this.projectData.id,'token':this.token}) ).then(res=>{
                if(res.data.result==0){    
                    sessionStorage.setItem('projectData',JSON.stringify({
                        'projectName':res.data.dataSet.projectName,
                        'developers':res.data.dataSet.developers,
                        'id':res.data.dataSet.id,
                        'applyId':res.data.dataSet.applyId,
                    })) ;
                    this.projectData =  JSON.parse( sessionStorage.getItem('projectData') ) ;
                    this.saveData.id = res.data.dataSet.applyId;
                    if( res.data.dataSet.applyId>0 ){
                        this.getPurchaseApplyDetails();
                    }else{
                        if(this.$route.query.nationalName &&　this.$route.query.nationalName!=""){
                            this.saveData.nationality = this.$route.query.nationalName;
                            this.nationaldataList = [[this.$route.query.nationalName]]
                            this.nationaldataValue = [this.$route.query.nationalName]
                        } 
                    }  
                }
            }).catch(res=>{}) 
        },

    },
}
</script>

