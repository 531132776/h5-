<template>
  <div class="f-layer" v-show="isShow">
    <div class="f-layer-bg" @click="handCancel" v-show="isShow">
      
    </div>
    <transition :name="transitionname" v-show="isShow">
        <div class="f-layer-card" v-show="isShow">
          <header v-show="iShead" class="f-layer-card-head">
            <i @click="handCancel" class="icon-fanhui-copy1 f-layer-card-close"></i><span v-show="title">{{title}}</span>
          </header>
          <section class="f-layer-card-body">
            <slot></slot>
          </section>
          <footer class="f-layer-card-footer" v-show="iSfoot">
              <a href="javascript:void(0)" @click="handOK">保存</a>
          </footer>
        </div>
      </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    props: {
       title: {
        type: String,
        default: '',
      },
      isShow:{
        type: Boolean,
        default: false,
      },
      iShead:{
        type: Boolean,
        default: true,
      },
      iSfoot:{
        type: Boolean,
        default: true,
      },
      transitionname: {
        type: String,
        default: 'fadeInDown',
      },
      Section:{
        type:Array,
        default(){
          return [0,10]
        }
      },
      onOk:{
        type: Function,
        default(){

        }
      },
      onCancel:{
        type: Function,
        default(){
        }
      },
    },
    computed: {

    },
    methods: {
      stop(){

      },
      handOK(){
        this.onOk();
        /*this.isActive = false;
        this.$emit('close');*/
      },
      handCancel(){
        this.onCancel();
        this.isActive = false;
        this.$emit('close');
      },
    },
    computed: {

    },
    mounted(){

    },
    watch: {
     
    }

  }
</script>
<style scoped>
  .f-model{
    position:fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index:999;
  }
  .f-model-bg{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.2);
  }

  .f-model-card{
    width: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    border-radius: 0.1rem;
  }
  .f-model-card-head{
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    padding-left: 0.5rem;
    box-sizing: border-box;
    font-size: 0.35rem;
  }

  .f-model-card-body{
    min-height: 1rem;
    padding: 0.5rem;
    font-size: 0.35rem;
    text-align: center
  ;
  }

  .f-model-card-foot{
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    /*border: 1px solid #000;*/
    display: flex;
    justify-content: space-between;
    color: #E93E36;
    border-top: 1px solid #DADFE3;
  }
  .f-model-card-foot div{
    font-size: 0.35rem;
    flex:1;
    text-align: center;
  }
  .f-model-card-foot div:active{
    background-color: #f7f7f7;
  }
  .f-model-card-foot div:last-child{
    border-left: 1px solid #DADFE3;
  }

</style>
