<template>
  <div class="notify-wrap">
    <uu-sub-tab :menu-array="menu"></uu-sub-tab>
    <no-callback-info v-if="noNotifyUrl"></no-callback-info>
    <div class="notify-list-wrap">
      <div class="no-data-notify notify-list-items" v-if="!notifyList.length">
        暂无消息通知
      </div>
      <div class="notify-list-items"  v-for="(item,$index) in notifyList">
        <div class="item-type">
          <p class="ellipsis">通知类型：{{item.type}}</p>
        </div>
        <div class="item-detail">
          <p class="des ellipsis">通知描述：{{item.intro}}</p>
          <p class="url ellipsis">回调地址：{{item.tokenURL}}</p>
        </div>
        <div class="item-time">
          <p class="create">创建时间：<span>{{item.createTime}}</span></p>
          <p class="edit">上次编辑：<span>{{item.lastEditTime}}</span></p>
        </div>
        <div class="item-handel vam">
          <router-link to="/developer/notify/edit-info">参数介绍</router-link>
          <router-link class="edit-link" to="/developer/notify/edit-info">编辑</router-link>
           <uu-icon type="delete" @click="delNotifyInfo(item.noticeGuid)"></uu-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "notify",
    components:{
      'no-callback-info':()=>import('./default.vue')
    },
    data(){
      return {
        noNotifyUrl:false,
        menu:[
          { title:'消息通知',index:'/developer/notify' },
          {title:'开放API',index:'/developer/api'}
        ],
        notifyList:[],
        pagination:{}
      }
    },
    methods:{
      delNotifyInfo(id){
        this.$http("/dataNotice/discard",{noticeGuid:id}).then(res=>{
          if(res.success){
            this.$tip("删除成功")
          }
        })
      },
      getNotifyList(page){
        page = page || 1;
        this.$http("/dataNotice/page/list",{index:page,length:10}).then(res=>{
          console.log(res)
          if(res.success){
            this.notifyList = res.data.content || [];
            this.pagination = res.data.pagination
          }
        })
      }
    },
    created(){
      this.getNotifyList()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
.notify-list-items{
  margin:20px;
  height: 120px;
  padding:30px 0;
  background: rgba(1,8,20,0.10);
  border: 1px dashed rgba(151,151,151,0.10);
  box-sizing: border-box;
  >div{
    position:relative;
    float: left;
    height: 100%;
    text-align: center;
    box-sizing: border-box;
    font-size:12px;
    &:before{
      content:'';
      position:absolute;
      right: 0;
      top:9px;
      height: calc(100% - 18px);
      width: 1px;
      background:#E7E7E7;
      opacity: 0.25;
    }
  }

  >div:last-child{
    border:none;
    &:before{
      display: none;
    }
  }
  .item-type{
    width: 24%;
    line-height: 58px;
    .ellipsis{
      /*width: 100px;*/
    }
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
