<template>
    <div class="page developers-page apply-page">
        <!-- <header class="developers-header">
            <router-link :to="{path:'/contract',query:{'id':this.$route.query.id,'projectId':this.$route.query.projectId}}"><i class="icon-fanhui-copy1 gray"></i></router-link>
            申请结果
        </header>  -->
        <div class="apply-result">
            {{$t('applications')}}
            <br>
            {{$t('applications2')}}
        </div>   
        <div class="button-box">
            <a href="javascript:;" class="button1 bg-primary" @click="goHome()">{{$t('okIgotIt')}}</a>

            <!-- <a v-if="this.$route.query.id==undefined" href="javascript:;" class="button1 bg-primary" @click="$router.replace('/finance')">{{$t('okIgotIt')}}</a> -->
            
            <template v-if="isAndroid">
                <a v-if="this.$route.query.id" :href="'/api/exterior/member/download/purchase/pdf?projectId='+this.$route.query.projectId+'&token='+this.token" download class="button1 bg-orange">{{$t('downContract')}}</a>
            </template>
            <template v-if="isiOS">
                <a v-if="this.$route.query.id" href="javascript:;" class="button1 bg-orange" @click="getDownLoadUrl()">{{$t('downContract')}}</a>
            </template>
        </div>    
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            url:'',
            isAndroid:false,
            isiOS:false,
        }
    },
    created() {
        console.log(this.$route.query.id);
    },
    mounted() {

        if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.goBack, false);
        }

        console.log(this.isAndroid,'isAndroid' ,this.isiOS,'isiOS' )
    },
    methods:{
        getDownLoadUrl(){
            if( this.isiOS ){
                let url = '/exterior/member/download/purchase/pdf?projectId='+this.$route.query.projectId+'&token='+this.token;
                window.webkit.messageHandlers.DownloadFile.postMessage(url);
                // window.DownloadFile(url);
            }
        },
        goHome(){
            if(this.isAndroid){
                window.android.goHome();
            }else if(this.isiOS  ){
                window.webkit.messageHandlers.goHome.postMessage(0);
            }
        },
        goBack(){
            this.$router.replace({path: '/'});
        }
    },
    destroyed(){
        window.removeEventListener('popstate', this.goBack, false);
    }
}
</script>


