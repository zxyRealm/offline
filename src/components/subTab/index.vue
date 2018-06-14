<template>
  <div class="sub-tab-wrap clearfix">
    <div class="sub-tab-main vam">
      <template v-for="(item,$index) in menuArray">
        <router-link v-if="item.index" :to="item.index">{{item.title}}</router-link>
        <a  href="javascript:void (0)" class="text"  v-else>{{item.title}}</a>
        <span v-if="$index!==menuArray.length-1" class="separator"></span>
      </template>
    </div>
    <template v-if="subLink.title">
      <router-link v-if="subLink.index" :to="subLink.index" class="sub-tab-link">{{subLink.title}}</router-link>
      <a  href="javascript:void (0)" class="sub-tab-link" v-else>{{subLink.title}}</a>
    </template>
    <template v-if="subBtn.text">
      <el-button class="affirm medium fr" @click="handleBtn">{{subBtn.text}}</el-button>
    </template>
  </div>
</template>

<script>
    export default {
      name: "uu-sub-tab",
      props:{
        menuArray:{
          type:[Array],
          default:()=>[
            {index:'',title:'个人中心'}
          ]
        },
        subLink:{
          type:[Object],
          default:()=>({
            title:''
          })
        },
        subBtn:{
          type:[Object],
          default:()=>({
            text:''
          })
        }
      },
      methods:{
        handleBtn(){
          if(this.subBtn.index){
            this.$router.push(this.subBtn.index)
          }else {
            this.$emit('handle-btn')
          }
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  //主题内容区tab 菜单样式
  .sub-tab-wrap{
    padding: 20px;
    line-height: 24px;
    height: 24px;
    font-size: 16px;
  .sub-tab-main{
    float: left;
    font-size:16px;
    height: 100%;
    line-height: 24px;
  >a:not(.router-link-active){
    color: #fff;
  }
  >.text{
    cursor: text;
  }
  .separator{
    width:2px;
    margin:0 10px;
    height: 18px;
    background-image: linear-gradient(to top,#813FC5,#1896E6);
    /*background: url("/static/img/s");*/
  }
  }
  .sub-tab-link{
    float: right;
    font-size: 14px;
  }

  }

</style>
