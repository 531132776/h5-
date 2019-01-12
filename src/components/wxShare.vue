<template>
    <div>
            <div class="share_house">
                    <div class="house_img">
                        <swiper auto loop v-model="demo01_index" @on-index-change="demo01_onIndexChange">
                            <swiper-item class="swiper-demo-img" v-for="(item, index) in houseImg" :key="index">
                                <img class="previewer-demo-img" :src="item" preview>
                            </swiper-item>
                        </swiper>
            
                        <!-- <div class="house_id">
                            <span>{{$t('Housingresources')}} ID：<span>{{houseTypeInfo.id}}</span></span>
                        </div> -->
                        <!-- 收藏 +　分享-->
                        <!-- <div class="house_share_collection">
                            <div class="Collection_house" @click="collectionSuccess">
                                <img :src="defaultComllection ? Collection2 : Collection1" alt="">
                            </div>
                            <div class="share_all" @click="AllkindsOfshare">
                                <img :src="iconshare" alt="">
                            </div>
                        </div> -->
                    </div>
            
                    <div class="price">
                        <!-- 买房状态 -->
                        <span v-if="houseParameter.houseType==1">{{houseTypeInfo.formatPrice}} AED</span>
                        <!-- 租房状态 -->
                        <span v-if="houseParameter.houseType==0">{{houseTypeInfo.formatPrice}} AED/{{$t('Year')}}</span>
                    </div>
                    
                    <ul class="house_rera">
                        <li>
                            <span>{{$t('Housingsourcenumber')}}：{{houseTypeInfo.houseCode}}</span>
                        </li>
                        <li>
                            <span>RERA permit NO：{{houseTypeInfo.reraPermitNo}}</span>
                            <span></span>
                        </li>
                        <li>
                            <span>DED Licence NO：796680</span>
                            <span></span>
                        </li>
                        <li>
                            <span>RERA Registration NO：20666</span>
                            <span></span>
                        </li>
                    </ul>
                    <div class="Specious">
                        {{houseTypeInfo.houseName}}
                    </div>
                    <!-- 房租信息 -->
                    <div class="house_info">
                        <ul class="house_info_one">
                            <li>
                                <span>{{houseTypeInfo.bedroomNum==100 ? $t('studio') : houseTypeInfo.bedroomNum}}</span><span>Bedroom</span>
                            </li>
                            <li><span>{{houseTypeInfo.bathroomNum}}</span><span>Batnrooms</span></li>
                            <li><span>{{houseTypeInfo.houseAcreage}}</span><span>Size in SqFt</span></li>
                        </ul>
                        <ul class="house_info_two">
                            <li><span class="text_gray">{{$t('PropertyType')}}：</span> <span class="text_333">{{houseTypeInfo.housingTypeDictcode}}</span></li>
                            <li><span class="text_gray">{{$t('Buildingname')}}：</span> <span class="text_333">{{houseTypeInfo.buildingName}}</span></li>
                            <li><span class="text_gray">{{$t('Floornumber')}}：</span> <span class="text_333">{{houseTypeInfo.houseFloor}}</span></li>
                            <li><span class="text_gray">{{$t('Furnishingcondition')}}：</span> <span class="text_333">{{houseTypeInfo.houseDecorationDictcode==0 ? $t('befurnished') : $t('Nofurnished')}}</span></li>
                            <!-- 租房状态 -->
                            <li v-if="houseParameter.houseType==0"><span class="text_gray">{{$t('Paymentschedule')}}：</span> <span class="text_333">{{houseTypeInfo.payNode}}</span></li>
                            <!-- 买房状态 -->
                            <li v-if="houseParameter.houseType==1"><span class="text_gray">{{$t('Unitstatus')}}：</span> <span class="text_333">{{houseTypeInfo.housingStatus}}</span></li>
            
                            <li><span class="text_gray">{{$t('Parking')}}：</span> <span class="text_333">{{houseTypeInfo.parkingSpace==1?$t('Yes'):$t('No')}}</span></li>
                            <li v-if="houseParameter.houseType==0"><span class="text_gray">{{$t('Moveindate')}}：</span> <span class="text_333">{{houseTypeInfo.beginRentDate}}</span></li>
                            <li><span class="text_gray">{{$t('Address')}}：</span> <span class="text_333">{{houseTypeInfo.address}}</span></li>
                        </ul>
                    </div>
                    <div class="Housing_Resources_Information">
            
                        <group>
                            <!-- 位置及周边 -->
                            <cell class="map_position" :title="$t('Locationandnearby')" is-link :border-intent="false" :arrow-direction="showContent001 ? 'up' : 'down'"
                                @click.native="googleMap">
                                <img slot="icon" src="../../static/img/location.png" style="width:.5rem; margin-right: .12rem;"></img>
            
                            </cell>
                            <!-- google map -->
                            <div v-show="showContent001" class="googleMapParent">
                                <div id="googleMap" style="width:auto;height:200px;"></div>
                            </div>
                            <!-- <template v-if="showContent001">
                                    
                                
                            </template> -->
                            <!-- 房屋配置A -->
                            <cell :title="$t('FacilitiesandhomeapplicancesA')" is-link :border-intent="false" :arrow-direction="showContent002 ? 'up' : 'down'"
                                @click.native="showContent002 = !showContent002"></cell>
            
                            <template v-if="showContent002">
                                <!-- <cell-form-preview :border-intent="false" :list="list"></cell-form-preview> -->
                                <div class="Housingallocation_A">
                                    <!-- <div v-if="houseTypeInfo.houseDecorationDictcode==0">
                                        暂时无数据...
                                    </div> -->
                                    <ul>
                                        <li v-for="(item,index) in houseA" :key="index">
                                            <div class="li_div_img">
                                                <img :src="item.src" alt="">
                                            </div>
                                            <span v-if="systemLang==0">{{item.text}}</span>
                                            <span v-if="systemLang==1">{{item.text2}}</span>
                                        </li>
            
                                    </ul>
                                </div>
                            </template>
                            <!-- 房屋配置B -->
                            <cell :title="$t('FacilitiesandhomeapplicancesB')" is-link :border-intent="false" :arrow-direction="showContent003 ? 'up' : 'down'"
                                @click.native="showContent003 = !showContent003"></cell>
            
                            <template v-if="showContent003">
                                <!-- <cell-box :border-intent="false" class="sub-item">I'm content 003</cell-box> -->
                                <div class="Housingallocation_A">
                                    <!-- <div v-if="houseTypeInfo.houseConfigDictcode==0">
                                            暂时无数据...
                                    </div> -->
                                    <ul>
                                        <li v-for="(item,index) in houseB" :key="index">
                                            <div class="li_div_img">
                                                <img :src="item.src" alt="">
                                            </div>
                                            <span v-if="systemLang==0">{{item.text}}</span>
                                            <span v-if="systemLang==1">{{item.text2}}</span>
                                        </li>
            
                                    </ul>
                                </div>
                            </template>
                            <!-- 举报 -->
                            <div class="house_Report">
                                <div class="report_left">
                                    <span><img :src="reportleft" alt=""></span><span>Report invalid or false property information</span>
                                </div>
                                <div class="Dividingline"></div>
                                <div class="report_right">
                                    <span>
                                        <img :src="reportright" alt="">
                                    </span>
                                    <span>report</span>
                                </div>
                            </div>
                            <!-- 流程介绍 -->
                            <cell :title="houseParameter.houseType==1 ? $t('BuyingProcess') : $t('RentalProcess')" is-link :border-intent="false" :arrow-direction="showContent004 ? 'up' : 'down'"
                                @click.native="showContent004 = !showContent004"></cell>
            
                            <template v-if="showContent004">
                                <!-- <cell-box :border-intent="false" class="sub-item">I'm content 003</cell-box> -->
                                <div class="Housingallocation_A Process_introduction">
                                    <ul>
                                        <li>
                                            <div class="li_div_img">
                                                <img :src="OnlineBookingImg" alt="">
                                            </div>
                                            <span>{{$t('Onlineappointment')}}</span>
                                        </li>
                                        <li>
                                            <div class="next_img">
                                                <img :src="NextImg" alt="">
                                            </div>
                                        </li>
                                        <li>
                                            <div class="li_div_img">
                                                <img :src="OnlineBargainingImg" alt="">
                                            </div>
                                            <span>{{$t('OnlineNegotiate')}}</span>
                                        </li>
                                        <li>
                                            <div class="next_img">
                                                <img :src="NextImg" alt="">
                                            </div>
                                        </li>
                                        <li>
                                            <div class="li_div_img">
                                                <img :src="Contractpayment" alt="">
                                            </div>
                                            <span>{{$t('Contractpayment')}}</span>
                                        </li>
                                        <li>
                                            <div class="next_img">
                                                <img :src="NextImg" alt="">
                                            </div>
                                        </li>
                                        <li>
                                            <div class="li_div_img">
                                                <img :src="TransferofTitle" alt="">
                                            </div>
                                            <!-- 买房 -->
                                            <span v-if="houseParameter.houseType==1">{{$t('Titledeedcollection')}}</span>
                                            <!-- 租房状态 -->
                                            <span v-if="houseParameter.houseType==0">{{$t('Ejariregistration')}}</span>
                                        </li>
                                    </ul>
                                </div>
                            </template>
                            <!-- 买房常见问题 + 租房常见问题 -->
                            <cell :title="houseParameter.houseType==1 ? $t('BuyerProcessFAQ') : $t('RentalprocessFAQ')" is-link :border-intent="false" :arrow-direction="showContent005 ? 'up' : 'down'"
                                @click.native="showContent005 = !showContent005"></cell>
            
                            <template v-if="showContent005">
                                <!-- <cell-box :border-intent="false" class="sub-item">I'm content 003</cell-box> -->
                                <div class="Common_problem">
                                    <div v-for="(item,index) in BuyArticlesList" :key="index" v-if="houseParameter.houseType==1">
                                        <cell :title="item.articleName" is-link :border-intent="false" :arrow-direction="showContent006[index] ? 'up' : 'down'"
                                            @click.native="commonProblem(index)">
                                            <span slot="icon" class="Common_problem_span">Q{{index}}</span>
                                        </cell>
            
                                        <template v-if="showContent006[index]">
                                            <!-- <cell-box :border-intent="false" class="sub-item">I'm content 003</cell-box> -->
                                            <div class="Common_problem_info">
                                                {{item.articleDesc}}
                                            </div>
                                        </template>
                                    </div>
                                    <div v-for="(item,index) in RentArticlesList" :key="index" v-if="houseParameter.houseType==0">
                                            <cell :title="item.articleName" is-link :border-intent="false" :arrow-direction="showContent006[index] ? 'up' : 'down'"
                                                @click.native="commonProblem(index)">
                                                <span slot="icon" class="Common_problem_span">Q{{index}}</span>
                                            </cell>
                
                                            <template v-if="showContent006[index]">
                                                <!-- <cell-box :border-intent="false" class="sub-item">I'm content 003</cell-box> -->
                                                <div class="Common_problem_info">
                                                    {{item.articleDesc}}
                                                </div>
                                            </template>
                                        </div>
                                    
                                </div>
                            </template>
                            <!-- 查看更多房源 -->
                            <cell :title="$t('Ourreconmmendation')" is-link :border-intent="false" :arrow-direction="moreHouse ? 'up' : 'down'"
                                @click.native="moreHouse = !moreHouse"></cell>
            
                            <template v-if="moreHouse">
                                <!-- <cell-box :border-intent="false" class="sub-item">I'm content 003</cell-box> -->
                                <div class="house_more_list">
                                    <ul>
                                        <!-- 买房状态 -->
                                        <li v-for="(item,index) in buyhouseRecommend" @click="updateAppUrl" v-if="houseParameter.houseType==1">
                                            <div class="house_more_list_left">
                                                <img :src="item.houseMainImg" alt="">
                                            </div>
                                            <div class="house_more_list_right">
                                                <span class="line_clamp_2">{{item.houseName}}</span>
                                                <p>
                                                    <span>{{item.houseAcreage}} SqFt</span>
                                                    <span>
                                                        <i><img src="../../static/img/map.png" alt=""></i> 
                                                        <i>{{item.address}}</i> </span>
                                                </p>
                                                <span class="bot_price">{{item.formatPrice}} AED</span>
                                            </div>
                                        </li>
                                        <!-- 租房状态 -->
                                        <li v-for="(item,index) in renthouseRecommend" v-if="houseParameter.houseType==0" @click="updateAppUrl">
                                                <div class="house_more_list_left">
                                                        <img :src="item.houseMainImg" alt="">
                                                    </div>
                                                    <div class="house_more_list_right">
                                                        <span class="line_clamp_2">{{item.houseName}}</span>
                                                        <p>
                                                            <span>{{item.houseAcreage}} SqFt</span>
                                                            <span>
                                                                <i><img src="../../static/img/map.png" alt=""></i> 
                                                                <i>{{item.address}}</i> </span>
                                                        </p>
                                                        <span class="bot_price">{{item.formatPrice}} AED/{{$t('Year')}}</span>
                                                    </div>
                                        </li>
                                        
                                    </ul>
                                </div>
                            </template>
                        </group>
                    </div>
                    
                    <!-- 收藏提示 -->
                    <!-- <toast v-model="successPositionValue" type="text" :time="800" is-show-mask :text="defaultComllection ? successfollow : Cancelfollow"></toast> -->
                    <!-- 分享弹窗 -->
                    <!-- <div v-transfer-dom class="Popup_Share">
                        <popup v-model="shareToast" @on-hide="log('hide')" @on-show="log('show')">
                            <div class="popupShare">
                                <ul>
                                    <li><img :src="WeChatImg" alt=""><span>WeChat</span></li>
                                    <li><img :src="QQImg" alt=""><span>QQ</span></li>
                                    <li><img :src="QzoneImg" alt=""><span>Qzone</span></li>
                                    <li><img :src="QzoneImg" alt=""><span>Twitter</span></li>
                                </ul>
                                <div @click="shareToast =! shareToast" class="cancel_btn_bootom">
                                    cancel
                                </div>
                            </div>
                        </popup>
                    </div> -->
                </div>
        <!-- 底部按钮 -->
        <div class="bottom_btn">
                <div @click="popupdialing">
                    <span>CALL</span>
                    <span>NOW</span>
                    <!-- <a href="tel:18926484971"></a> -->
                </div>
                <div @click="updateAppUrl">
                    <span>NEGOTIATE</span>
                    <span>PRICE</span>
                </div>
                <div @click="updateAppUrl">
                    <span>VIEWING</span>
                    <span>APPOINTMENT</span>
                </div>
            </div>
            <!-- 打开APP及跳转到对应的应用市场 -->
            <div v-transfer-dom>
                    <popup v-model="Applicationmarket" position="top">
                      <div class="Applicationmarket">
                          <!-- 背景img -->
                            <img :src="UpdateTipsBgImg" alt="">
                            <div class="custom_h">
                                <div class="TipsIndes" v-if="noWxBrowser">
                                    <ul>
                                        <li>{{$t('Ifpleasecorner')}}...</li>
                                        <li v-if="Typesystem==1">{{$t('SelectOpeninSafari')}}</li>
                                        <li v-if="Typesystem==0">{{$t('SelectOpeninBrowser')}}</li>
                                    </ul>
                                    <!-- ios,andriod浏览器logo -->
                                    <div>
                                        <img v-if="Typesystem==1" :src="iosBrowserLogo" alt="">
                                        <img v-if="Typesystem==0" :src="andriodBrowserLogo" alt="">
                                    </div>
                                    <div>
                                        <img :src="Scissorsindication" alt="">
                                    </div>
                                </div>
                                <div class="appAdvertisinglanguage">
                                        <img :src="appLogo" alt="">
                                        <span>
                                            <img :src="RealEstateDirectL" alt="">
                                        </span>
                                </div>
                                <div class="update" v-if="Typesystem==1">
                                    <x-button class="btn" @click.native="iosApp">{{$t('DownloadfromAppstore')}}</x-button>
                                </div>
                                <div class="update" v-if="Typesystem==0">
                                        <x-button class="btn" @click.native="andiordApp">{{$t('DownloadtotheGoogleAppMarket')}}</x-button>
                                    </div>
                            </div>
                      </div>
                    </popup>
                  </div>
    </div>
    
</template>
<script>
    import { Cell, CellBox, CellFormPreview, Group, Confirm, LoadingPlugin, Toast, Popup, Swiper, Previewer, SwiperItem, TransferDom,XButton } from 'vux'
    import houseAimg from '../../static/house_A.json'
    import houseAimg2 from '../../static/house_B.json'
    import commonProblem from '../../static/common_problem.json'
    import google from 'google'
    export default {
        data() {
            return {
                iosBrowserLogo:require(`../../static/img/safari.png`),
                andriodBrowserLogo:require(`../../static/img/androidlogo.png`),
                Scissorsindication:require(`../../static/img/xianduan.png`),
                appLogo:require(`../../static/img/logo.png`),
                RealEstateDirectL:require(`../../static/img/RealEstateDirectL.png`),
                houseImg: [],
                houseId: '13215465',
                houseTypeInfo:{},//房租信息
                showContent001: true,
                showContent002: true,
                showContent003: true,
                showContent004: true,
                showContent005: true,
                showContent006: [...false],
                moreHouse: true,
                houseA: houseAimg.images,//房源配置A
                houseB: houseAimg2.images2,//房源配置B
                common_problem: commonProblem.textAll,//房源问题提问及回答
                Renting: "租房流程介绍",
                BuyAhouse: "买房流程介绍",
                BuyingHousesTitle: "买房常见问题",
                RentalHousesTitle: "租房常见问题",
                RentArticlesList:[],//租房常见问题
                BuyArticlesList:[],//买房常见问题
                OnlineBookingImg: require(`../../static/Process_introduction/icon_1copy.png`),
                NextImg: require(`../../static/Process_introduction/icon_next.png`),
                OnlineBargainingImg: require(`../../static/Process_introduction/icon_2copy.png`),
                Contractpayment: require(`../../static/Process_introduction/icon_3copy.png`),
                TransferofTitle: require(`../../static/Process_introduction/icon_4copy.png`),
                UpdateTipsBgImg: require(`../../static/img/bgimg.png`),
                reportleft: require(`../../static/img/jubao2.png`),
                reportright: require(`../../static/img/jb.png`),
                twitterImg: require(`../../static/img/twitter3.png`),
                WeChatImg: require(`../../static/img/twitter3.png`),
                QQImg: require(`../../static/img/twitter3.png`),
                QzoneImg: require(`../../static/img/twitter3.png`),
                defaultComllection: false,//收藏默认状态
                Collection1: require(`../../static/img/icon_collect1.png`),//收藏
                Collection2: require(`../../static/img/icon_collect.png`),//收藏成功
                successPositionValue: false,//收藏成功或取消收藏的状态loading
                successfollow: "收藏成功",
                Cancelfollow: "取消收藏",
                iconshare: require(`../../static/img/icon_share.png`),//分享
                shareToast: false,//分享弹窗
                list: [{
                    label: 'Apple',
                    value: '3.29'
                }, {
                    label: 'Banana',
                    value: '1.04'
                }, {
                    label: 'Fish',
                    value: '8.00'
                }],
                
                demo01_index: 0,
                houseParameter:{
                    id:'',
                    houseType:'',
                },
                longitude:'',//经度
                latitude:'',//纬度
                buyhouseRecommend:[],//买房房源推荐
                renthouseRecommend:[],//租房房源推荐
                Typeofhouse:'',
                Applicationmarket:false,//应用市场及run app
                Typesystem:'',//ios,andiord
                systemLang:'',//zh,en判断
                language:'',
                noWxBrowser:true,
                token1:'',
                city1:''
            }
        },
        directives: {
            TransferDom
        },
        components: {
            Group,//折叠
            Cell,//折叠
            CellFormPreview,
            CellBox,
            Confirm,//拨号确认取消框
            LoadingPlugin,
            Toast,//收藏状态成功或取消提示框
            Popup, //分享按钮模态弹出框
            Swiper,//头部主图
            Previewer,//预览图片
            SwiperItem,
            XButton
        },
        created(){
            this.$set(this,'language',this.GetUrlParam("language"));
            var _this=this;
            var $body = $('body');
            var $iframe = $('<iframe src="/favicon.ico"></iframe>');
            $iframe.on('load',function() {
            setTimeout(function() {
                $iframe.off('load').remove();
            }, 0);
            }).appendTo($body);

            if(this.language==0){
                document.title = this.$route.meta.titleCn;
                this.$set(this,'systemLang',0);//中文
                this.$i18n.locale = 'zh'
            }else if(this.language==1){
                document.title = this.$route.meta.titleEn;
                this.$set(this,'systemLang',1);//英文
                this.$i18n.locale = 'en'
            }else{
                document.title = this.$route.meta.titleEn;
                this.$set(this,'systemLang',1)//英文
                this.$i18n.locale = 'en'
            }

// var str = 'token=eyJ0eXAiOiJKV1QiLCJhbGciOiJTSEEtMjU2In0=.eyJpc3MiOiJtXzIwMTgxMjA2MjMxODQwODA0IiwiZXhwIjoiRGVjIDI5LCAyMDE4IDM6MDc6NDkgUE0iLCJ1c2VySWQiOiI0NjMxIiwiYXJlYUNvZGUiOiI4NiIsIm1vYmxlIjoiMTg5MjY0ODQ5NzEifQ==.OWNjMWViODE0NGM0NjUwMGUxNGE2NmFlZGE3ZjVmOWE1NjE2MjhhNGYxNWUzYmUyYjMyMmZiZDE3N2NlMTg0ZA==&language=zh&city=shenzhen'

// var token = str.substring(str.indexOf('token=')+6,str.indexOf('&language='))=='http:'?"":str.substring(str.indexOf('token=')+6,str.indexOf('&language='))//截取token
// this.houseParameter.token = token;
// this.token1 = token;
// var city = str.indexOf('&city=')==-1?"":str.substr(str.indexOf('&city=')+6);//截取城市
// this.city1 = city

            this.$set(this.houseParameter,'id',this.GetUrlParam("id"));
            this.$set(this.houseParameter,'houseType',this.GetUrlParam("houseType"));
            
            //推荐房源
            this.houseRecommend();
            this.Typeofhouse = this.houseParameter.houseType;
            
        },
        mounted() {
            // var ua = navigator.userAgent.toLowerCase();
            // alert(ua)
            // if(ua.indexOf('nettype')>-1 && ua.indexOf('webp') > -1){
                // alert(1)
            // }if(ua.indexOf('nettype') == -1 && ua.indexOf("webp") == -1){
              //qq浏览器
            //   alert(2)
        //   }
            //google Map
            //获取房屋详情
            this.getHouseDetail();
            
        },
        methods: {
             GetUrlParam(paraName) {
                //var url = "http://192.168.0.254:8099/?from=singlemessage#/wxShare?id=2116&houseType=1&language=0";
                // var url = 'http://192.168.0.254:8099/?from=singlemessage&isappinstalled=0#/wxShare?id=2076&houseType=1&language=0'
                // var url = 'http://192.168.0.254:8099/?#/wxShare?id=2076&houseType=1&language=0'
        　　　　var url = window.location.href;
                // alert(url)
        　　　　var arrObj = url.split("?");
                        // alert(arrObj)
        　　　　if (arrObj.length > 0) {
                        if(url.indexOf('from') != -1){
                            var arrPara = arrObj[2].split("&");
                        }else {
                            var arrPara = arrObj[1].split("&");
                        }
        　　　　　　var arr;
                    console.log(arrPara)
        　　　　　　for (var i = 0; i < arrPara.length; i++) {
        　　　　　　　　arr = arrPara[i].split("=");

        　　　　　　　　if (arr != null && arr[0] == paraName) {
        　　　　　　　　　　return arr[1];
        　　　　　　　　}
        　　　　　　}
        　　　　　　return "";
        　　　　}
        　　　　else {
        　　　　　　return "";
        　　　　}
        　　},
           
            //获取房屋详情
            getHouseDetail(){
                // console.log(this.houseParameter)
                this.$axios.post('/api/exterior/houses/getHouseDetail',this.$qs.stringify(this.houseParameter)).then(res => {
                    // console.log(res)
                    if(res.result == 0){
                        this.houseTypeInfo = res.dataSet.houses || {};
                        this.houseImg = res.dataSet.houseSubImg || [];

                        this.$set(this,'latitude',this.houseTypeInfo.latitude)
                        this.$set(this,'longitude',this.houseTypeInfo.longitude)
                        console.log(this.longitude,this.latitude,'狗粉丝的风格')
                        this.initialize(this.longitude,this.latitude)
                        google.maps.event.addDomListener(window, 'load', this.initialize(this.longitude,this.latitude));

                        var a = this.houseTypeInfo.beginRentDate;
                        // alert(this.houseTypeInfo.beginRentDate)
                        if(this.houseTypeInfo.beginRentDate != null){
                            var newa = a.split(" ");
                            this.$set(this.houseTypeInfo,'beginRentDate',newa[0]);
                        }
                        else{
                            console.log(a)
                        }
                            // this.renthouseRecommend = res.dataSet.recommendHouses.rent || [];//租房房源推荐
                            // this.buyhouseRecommend = res.dataSet.recommendHouses.sell || [];//买房房源推荐
                        this.getFloatStr(this.houseTypeInfo.houseAcreage)
                        if(this.language==0){
                            //租房状态的常见问题
                            var RentArticlesList = res.dataSet.faq.hs_app_index_buyer_rent_question_cn.articlesList || [];
                        
                            //买房状态的常见问题
                            var BuyArticlesList = res.dataSet.faq.hs_app_index_buyer_buy_question_cn.articlesList || [];
                        }else if(this.language==1){
                            //租房状态的常见问题
                            var RentArticlesList = res.dataSet.faq.hs_app_index_buyer_rent_question_en.articlesList || [];
                        
                            //买房状态的常见问题
                            var BuyArticlesList = res.dataSet.faq.hs_app_index_buyer_buy_question_en.articlesList || [];
                        }else{
                            //租房状态的常见问题
                            var RentArticlesList = res.dataSet.faq.hs_app_index_buyer_rent_question_en.articlesList || [];
                        
                            //买房状态的常见问题
                            var BuyArticlesList = res.dataSet.faq.hs_app_index_buyer_buy_question_en.articlesList || [];
                        }
                        
                        
                        //houseTyp 0：租房; 1：买房
                        if(this.houseParameter.houseType == 0){
                            // this.RentArticlesList = RentArticlesList
                            this.$set(this,'RentArticlesList',RentArticlesList)

                        }else if(this.houseParameter.houseType == 1){
                            // this.BuyArticlesList = BuyArticlesList;
                            this.$set(this,'BuyArticlesList',BuyArticlesList)
                        }
                        //支付节点(固定值)
                        if(this.houseTypeInfo.payNode == 1){
                            this.$set(this.houseTypeInfo,'payNode',this.$t('onechequeyear'))
                        }
                        if(this.houseTypeInfo.payNode == 2){
                            this.$set(this.houseTypeInfo,'payNode',this.$t('twochequeyear'))
                        }
                        if(this.houseTypeInfo.payNode == 4){
                            this.$set(this.houseTypeInfo,'payNode',this.$t('fourchequeyear'))
                        }
                        if(this.houseTypeInfo.payNode == 6){
                            this.$set(this.houseTypeInfo,'payNode',this.$t('sixchequeyear'))
                        }
                        if(this.houseTypeInfo.payNode == 12){
                            this.$set(this.houseTypeInfo,'payNode',this.$t('Twelvechequeyear'))
                        }
                        this.getdict(this.houseTypeInfo);//房屋状态
                        this.typeofHouse(this.houseTypeInfo);//房屋类型
                        this.Houseimgallocation(this.houseTypeInfo);//房源配置
                        this.HouseimgMatching(this.houseTypeInfo);//房源配套
                    }
                }).catch(err=>{
                    console.log(err)
                }).finally(() => this.$vux.loading.hide()); 
            },
            
            getFloatStr(num){
                            num += '';  
                            num = num.replace(/[^0-9|\.]/g, ''); //清除字符串中的非数字非.字符  
                            if(/^0+/) //清除字符串开头的0  
                               num = num.replace(/^0+/, '');  
                           if(!/\./.test(num)) //为整数字符串在末尾添加.00  
                                num += '.00';  
                            if(/^\./.test(num)) //字符以.开头时,在开头添加0  
                                num = '0' + num;  
                            num += '00';        //在字符串末尾补零  
                           num = num.match(/\d+\.\d{2}/)[0];
                           console.log(num)
                           this.$set(this.houseTypeInfo,'houseAcreage',num)
                        },
                        
            //房屋状态
            getdict(houseTypeInfo){
                var type=2
                this.$axios.post('/api/exterior/get/dict/'+`${type}`).then(res =>{
                    var arr= [];
                    arr = res.dataSet.items;
                    var findVal = arr.find(item => { return item.id == houseTypeInfo.housingStatus})
                    
                    if(this.language==0){
                        this.$set(this.houseTypeInfo,'housingStatus',findVal.itemValue);
                    }else if(this.language==1){
                        this.$set(this.houseTypeInfo,'housingStatus',findVal.itemValueEn);
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            //房屋类型
            typeofHouse(houseTypeInfo){
                var type=1
                this.$axios.post('/api/exterior/get/dict/'+`${type}`).then(res =>{
                    var arr= [];
                    arr = res.dataSet.items;
                    var findVal = arr.find(item => { return item.id == houseTypeInfo.housingTypeDictcode})
                    if(this.language==0){
                        this.$set(this.houseTypeInfo,'housingTypeDictcode',findVal.itemValue);
                    }else if(this.language==1){
                        this.$set(this.houseTypeInfo,'housingTypeDictcode',findVal.itemValueEn);
                    }
                    
                }).catch(err => {
                    console.log(err)
                })
            },
            //房屋配置B
            Houseimgallocation(houseTypeInfo){
                var type=0
                this.$axios.post('/api/exterior/get/dict/'+`${type}`).then(res =>{
                    console.log('房屋配置B:',res);
                    var newarr = res.dataSet.items || [];
                    var houseB = this.houseB;
                    var houseimg = [];
                    var arr = [];
                    houseimg = houseTypeInfo.houseConfigDictcode.split(',');
                    for(var n in houseimg){
                        if(houseimg[n] == houseB[n].id){
                            arr.push({"src":houseB[n].src,"text":houseB[n].text,"text2":houseB[n].text2})
                        }else{
                            for(var j in houseB){
                                if(houseB[j].id == houseimg[n]){
                                    arr.push({"src":houseB[j].src,"text":houseB[j].text,"text2":houseB[j].text2})
                                }
                            }
                        }
                    }
                    console.log(arr);
                    this.$set(this,'houseB',[...arr])
                }).catch(err => {
                    console.log(err)
                })
            },
            //房屋配套A
            HouseimgMatching(houseTypeInfo){
                console.log(houseTypeInfo.houseSelfContainedDictcode)
                var type=3
                this.$axios.post('/api/exterior/get/dict/'+`${type}`).then(res =>{
                    console.log('房屋配套A:',res);
                    var newarr = res.dataSet.items || [];
                    var houseA = this.houseA;
                    var houseimg = [];
                    var arr = [];
                    houseimg = houseTypeInfo.houseSelfContainedDictcode.split(',');
                    // console.log(houseimg)
                    for(var n in houseimg){
                        if(houseimg[n] == houseA[n].id){
                            arr.push({"src":houseA[n].src,"text":houseA[n].text,"text2":houseA[n].text2})
                        }else{
                            for(var j in houseA){
                                if(houseA[j].id == houseimg[n]){
                                    arr.push({"src":houseA[j].src,"text":houseA[j].text,"text2":houseA[j].text2})
                                }
                            }
                        }
                    }
                    console.log(arr)
                    this.$set(this,'houseA',[...arr]);
                }).catch(err => {
                    console.log(err)
                })
            },
            //房源推荐
            houseRecommend(){
                this.$axios.post('/api/exterior/member/recommendHouses',this.$qs.stringify({token:'',city:''})).then(res => {
                    console.log(res)
                    this.renthouseRecommend = res.dataSet.rent || [];//租房房源推荐
                    this.buyhouseRecommend = res.dataSet.sell || [];//买房房源推荐
                }).catch(err =>{
                    console.log(err)
                }).finally(() => this.$vux.loading.hide());
            },
            //展开地图
            googleMap() {
                this.showContent001 = !this.showContent001;
                // this.showContent001 ? this.initialize(this.longitude,) : null;
            },
            //map 地图
            initialize(longitude,latitude) {
                console.log(latitude,longitude)
                var myCenter = new google.maps.LatLng(latitude,longitude);//经纬度
                var mapProp = {
                    center: myCenter,
                    zoom: 14,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
                var marker = new google.maps.Marker({
                    position: myCenter,
                    title: 'Click to zoom'
                });
                marker.setMap(map);
                // var contentString = `<div>
                //         <span>
                //           当前位置:
                //         </span>
                //         <span>深圳湾科技生态园9A-1 3612</span>
                //     </div>`
                // var infowindow = new google.maps.InfoWindow({
                //     content: contentString
                // })
                // infowindow.open(map, marker);//显示地址信息

                //显示经纬度
                var coordsDiv = document.getElementById('latLng');
                map.controls[google.maps.ControlPosition.TOP_CENTER].push(coordsDiv);
                // map.addListener('mousemove', (event) => {
                //   coordsDiv.textContent =
                //     'lat: ' + Math.round(event.latLng.lat()) + ', ' +
                //     'lng: ' + Math.round(event.latLng.lng());

                // })
                // Zoom to 9 when clicking on marker
                google.maps.event.addListener(map, 'click', function (event) {
                    map.setZoom(9);
                    //marker=new google.maps.Marker({
                    // position: new google.maps.LatLng(event.pa.x,event.pa.y),
                    // title:'Click to zoom'
                    //});
                    marker.setMap(map);
                    console.log(event.pixel.x);
                    console.log(event.pixel.y);
                    // map.setCenter(marker.getPosition());
                });
            },

            //头部轮播主图
            demo01_onIndexChange(index) {
                // alert(1)
                this.demo01_index = index;
            },

            //跳转到APP install页面
            updateAppUrl() {
                this.Applicationmarket = true;//打开应用市场提示弹窗
                var that = this;
                if(this.isAndroid){
                    this.$set(this,'Typesystem',0);
                            window.location.href = "hisandy://ucinternational.com"
                            window.setTimeout(function() {
                                window.location.href = "https://play.google.com/store/apps/details?id=com.ucinternational"
                            }, 2000)
                }else if(this.isiOS){
                    this.$set(this,'Typesystem',1);
                    //ios app协议
                            window.location.href = "HiSandy://"
                            window.setTimeout(function() {
                                window.location.href = "https://itunes.apple.com/us/app/hisandy-real-estate/id1434680051"
                            }, 2000)
                }else {
                    this.$set(this,'Typesystem',0);
                            window.location.href = "hisandy://ucinternational.com"
                            window.setTimeout(function() {
                                window.location.href = "https://play.google.com/store/apps/details?id=com.ucinternational"
                            }, 2000)
                }
                
                // if(this.isWeiXin() && this.isQQ() && isFaceBook()){
                //         console.log('weixin')
                //         this.noWxBrowser = true;
                //     }else{
                //         this.noWxBrowser = false;
                //     }
            },
            //判断是否是微信浏览器的函数
            isWeiXin(){
                //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
                var ua = window.navigator.userAgent.toLowerCase();
                //通过正则表达式匹配ua中是否含有MicroMessenger字符串
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                    return true;
                }else{
                    return false;
                }
            },
            isQQ(){
                var ua = window.navigator.userAgent.toLowerCase();
                if(ua.match(/QQ/i) == "qq") {
                    return true;
                }else{
                    return false;
                }
            },
            isFaceBook(){
                var aa = window.navigator.userAgent.toLowerCase();
                if(aa.indexOf('fbop') != -1){
                    return true;
                }else{
                    return false;
                }
            },
            iosApp(){
                //ios app协议
                    window.location.href = "HiSandy://"
                    window.setTimeout(function() {
                        window.location.href = "https://itunes.apple.com/us/app/hisandy-real-estate/id1434680051"
                    }, 2000)
            },
            andiordApp(){
                //andiord app协议
                    window.location.href = "hisandy://ucinternational.com"
                    window.setTimeout(function() {
                        window.location.href = "https://play.google.com/store/apps/details?id=com.ucinternational"
                    }, 2000)
            },
            //分享弹窗
            // AllkindsOfshare() {
            //     this.shareToast = true
            // },
            // log(str) {
            //     console.log(str)
            // },

            //收藏
            collectionSuccess() {
                this.$vux.loading.show({
                    text: 'Loading'
                })
                setTimeout(() => {
                    this.$vux.loading.hide()
                }, 2000)

                setTimeout(() => {
                    this.successPositionValue = true
                }, 2500)

                this.defaultComllection = !this.defaultComllection;
            },
            //拨号
            popupdialing() {
                this.$vux.confirm.show({
                    // title: 'Title',
                    content: '97143814570',
                    confirmText: "呼叫",
                    onShow() {
                        console.log('plugin show')
                    },
                    onHide() {
                        console.log('plugin hide')
                    },
                    onCancel() {
                        console.log('plugin cancel')
                    },
                    onConfirm() {
                        console.log('plugin confirm')
                        window.location.href = 'tel://' + 9714381470
                    }
                })
            },
            //举报
            // reportClick(){
            //     alert(1)
            // },
            //问答
            commonProblem(index) {
                // console.log(index)
                this.$set(this.showContent006, index, !this.showContent006[index])
            }
        },

    }
</script>
<style lang="scss">
    .Applicationmarket{
        height: 6.6rem;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-content: center;
        background: -webkit-linear-gradient(left,#D56939, #784329); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right,#D56939, #784329,); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right,#D56939, #784329,); /* Firefox 3.6 - 15 */
        background: linear-gradient(right,#D56939, #784329,); /* 标准写法 */
        /* background: url('../../static/img/bgimg.png') no-repeat; */
        /* background-size: cover; */
        position: relative;
        .custom_h{
            position: absolute;
            right: 0;
            left: 0;
            top:0;
            bottom: 0;
            z-index: 111;
            height: 100%;
            display: flex;
            justify-content: space-around;
            flex-flow: column nowrap;
        .TipsIndes{
            display:flex;
            flex-flow:row nowrap;
            justify-content:center;
            align-items:flex-end;
            padding-bottom: .31rem;
            ul{
                display: flex;
                flex-flow: column nowrap;
                padding: 0 .24rem;
                flex:1 1;
                li{
                    padding: .1rem 0;
                    color:#fff;
                    font-size: .28rem;
                    white-space: pre-wrap;
                    overflow: hidden;
                }
            }
        }
        .appAdvertisinglanguage{
            padding-bottom: .31rem;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            
            span{
                padding-top: .2rem;
            }
        }
        .update{
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            .btn{
                width: auto;
                background:#F16622;
                font-size: .31rem;
                color: #fff;
            }
            .weui-btn_default:not(.weui-btn_disabled):active{
                background-color: rgb(224, 98, 35);
                color: #fff;
            }
        }
    }
    }
    #latLng {
        transform: translateX(-25%);
        background: rgba(0, 0, 0, .5);
        color: #fff;
        font-size: 16px;
    }

    .animate {
        max-height: 9999px;
        transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
        transition-delay: 0s;
    }

    .slide {
        padding: 0 20px;
        overflow: hidden;
        max-height: auto;
        transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
    }

    .sub-item {
        color: #888;
    }

    .text_gray {
        color: #999999
    }

    .text_333 {
        color: #333;
    }

    .swiper-demo-img img {
        width: 100%;
    }

    .Popup_Share {
        .vux-popup-dialog {
            background: none;
            overflow: hidden;

            .popupShare {
                ul {
                    margin-bottom: .2rem;
                    background-color: #fff;
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-around;
                    padding: .24rem .31rem;

                    li {
                        display: flex;
                        flex-flow: column nowrap;
                        align-items: center;

                        span {
                            padding-top: .12rem;
                            font-size: .25rem;
                        }
                    }
                }

                .cancel_btn_bootom {
                    background-color: #fff;
                    font-size: .33rem;
                    padding: .31rem;
                    text-align: center;
                }


            }
        }
    }
    .bottom_btn {
            position: fixed;
            bottom: 0;
            right: 0;
            left: 0;
            z-index: 3;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            padding: 0 .04rem;
            background-color: #fff;

            div {
                font-size: .33rem;
                color: #fff;
                background-color: #009345;
                width: 33%;
                display: flex;
                flex-flow: column nowrap;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                padding: .33rem 0;

                span:nth-child(1) {
                    padding-bottom: .15rem;
                }
            }
        }
    .share_house {
        position:absolute;
        top:0;
        right: 0;
        left: 0;
        /* bottom: 1.5rem; */
        z-index: 1;
        height: calc(100% - 1.5rem);
        margin-bottom:1.5rem;
        -webkit-overflow-scrolling: touch;
        overflow-y: scroll;
        /* overflow-y: auto; */
        .Housing_Resources_Information {
            /* margin-bottom: 1.6rem; */

            .weui-cells {
                margin-top: .1rem;

                &:after {
                    border-bottom: none;
                }

                .googleMapParent {
                    padding: 0 .2rem .2rem;

                    .gmnoprint {
                        display: none;
                    }
                }

                .weui-cell {
                    background-color: #F16622;
                    margin-bottom: .2rem;
                    color: #fff;

                    .weui-cell__ft:after {
                        width: .2rem;
                        height: .2rem;
                        margin-top: -.13rem;
                        border-color: #fff
                    }

                    .vux-cell-primary {
                        font-size: .33rem;
                        width: 80%;
                        p{
                            .vux-label{
                                width: 100%;
                                overflow: hidden;
                                /* white-space: nowrap; */
                                text-overflow: ellipsis;
                            }
                        }
                    }
                    .Common_problem_span{
                        margin-right: .24rem;
                        font-size: .33rem;
                        /* transform: translateY(-.08rem); */
                        /* display: inline-block; */
                        color: #009345;
                    }
                }

                .Common_problem {
                    margin-top: -.2rem;

                    .weui-cell {
                        background: none;
                        color: #F16622;
                        margin-bottom: 0;

                        .vux-cell-primary {
                            font-size: .31rem;
                        }

                        .weui-cell__ft:after {
                            border-color: #666666;
                            width: .13rem;
                            height: .13rem;
                        }
                    }

                    .Common_problem_info {
                        font-size: .28rem;
                        padding: .24rem .31rem;
                        position: relative;
                        color: #999;
                        line-height: .43rem;
                        &:before {
                            position: absolute;
                            bottom: 0;
                            left: .31rem;
                            right: .31rem;
                            height: 0;
                            border-bottom: solid #ccc 1px;
                            -webkit-transform: scaleY(0.5);
                            transform: scaleY(0.5);
                            content: "";
                        }
                    }
                }

                .house_Report {
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    padding: .1rem .31rem;
                    background-color: #F16622;
                    margin-bottom: .2rem;
                    color: #fff;
                    position: relative;

                    .report_left {
                        display: flex;
                        flex-flow: row nowrap;
                        align-items: center;

                        span {
                            font-size: .25rem;
                            margin-right: .16rem;
                        }
                    }

                    .Dividingline {
                        position: absolute;
                        width: .011rem;
                        background-color: #fff;
                        height: 60%;
                        top: 20%;
                        right: 1.3rem;
                        z-index: 2;
                    }

                    .report_right {
                        display: flex;
                        flex-flow: column nowrap;
                        align-items: center;
                        white-space: nowrap;
                        span:nth-child(2) {
                            font-size: .25rem;
                            padding-top: .02rem;
                        }
                    }
                }

                .Housingallocation_A {
                    padding: .24rem .31rem;

                    ul {
                        display: flex;
                        flex-flow: row wrap;
                        justify-content: flex-start;

                        li {
                            width: 20%;
                            /* padding: .2rem 0; */
                            display: flex;
                            flex-flow: column nowrap;
                            justify-content: space-around;
                            align-items: center;

                            .li_div_img {
                                border: 1px dashed #ccc;
                                width: .8rem;
                                height: .8rem;
                                display: flex;
                                align-items: center;
                                justify-content: center;

                                img {
                                    max-width: 100%;
                                    display: block;
                                }
                            }

                            .next_img {
                                width: .4rem;
                                height: .4rem;

                                img {
                                    width: 100%;
                                    display: block;
                                }
                            }

                            span {
                                padding-top: .12rem;
                                font-size: .23rem;
                                color: #666666;
                                text-align: center;
                                display: inline-block;
                                height: .8rem;
                            }
                        }
                    }
                }

                .Process_introduction {
                    ul {
                        flex-flow: row nowrap;
                        justify-content: space-around;

                        li {
                            padding: 0;

                            .li_div_img {
                                border: none;
                                width: 1rem;
                                height: 1rem;

                                img {
                                    width: 100%;
                                }
                            }

                            span {
                                font-size: .24rem;
                                /* height: auto; */
                            }
                        }
                        li:nth-of-type(even){
                            width: 16%;
                        }
                    }


                }
            }

            .house_more_list {
                /* padding: .24rem .31rem; */
                ul{
                    display:flex;
                    flex-flow:column nowrap;
                    justify-content: flex-start;
                    li{
                        padding: .24rem .31rem;
                        display: flex;
                        flex-flow: row nowrap;
                        position: relative;
                        
                        &:after{
                            position: absolute;
                            bottom: 0;
                            left: .24rem;
                            right: .24rem;
                            height: 0;
                            border-bottom: 1px solid #ccc;
                            -webkit-transform: scaleY(.5);
                            transform: scaleY(.5);
                            content: "";
                        }
                        .house_more_list_left{
                            width: 6.66rem;
                            /* height: 1.84rem;  */
                            margin-right: .31rem;
                            height: 2.3rem;
                            border-radius: 0.15rem;
                            overflow: hidden;
                            img{
                                display: block;
                                width: 100%;
                                /* height: 100%; */
                                border-radius: 0.15rem;
                            }
                        }
                        .house_more_list_right{
                            display: flex;
                            flex-flow: column nowrap;
                            flex: 1 1 100%;
                            .line_clamp_2{
                                color: #333;
                                font-size: .31rem;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                                display: -webkit-box;
                            }
                            p{
                                display: flex;
                                flex-flow: row nowrap;
                                /* justify-content: space-between; */
                                font-size: .28rem;
                                color: #666;
                                padding: .14rem 0;
                                span:nth-child(1){
                                    padding-right: .24rem;
                                    width:33%;
                                }
                                span:nth-child(2){
                                    width:67%;
                                    img{
                                        width: .2rem;
                                        height: .28rem;
                                    }
                                }
                            }
                            .bot_price{
                                font-size: .31rem;
                                color: #F16622;
                            }
                        }
                    }
                    li:last-child{
                        &:after{
                            border:none;
                        }
                    }
                }
            }
        }

        .house_info {
            padding: .24rem .31rem;

            .house_info_two {
                display: flex;
                flex-flow: column nowrap;
                justify-content: space-around;
                padding-top: .1rem;

                li {
                    padding: .2rem 0;
                }
            }

            .house_info_one {
                padding: .3rem 0;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                position: relative;

                &:before {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 0;
                    border-bottom: solid #ccc 1px;
                    -webkit-transform: scaleY(0.5);
                    transform: scaleY(0.5);
                    content: "";
                }

                li {
                    display: flex;
                    flex-flow: column nowrap;
                    padding: 0 .2rem;

                    span:first-child {
                        color: #F16622;
                        font-size: .35rem;
                        margin-bottom: .3rem;
                    }

                    span:last-child {
                        font-size: .3rem;
                        color: #666666;
                    }
                }

                li:nth-child(2),
                li:nth-child(3) {
                    border-left: 1px solid #ccc;
                    padding-left: .26rem;
                }
            }
        }

        .Specious {
            padding: .35rem .31rem;
            line-height: .5rem;
            background-color: #F2F2F2;
            color: #606060;
            font-size: .35rem;
            font-weight: 400;
        }

        .house_rera {
            padding: .24rem .31rem;
            height: 1.8rem;
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-around;
            align-items: flex-start;
        }

        .price {
            padding: .24rem .31rem;
            background-color: #F16622;
            font-size: .5rem;
            color: #fff;
        }

        .house_img {
            position: relative;
            height: 3.88rem;
            border-bottom: 1px solid #ccc;

            .vux-swiper {
                height: 3.91rem !important;
            }

            .img_responsive {
                max-width: 100%;
                display: block;
                /* height: 100%; */
                background: #ccc;
            }

            .house_id {
                position: absolute;
                z-index: 2;
                left: 0.31rem;
                bottom: 0.3rem;
                color: #fff;
            }

            .house_share_collection {
                position: absolute;
                bottom: -0.5rem;
                right: 0.31rem;
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-end;
                /* .Collection_house,
                .share_all {
                    height: 0.9rem;
                    width: 0.9rem;
                    border-radius: 100%;
                    background-color: #fff;
                    box-shadow: 0px 3px 8px rgba(0, 0, 0, .3);
                } */

                .Collection_house {
                    margin-right: .21rem;
                }
            }
        }
    }
    @media screen and (max-width: 320px){
        .Process_introduction ul li span {
            height: auto !important;
        }
    }
    @media screen and (max-width: 380px) and (min-width: 320px){
        .Process_introduction ul li span {
            height: .9rem !important;
        }
    }

    
</style>