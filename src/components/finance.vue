

<template>
    <div class="page finance-page">
        <div class="banner">
            <img src="../../static/img/banner.png" alt="">
        </div>
        <ul class="dflex-list">
            <li>
                <div class="left">
                    <img src="../../static/img/vip.jpg" alt="">
                </div>
                <div class="right">
                    <p>{{$t('Platform1')}}</p>
                    <p>{{$t('Platform2')}}</p>
                </div>
            </li>
            <li>
                <div class="left">
                    <img src="../../static/img/clock.jpg" alt="">
                </div>
                <div class="right">
                    <p>{{$t('Book1')}}</p>
                    <p>{{$t('Book2')}}</p>
                </div>
            </li>
            <li>
                <div class="left">
                    <img src="../../static/img/money.jpg" alt="">
                </div>
                <div class="right">
                    <p>{{$t('Quick1')}}</p>
                    <p>{{$t('Quick2')}}</p>
                </div>
            </li>
            <li>
                <div class="left">
                    <img src="../../static/img/house.jpg" alt="">
                </div>
                <div class="right">
                    <p>{{$t('Personal1')}}</p>
                    <p>{{$t('Personal2')}}</p>
                </div>
            </li>
        </ul>
        <div class="footer">
            <!-- <router-link class="button1 bg-primary" :to="{path:'/finance_personal'}"> {{$t('Supportservices')}}</router-link> -->
            <a href="javascript:;" class="button1 bg-primary" @click="goToApply(1)">{{$t('Supportservices')}}</a>
       
        </div>
    </div>
</template>
<script>
    export default {
        created() {
            this.goToApply(0);
        },
        methods:{
            goToApply(val){
                this.$axios.post(`/api/exterior/member/info/get?token=${this.token}`).then(res=>{
                    if(val==1){
                        if(res.result==0){
                            this.$router.push({
                                path:'/finance_personal',
                            })
                        }
                    }
                }).catch(err=>{
                })            
            }
        }
    }
</script>

