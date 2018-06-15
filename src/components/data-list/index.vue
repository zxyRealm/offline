<template>
  <table class="ob-list-item" width="100%">
    <tr class="ob-list-item-tr">
     <slot :scope="data"></slot>
    </tr>

    <!--<div class="ob-list-sub-item">-->
      <!--<p class="ellipsis">通知类型：{{item.type}}</p>-->
    <!--</div>-->
    <!--<div class="item-type">-->
      <!--<p class="ellipsis">通知类型：{{data.type}}</p>-->
    <!--</div>-->
    <!--<div class="item-detail">-->
      <!--<p class="des ellipsis">通知描述：{{data.intro}}</p>-->
      <!--<p class="url ellipsis">回调地址：{{data.tokenURL}}</p>-->
    <!--</div>-->
    <!--<div class="item-time vam">-->
      <!--<p class="create">创建时间：<span>{{data.createTime}}</span></p>-->
      <!--<p class="edit">上次编辑：<span>{{data.lastEditTime}}</span></p>-->
    <!--</div>-->
    <!--<div class="item-handel vam">-->
      <!--<router-link to="/developer/notify/edit-info">参数介绍</router-link>-->
      <!--<router-link class="edit-link" to="/developer/notify/edit-info">编辑</router-link>-->
      <!--<uu-icon type="delete" @handle="delNotifyInfo(data.noticeGuid)"></uu-icon>-->
    <!--</div>-->
  </table>
</template>

<script>
  import subItem from './sub-item'
    export default {
    components:{
      'ob-list-sub-item':subItem
    },
      name: "ob-list",
      props:{
        data:{
          type:[Array,Object],
          default:()=>({})
        }
      },
      data(){
          return{

          }
      },
      methods:{

      }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .ob-list-item{
    height: 120px;
    background: rgba(1,8,20,0.10);
    border: 1px dashed rgba(151,151,151,0.10);
    box-sizing: border-box;
    margin-bottom: 10px;
    .ob-list-sub-item{
      position: relative;
      padding: 14px 28px;
      box-sizing: border-box;
      text-align: center;
      font-size:12px;
      &:before {
        content: '';
        position: absolute;
        right: 0;
        top:50%;
        margin-top: -20px;
        height: 40px;
        width: 1px;
        background: #E7E7E7;
        opacity: 0.25;
      }
      &:last-child:before{
        display: none;
      }
      p{
        line-height: 1.5;
        margin-bottom: 10px;
        &:last-child{
          margin-bottom: 0;
        }
      }
    }
  }

  .ob-list-items{
    .item-type{
      width: 24%;
      line-height: 58px;
      .ellipsis{
        /*width: 100px;*/
      }
    }
    .item-time span{
      display: inline-block;
      min-width: 112px;
    }
    .item-detail,.item-time{
      width: 24%;
      line-height: 28px;
      .ellipsis{
        float: left;
        padding: 0 20px;
        text-align: left;
      }
    }

    .item-handel{
      width: 28%;
      .edit-link{
        margin: 0  58px 0 36px;
      }
      .delete{
        margin-top: 2px;
      }
    }
  }
</style>
<style lang="scss" rel="stylesheet/scss">

</style>
