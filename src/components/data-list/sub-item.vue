<template>
  <td class="ob-list-sub-item">

    <p v-if="!router" v-for="(item,$index) in propList" :key="$index">
      <span>{{labelList[$index]?labelList[$index]+'：':''}}</span><span class="ellipsis">{{format(data[item])}}</span>
    </p>
    <p  v-if="router">
      {{label}}<br>
      <router-link :to="router">{{text}}</router-link>
    </p>
    <slot></slot>
  </td>
</template>

<script>
  import { parseTime } from '@/utils'
  export default {
    name: "ob-list-item",
    props: {
      router:{
        type:[String],
        default:''
      },
      text:{
        type:[String],
        default:''
      },
      wrap:{
        type:[Boolean],
        default:true
      },
      type:{
        type:[String],
        default:''
      },
      prop: {
        type: [String],
        default: ''
      },
      label: {
        type: [String],
        default: ''
      },
      data: {
        type: [Object],
        default: () => ({})
      },
      filter:{
        type:[Function]
      }
    },
    methods:{
      // 格式化内容
      format(val){
        switch (this.type){
          case 'type':
            return this.notifyType(val);
          case 'time':
            return parseTime(val,'{y}-{m}-{d} {h}:{i}');
          default:
            return val
        }
      },
      notifyType(type){
        switch (type){
          default:
            return '到店通知'
        }
      }
    },
    computed: {
      propList: function () {
        const arr = this.prop.split(",");
        return arr[0] ? arr : []
      },
      labelList: function () {
        const arr = this.label.split(",");
        return arr[0] ? arr : []
      }
    },
    watch:{
      filter:function (val) {
        this.format = val
      }
    },
    created(){
      // console.log(parseTime(new Date(),'{y}-{m}-{d} {h}:{i}'));
    },
    filters:{
      time:function (val) {
        return parseTime(val,'{y}/{m}/{d} {h}:{i}')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '@/styles/variables.scss';
  .ob-list-sub-item {
    &:first-child{
      .ellipsis{
        width:48px;
      }
    }
    [class^=el-icon]{
      font-size: 16px;
    }
    .el-icon-question{
      /*background: #333;*/
      color: #515055;
    }
    &:last-child{
      >.btn-item+.btn-item{
        margin-left: 30px;
      }
      >div{
        display: inline-block;
        vertical-align: middle;
      }
    }
    .btn-wrap {
      display: inline-block;
      width: 80px;
      vertical-align: middle;
      .el-button {
        height: 28px;
        margin-left: 0 !important;
        margin-bottom: 4px;
        &:last-child {
          margin-bottom: 0;
        }
        &[disabled] {
          background: #515055;
        }
      }
    }
    .el-button {
      &.is-circle {
        width: 16px;
        height: 16px;
        padding: 0;
        border: none;
        background: transparent !important;
        color: $orange;
        vertical-align: middle;
        font-size: 16px;
        &[disabled]{
          color: $disable;
        }
      }
    }
    p {
      text-align: left;
      line-height: 1.5;
      margin-bottom: 12px;
      span {
        vertical-align: middle;
        &.ellipsis {
          width: 106px;
        }
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
    > a {
      display: inline-block;
      vertical-align: middle;
    }
    .uu-icon {
      vertical-align: middle;
    }
  }
</style>
