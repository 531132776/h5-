<template>
  <div class="page developers-page sign-page">
<!--touchstart,touchmove,touchend,touchcancel 这-->
    <p class="title">Please sign here</p>
    <canvas id="canvas" width="300" height="300" >Canvas画板</canvas>
    <br>
    <div class="footer">
        <a href="javascript:;" class="cancel-btn" v-on:click="clear">{{$t('cancel')}}</a>
        <a href="javascript:;" class="ok-btn bg-primary" v-on:click="save">{{$t('confirm')}}</a>
    </div>

    <!-- <img v-bind:src="url" alt=""> -->
  </div>
 
</template>

<script>
var draw;
var preHandler = function(e){e.preventDefault();}
var drawimgBool = false;
class Draw {
    constructor(el) {
        this.el = el
        this.canvas = document.getElementById(this.el)
        this.cxt = this.canvas.getContext('2d')
        this.stage_info = canvas.getBoundingClientRect()
        this.path = {
            beginX: 0,
            beginY: 0,
            endX: 0,
            endY: 0
        }
        console.log( this.ctx,'ctx' )
    }
    init(btn) {
        var that = this; 
        
        this.canvas.addEventListener('touchstart', function(event) {
            document.addEventListener('touchstart', preHandler, false); 
            that.drawBegin(event)
        })
        this.canvas.addEventListener('touchend', function(event) { 
            document.addEventListener('touchend', preHandler, false); 
            that.drawEnd()
            
        })
        this.clear(btn)
    }
    drawBegin(e) {
        var that = this;
        window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty()
        this.cxt.strokeStyle = "#000"
        this.cxt.beginPath()
        this.cxt.moveTo(
            e.changedTouches[0].clientX - this.stage_info.left,
            e.changedTouches[0].clientY - this.stage_info.top
        )
        this.path.beginX = e.changedTouches[0].clientX - this.stage_info.left
        this.path.beginY = e.changedTouches[0].clientY - this.stage_info.top
        canvas.addEventListener("touchmove",function(){
            that.drawing(event)
        })

        drawimgBool = true;
    }
    drawing(e) {
        this.cxt.lineTo(
            e.changedTouches[0].clientX - this.stage_info.left,
            e.changedTouches[0].clientY - this.stage_info.top
        )
        this.path.endX = e.changedTouches[0].clientX - this.stage_info.left
        this.path.endY = e.changedTouches[0].clientY - this.stage_info.top
        this.cxt.stroke();
        drawimgBool = true;
    }
    drawEnd() {
        document.removeEventListener('touchstart', preHandler, false); 
        document.removeEventListener('touchend', preHandler, false);
        document.removeEventListener('touchmove', preHandler, false);
        //canvas.ontouchmove = canvas.ontouchend = null
    }
    clear(btn) {
        this.cxt.clearRect(0, 0, 300, 600)
    }
    save(){
       return canvas.toDataURL("image/png")
    }
}

export default {
  data () {
    return {
        url:"",
    }
  },
  mounted() {
      setTimeout(() => {
            draw=new Draw('canvas');
            draw.init();         
      }, 300);
        console.log(drawimgBool,'drawimgBool')
  },
  methods:{
        clear:function(){
            draw.clear();
            drawimgBool = false;
        },
        save:function(){
            var data=draw.save();
            this.url = data;
            // base64图片上传服务器
            var base64String = data;
            var bytes = window.atob(base64String.split(',')[1]);
            // 方法2
            var array = [];
            for(var i = 0; i < bytes.length; i++){
                array.push(bytes.charCodeAt(i));
            }
            var blob = new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
            var fd = new FormData();
            fd.append('submitFile',blob, Date.now() + '.jpg');
            fd.append('token',this.token)

            let config = {
                headers: {'Content-Type': 'multipart/form-data'}
            }
            console.log(drawimgBool,'drawimgBool--------------')
            if(!drawimgBool){
                this.$vux.alert.show({
                    title: 'Tips',
                    content: 'Please sign here',
                    buttonText:'OK',
                })                
            }else{
                this.$axios.post(`/api/exterior/file/upload`,fd,
                config 
                ).then(res=>{
                    if(res.state==0){
                        console.log(res.data);
                        sessionStorage.setItem('signData',JSON.stringify(res.data) );
                        // this.$router.go(-1);
                        this.$router.replace({
                            path:'/contract',
                            query:{'projectId':this.$route.query.projectId,'id':this.$route.query.id,'type':'signed'}
                        })
                    }
                }).catch(res=>{})  
            }          
        },
    } 
} 
</script> 
<style lang="scss" scoped>
#canvas { 
    background: linen; 
    cursor: default; 
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translatex(-50%);
    } 
p.title{
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translatex(-50%);
}
div.footer{
    height: 1.02rem;
    // border-top: 1px solid $light;
    display: flex;
    text-align: center;
    line-height: 1.02rem;
    a{
        width: 50%;
        border-radius: 10px;
        font-size: 0.408rem;
        // @extend .px15 ;
        &.cancel-btn{color: #F39700;border: 1px solid #F39700;margin-right: 10px; }
        &.ok-btn{color:#fff;}
    }
}
</style>
