<template>
    <div class="page finance-page">
        <p class="correct-tip mb10">{{$t('WarmTip')}}</p>
        <group :title="$t('personalInformation')" label-width="5em" class="group1-personal">
                <x-input :title="$t('LastName')" v-model="saveData.familyName" :placeholder="$t('pleaseenter')"></x-input>
                <x-input :title="$t('FirstName')" v-model="saveData.name" :placeholder="$t('pleaseenter')"></x-input>
                <popup-picker 
                    :title="$t('sex')" 
                    :data="sexList" 
                    v-model="sexValue" 
                    @on-show="onShow" 
                    @on-hide="onHide" 
                    @on-change="onChange" 
                    show-name:true
                    :confirm-text="$t('confirm')"
                    :cancel-text="$t('cancel')"
                    :placeholder="$t('pleaseSelect')">
                </popup-picker>
                <datetime :title="$t('dateBirth')" 
                :order-map="{
                    year: 3,
                    month: 2,
                    day: 1
                    }"
                format="DD-MM-YYYY"
                v-model="dateBirth" 
                :minYear="1918"
                @on-confirm="dateConfirm"
                :confirm-text="$t('confirm')"
                :cancel-text="$t('cancel')"
                :placeholder="$t('pleaseSelect')"
                >
                </datetime>
                <popup-picker 
                    :title="$t('isMarried')" 
                    :data="marryList" 
                    v-model="isMarriedValue" 
                    @on-show="onShow" 
                    @on-hide="onHide" 
                    @on-change="onChange" 
                    show-name:true
                    :confirm-text="$t('confirm')"
                    :cancel-text="$t('cancel')"
                    :placeholder="$t('pleaseSelect')">
                </popup-picker>  
                <popup-picker 
                    :title="$t('haveChildren')" 
                    :data="hasChildList" 
                    v-model="haveChildrenValue" 
                    @on-show="onShow" 
                    @on-hide="onHide" 
                    @on-change="onChange" 
                    show-name:true
                    :confirm-text="$t('confirm')"
                    :cancel-text="$t('cancel')"
                    :placeholder="$t('pleaseSelect')">
                </popup-picker>
                    <!-- show8=true -->
                <div style="position: relative;">
                    <button @click="getNationality"
                        style="position:absolute;width:100%;height:44px;opacity: 0;z-index:100;"
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

                <x-input type='number' :title="$t('telephone')" v-model="saveData.telephone" :placeholder="$t('pleaseenter')" ></x-input>

                <x-input type='number' :title="$t('loanAmount')" v-model="saveData.loanAmount" :placeholder="$t('pleaseenter')"></x-input>

                <x-input :title="$t('email')" v-model="saveData.email" :placeholder="$t('pleaseenter')"></x-input>
                
        </group>
        <group :title="$t('social')" label-width="5em">
            <x-input title="Facebook" v-model="saveData.facebook" :placeholder="$t('pleaseenter')"></x-input>
            <x-input title='Twitter' v-model="saveData.twitter" :placeholder="$t('pleaseenter')"></x-input>
            <x-input title='Instagram' v-model="saveData.instagram" :placeholder="$t('pleaseenter')"></x-input>
            <x-input title='Pinterest' v-model="saveData.pinterest" :placeholder="$t('pleaseenter')"></x-input>

            <!-- <popup-picker 
                title="testtesttest" 
                :data="list" 
                v-model="saveData.test" 
                :columns="1"
                @on-show="onShow" 
                @on-hide="onHide" 
                @on-change="onChange" 
                :placeholder="$t('pleaseSelect')" show-name>
            </popup-picker>   -->
        </group>
        <div class="footer">
            <a href="javascript:;" class="button1 bg-primary" @click="submit">{{$t('Submit')}}</a>
            <!-- <div class="tips">
                <p>Tips:</p>
                <div>
                    {{$t('WarmTip')}}
                </div>
            </div>             -->
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
                familyName:'',
                name:'',
                sex:'',
                dateBirth:'',
                isMarried:'',
                haveChildren:'',
                nationality:'',
                passportNumber:'',
                telephone:'',
                loanAmount:'',
                email:'',
                facebook:'',
                twitter:'',
                instagram:'',
                pinterest:'',
                token:this.token,
            },
            sexList:[[this.$t('female'),this.$t('male')]],
            marryList:[[this.$t('unmarried'),this.$t('married')]],
            hasChildList:[[this.$t('none'),this.$t('have')]],
            sexValue:[],
            isMarriedValue:[],
            haveChildrenValue:[],
            nationaldataList:[],
            nationaldataValue:[],
            show8:false,
            shown1:true,
            list:[
                {'value':0,'name':this.$t('female')},
                {'value':1,'name':this.$t('male')},
            ],
            dateBirth:'',
            ErrorMsg:''
        }
    },
    created() {
        if(sessionStorage.getItem('financeData') ){
            this.saveData = JSON.parse(sessionStorage.getItem('financeData'));
            this.dateBirth =  this.saveData.dateBirth1.split('-').reverse().join('-');
            if(this.lang=='zh'){
                if(this.saveData.sex===0){ this.sexValue = ['女']}else 
                if(this.saveData.sex===1){ this.sexValue = ['男']}
                if(this.saveData.isMarried===0){ this.isMarriedValue = ['未婚']}else
                if(this.saveData.isMarried===1){ this.isMarriedValue = ['已婚']}
                if(this.saveData.haveChildren===0){ this.haveChildrenValue = ['没有']}else
                if(this.saveData.haveChildren===1){ this.haveChildrenValue = ['有']}
            }else{
                if(this.saveData.sex===0){ this.sexValue = ['female']}else 
                if(this.saveData.sex===1){ this.sexValue = ['male']}
                if(this.saveData.isMarried===0){ this.isMarriedValue = ['unmarried']}else
                if(this.saveData.isMarried===1){ this.isMarriedValue = ['married']}
                if(this.saveData.haveChildren===0){ this.haveChildrenValue = ['none']}else
                if(this.saveData.haveChildren===1){ this.haveChildrenValue = ['have']}      
            }
        }
    },
    mounted() {
        if(this.$route.query.nationalName &&　this.$route.query.nationalName!=""){
            this.saveData.nationality = this.$route.query.nationalName;
            this.nationaldataList = [[this.$route.query.nationalName]]
            this.nationaldataValue = [this.$route.query.nationalName]
        }   
    },
    methods:{
        getNationality(){
            sessionStorage.setItem('financeData', JSON.stringify(this.saveData) )
            // this.$router.push({
            //     name:'test',
            //     query:{'type':0}
            //     })
            this.$router.push({
                path: '/test',
                query:{'type':0},
            });
        },
        onChange(val){
            if(this.lang=='zh'){
                if(val=='女'){ this.saveData.sex =0 }else 
                if(val=='男'){ this.saveData.sex =1}else
                if(val=='未婚'){this.saveData.isMarried =0}else
                if(val=='已婚'){this.saveData.isMarried =1}else
                if(val=='没有'){this.saveData.haveChildren =0}else
                if(val=='有'){this.saveData.haveChildren =1}
            }else{
                if(val=='female'){ this.saveData.sex =0 }else 
                if(val=='male'){ this.saveData.sex =1}else
                if(val=='unmarried'){this.saveData.isMarried =0}else
                if(val=='married'){this.saveData.isMarried =1}else
                if(val=='none'){this.saveData.haveChildren =0}else
                if(val=='have'){this.saveData.haveChildren =1}                
            }

            // console.log( this.saveData )
        },
        onShow(){

        },
        onHide(){

        },
        close(){
            console.log(111)
            this.show8 = false;
        },
        getValue(val){
            this.saveData.nationality = val;
            this.show8 = false;
        },
        submit(){
            // if(this.saveData.familyName=="" || 
            // this.saveData.name==""  || 
            // this.saveData.sex.toString()==""  || 
            // this.saveData.dateBirth1==""  || 
            // this.saveData.isMarried.toString()==""  || 
            // this.saveData.haveChildren.toString()==""  || 
            // this.saveData.nationality==""  || 
            // this.saveData.passportNumber==""  || 
            // this.saveData.telephone==""  || 
            // this.saveData.loanAmount==""  || 
            // this.saveData.email=="" ){
            //     this.alertTips();
            //     return false;
            // }

            if(this.saveData.familyName==''){
                this.ErrorMsg = this.$t('p_lastName');
                this.alertTips();
                return false;
            }else if( this.saveData.name=='' ){
                this.ErrorMsg = this.$t('p_firstName');
                this.alertTips();
                return false;
            }else if( this.saveData.sex.toString()=='' ){
                this.ErrorMsg = this.$t('p_sex');
                this.alertTips();
                return false;
            }else if( this.saveData.dateBirth1=='' ){
                this.ErrorMsg = this.$t('p_birth');
                this.alertTips();
                return false;
            }else if( this.saveData.isMarried.toString()=='' ){
                this.ErrorMsg = this.$t('p_marrige');
                this.alertTips();
                return false;
            }else if( this.saveData.haveChildren.toString()=='' ){
                this.ErrorMsg = this.$t('p_child');
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
            }else if( this.saveData.telephone=='' ){
                this.ErrorMsg = this.$t('p_telephone');
                this.alertTips();
                return false;
            }else if( this.saveData.loanAmount=='' ){
                this.ErrorMsg = this.$t('p_loanAmount');
                this.alertTips();
                return false;
            }else if( 
                this.saveData.email=='' || 
                !this.saveData.email.match(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/)
                ){
                    if(this.saveData.email==''){
                        this.ErrorMsg = this.$t('p_email');
                    }else{
                        this.ErrorMsg = this.$t('p_emailC');
                        this.saveData.email = ""
                    }
                this.alertTips();
                return false;
            }            
            
            this.saveData.dateBirth = null;
            
            // this.saveData.dateBirth1 =new Date(this.saveData.dateBirth)
            this.$axios.post(`/api/exterior/member/addLoansApply`,
            this.$qs.stringify(this.saveData)
            ).then(res=>{
                if(res.data.result==0){
                    this.$router.push({path:'/contractApplyResult'})
                }
            }).catch(res=>{this.$vux.toast.text(res.data.message);})             
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
        dateConfirm(val){
            console.log(val,'date')
            this.saveData.dateBirth1 = val.split('-').reverse().join('-');
        }
    }
}
</script>

