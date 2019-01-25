<template>
  <td :width="width" :style="styles" class="ob-list-sub-item">
    <div class="sub-item__inner">
      <template>
        <p v-if="!router" v-for="(item,$index) in propList" :key="$index">
          <span class="label__title">{{labelList[$index]?labelList[$index]+'：':''}}</span>
          <el-tooltip v-if="tooltip" :content="format(data[item])" placement="top">
            <span class="ellipsis">{{format(data[item])}}</span>
          </el-tooltip>
          <span v-else class="ellipsis">{{format(data[item])}}</span>
        </p>
        <p v-else>
          <span class="label__title">{{label}}</span><br>
          <router-link :to="router">
            {{text}}
          </router-link>
        </p>
      </template>
      <slot></slot>
    </div>
  </td>
</template>

<script>
import {parseTime} from '@/utils'

export default {
  name: 'ob-list-item',
  props: {
    styles: {
      type: [String, Object],
      default: () => ({
        'minWidth': '74px'
      })
    },
    width: {
      type: String,
      default: 'auto'
    },
    router: {
      type: [String],
      default: ''
    },
    text: {
      type: [String],
      default: ''
    },
    wrap: {
      type: [Boolean],
      default: true
    },
    type: {
      type: [String],
      default: ''
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
    filter: { // 自定义过滤方法
      type: [Function]
    },
    showDelete: { // 列表是否显示删除图标
      type: Boolean,
      default: false
    },
    isAmend: { // 设备别名是否可修改
      type: Boolean,
      default: false
    },
    tooltip: { // 文本内容超出隐藏
      type: Boolean,
      default: false
    },
    isChild: { // 是否是成员社群设备列表
      type: [Boolean],
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
    // 格式化内容
    format (val) {
      switch (this.type) {
        case 'type':
          return this.notifyType(val)
        case 'time':
          return parseTime(val, '{y}/{m}/{d} {h}:{i}')
        default:
          return val
      }
    },
    notifyType (type) {
      switch (type) {
        default:
          return '到店通知'
      }
    }
  },
  computed: {
    propList: function () {
      const arr = this.prop.split(',')
      return arr[0] ? arr : []
    },
    labelList: function () {
      const arr = this.label.split(',')
      return arr[0] ? arr : []
    }
  },
  watch: {
    filter: function (val) {
      this.format = val
    }
  },
  filters: {
    time: function (val) {
      return parseTime(val, '{y}/{m}/{d} {h}:{i}')
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "@/styles/variables.scss";

  $close: url("../../assets/public/data-list/close_btn_bg.png");
  $reset: url("../../assets/public/data-list/reset_btn_bg.png");
  $reboot: url("../../assets/public/data-list/reboot_btn_bg.png");
  $upgrade: url("../../assets/public/data-list/upgrade_btn-bg.png");
  $ongoing: url("../../assets/public/data-list/upgrading_btn_bg.png");
  .order-list {
    li {
      box-sizing: border-box;
      list-style: disc inside;
    }
  }

  .ob-list-sub-item {
    .sub-item__inner{
      position: relative;
      width: 100%;
      padding: 14px 20px;
      box-sizing: border-box;
      &:before {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -20px;
        height: 40px;
        width: 1px;
        background: #E7E7E7;
        opacity: 0.25;
      }
    }
    /*设备操作列样式控制*/
    &:last-child{
      .sub-item__inner{
        > .btn-item + .btn-item {
          margin-left: 18px;
        }
        > *{
          display: inline-block;
          vertical-align: middle;
        }
        &:before {
          display: none;
        }
      }
    }
    .table__label {
      display: inline-block;
      width: 62px;
    }
    &:first-child {
      .ellipsis {
        width: 48px;
      }
    }
    [class^=el-icon] {
      font-size: 16px;
      vertical-align: text-bottom;
    }
    .el-icon-question {
      margin-left: -1px;
      border-radius: 50%;
      color: #515055;
      background: #fff;
    }
    .btn-wrap {
      display: inline-block;
      width: 80px;
      vertical-align: middle;
      .el-button {
        height: 28px;
        margin-left: 0 !important;
        margin-bottom: 4px;
        &.medium {
          &.run, &.disable, &.reset, &.reboot, &.upgrade, &.ongoing {
            height: 30px;
            padding: 8px 15px;
            background-size: cover;
            border: none;
            background-color: transparent;
          }
          &.upgrade {
            background-image: $upgrade;
          }
          &.reset {
            background-image: $reset;
          }
          &.run {
            background-image: $close;
          }
          &.reboot {
            background-image: $reboot;
          }
          &.ongoing {
            position: relative;
            &:after {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: $ongoing repeat-x top left;
              animation: mymove 3.5s linear infinite;
              background-size: auto 100%;
            }
            @keyframes mymove {
              from {
                background-position-x: 0;
              }
              to {
                background-position-x: 100%;
              }
            }
          }
          &[disabled] {
            background: $disable;
            box-shadow: 0 2px 4px 0 #161418;
          }
        }
        &:last-child {
          margin-bottom: 0;
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
        &[disabled] {
          color: $disable;
          > i {
            color: #515055;
          }
        }
      }
    }
    p {
      text-align: left;
      line-height: 0;
      margin-bottom: 12px;
      > *{
        display: inline-block;
        vertical-align: middle;
        line-height: 18px;
      }
      span {
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
      margin: 1px 0;
      &.problem {
        margin-top: 8px;
      }
    }
  }

</style>
