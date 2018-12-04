<template>
    <div id="testNNN">
        <div class="search">
            <input type="text" name="" id="" :placeholder="$t('pleaseenter')" @keyup="watchNaList(searchKeyword)" v-model="searchKeyword">
            <i class="icon-search"></i>
            <a href="javascript:;" @click="close">Cancel</a>
        </div>
        <div class="search-result" v-show="isShownationalList">
            <ul class="select-list national-select-list" v-show="isShownationalList && nationalList.length!=0">
                <li v-for="(item,idx) in nationalList" :key="idx" @click="getNationality(item)">
                    <i v-if="lang=='zh'">{{item.cn}}</i>
                    <i v-if="lang=='en'">{{item.en}}</i>
                </li>
            </ul>
            <div v-show="isShownationalList" class="space-notice" v-if="nationalList==null || nationalList.length==0">
                <i class="icon-Artboard1"></i>
                <p>NONE</p>
            </div>
        </div>
        <!--城市索引查询-->
        <div class="letter">
            <ul>  
                <li v-for="(item,idx) in letterArr" :key="idx" ><a href="javascript:;" @touchstart="scrollLetter(item,$event)" @touchmove="scrollLetter(item,$event)" :class="item==letterTxt?'active':''">{{item}}</a></li>

            </ul>
        </div>
        <!--城市列表-->
            <div class="container" :style="'transform: translate(0,'+ translateL +')'">
                <div class="nationality" ref="nationality" >
                    <ul>
                        <li v-for="(item,idx) in testData" :key="idx" :id="item.key+1">
                            <p class="title">{{item.key}}</p>
                            <ul class="key-list">
                                <li v-for="(i2,idx2) in item.data" :key="idx2" @click="getNationality(i2)">
                                    <i v-if="lang=='zh'">{{i2.cn}}</i>
                                    <i v-if="lang=='en'">{{i2.en}}</i>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        <div id="showLetter" class="showLetter" v-show="showLetter">A</div>
    </div>
</template>
<style lang="scss" scoped>
.search{
    padding: 20px;
    position: fixed;
    width: 90%;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid #EEEEEE;
    background: #fff;
    input{
        width: 60%;
        height: 30px;
        padding: 0 10px;
        padding-left: 35px;
        border-radius: 5px;
        border: 1px solid #DCDCDC;
        outline: none;
        margin-right: 5px;
    }
    i{
        position: absolute;
        left: 28px;
        margin-top: 9px;
        color: #DCDCDC;
        &::before{
            font-size: 0.4rem;
        }
    }
    a{
        position: absolute;
        // right: 40px;
        margin-top: 8px;
    }
}
.search-result{
    position: fixed;
    top: 0;
    padding-top: 73px;
    width: 100%;
    height: calc(100% - 73px);
    overflow-y: auto;
    background: #fff;
    z-index: 10;
    .select-list li{
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        text-align: left;
        padding-left: 30px;
    }
}
.letter{
    position: fixed;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
    li{
        line-height: 20px;
        a{
            display: inline-block;width: 20px;text-align:center;
            // width: 0.264rem; 
            // height: 0.264rem;
            // line-height: 0.264rem;
            border-radius: 50%;
            font-size: 12px;
            &.active{
                background: #00B660;
            }
        }
    }
}
.container{
    padding-top: 73px;
    background: #fff;
    overflow: hidden;

}
.nationality{
    p.title{
        color: #666666;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        border-bottom: 1px solid #EEEEEE;
    }
    .key-list{
        padding: 0 30px;
        li{
            line-height: 40px;
            height: 40px;
            border-bottom: 1px solid #EEEEEE;
        }
    }
}
.showLetter{
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
    border: 1px solid #EEEEEE;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    color: #00B660;

}
</style>

<script>
import nationalityData from  '../nationality.json'
export default {
    name:'national',
    props:{
        showBool:{
            type: Boolean,
            default: true,
        }
    },
    data(){
        return{
            jsonData:nationalityData.data,
            testData:[],
            letterArr:[],
            showLetter:false,
            nationalList:[],
            isShownationalList:false,
            searchKeyword:'',
            translateL:0,
            letterTxt:'A'
        }
    },
    mounted() {
        this.initJson();
        let _this = this;
        // if (window.history && window.history.pushState) {
        //     history.pushState(null, null, document.URL);
        //     window.addEventListener('popstate', this.goBack, false);
        // }

    },
    methods:{
        //按右侧字母滚动
        scrollLetter(val,e){
            var top = $(window).scrollTop();
            e.preventDefault();//阻止默认滚动
            var touch = e.touches[0];
            var ele = document.elementFromPoint(touch.pageX, touch.pageY - top);
            if (ele.tagName === 'A') {
                var s = $(ele).text();
                this.letterTxt = s.substring(0, 1);
                $(window).scrollTop($('#' + s + '1').offset().top-73);
                $("#showLetter").html(s.substring(0, 1));               
                this.showLetter = true;
                setTimeout(() => {
                    this.showLetter = false;
                }, 300);
            }
        },
        // 搜索国家
        watchNaList(str){
            this.nationalList = [];
            this.isShownationalList = true;
            let val = str.substring(0,1).toUpperCase()+str.substring(1);
            if(this.lang=='zh'){
                this.jsonData.forEach(ele=>{
                    if( ele.cn.indexOf(val) !=-1){
                        this.nationalList.push(ele);
                    }
                })
            }else{
                this.jsonData.forEach(ele=>{
                    if( ele.en.indexOf(val) !=-1){
                        this.nationalList.push(ele);
                    }
                })
            }

            // console.log( this.nationalList )
        },
        //获取搜索选择的国家字段
        getNationality(val){
            this.isShownationalList = false;
            if(this.lang=='zh'){
                this.searchKeyword = val.cn;
            }else{
                this.searchKeyword = val.en;
            }
            this.$emit('getValue',val.en);
            if(this.$route.query.type==0){
                this.$router.replace({
                    name:'finance_personal',
                    query:{'nationalName':this.searchKeyword}
                })
            }else if( this.$route.query.type==1 ){
                this.$router.replace({
                    name:'buyData',
                    query:{'nationalName':this.searchKeyword}
                })
            }
        },
        initJson(){
            let arr = [];
            this.jsonData.forEach(ele=>{
                ele.key = ele.en.substring(0,1);
                arr.push(ele.en.substring(0,1))    
            })            
            // this.testData = this.testData.sort(this.compare('key'));//排序
            
            arr = Array.from(new Set(arr)).sort() ;
            this.letterArr = arr;
            arr.forEach(ele=>{
                let obj = {
                    key:ele,
                    data:[]
                }
                this.jsonData.forEach(fl=>{
                    if(ele == fl.key){
                       obj.data.push(fl) 
                    }
                })
                this.testData.push(obj)
            })

        },
        compare(prop) { //数组对象按字母排序
            return function (obj1, obj2) {
                var val1 = obj1[prop];
                var val2 = obj2[prop];
                if (val1 < val2) {
                    return -1;
                } else if (val1 > val2) {
                    return 1;
                } else {
                    return 0;
                }            
            } 
        },
        close(){
            // this.$emit('close');
            this.$router.go(-1);
        },
        // goBack(){
            
        //     this.$router.go(-2);
        // }
    },
    // destroyed(){
    //     window.removeEventListener('popstate', this.goBack, false);
    // }
}
</script>
