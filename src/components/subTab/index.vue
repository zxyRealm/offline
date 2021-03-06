<template>
  <div class="sub-tab-wrap clearfix" :class="size?size:''">
    <div class="sub-tab-main vam">
      <i v-if="back" @click="backPrev" class="el-icon-arrow-left"></i>
      <template v-for="(item,$index) in menuArray">
        <span :key="$index" class="tab__link--item">
          <router-link v-if="item.index" :key="$index" :to="item.index" v-html="item.title"></router-link>
          <a class="text" v-html="item.title" v-else ></a>
        </span>
      </template>
      <slot name="reference"></slot>
    </div>
    <template v-if="subLink.title">
      <a href="javascript:void (0)" class="sub-tab-link" @click="routeChange(subLink.index)">{{subLink.title}}</a>
    </template>
    <template v-if="showButton">
      <div class="fr ml50">
        <template v-for="(item,index) in btnArray">
          <slot v-if="$slots.file && item.type === 'file'" name="file"></slot>
          <custom-popover
            v-else
            :key="index"
            :size="btnSize"
            :class="{ml10:index}"
            :show-popover="item.showPopover"
            :content="item.content"
            :text="item.text"
            @click.native="handleBtn(index)"></custom-popover>
        </template>
      </div>
    </template>
    <el-input
      v-if="search"
      clearable
      @clear="searchMethod"
      class="nav-search fr"
      :placeholder="placeholder"
      @keyup.native.enter="searchMethod"
      v-model.trim="searchValue">
      <i slot="prefix" @click="searchMethod" class="el-input__icon el-icon-search"></i>
    </el-input>
  </div>
</template>
<script>
import CustomPopover from '@/components/CustomPopover'
import {validateRule} from '../../utils/validate'
import {eventObject} from '../../utils/event'

export default {
  name: 'uu-sub-tab',
  components: {
    CustomPopover
  },
  props: {
    back: {
      type: [Boolean, String],
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    showButton: {
      type: Boolean,
      default: false
    },
    size: {
      type: [String],
      default: ''
    },
    menuArray: {
      type: [Array],
      default: () => [
        {index: '', title: ''}
      ]
    },
    btnArray: {
      type: [Array],
      default: () => []
    },
    showPopover: { // popover状态是否可见
      type: Boolean,
      default: false
    },
    popover: { // popover文本内容
      type: String,
      default: ''
    },
    btnSize: {
      type: String,
      default: 'middle'
    },
    subLink: {
      type: [Object],
      default: () => ({
        title: ''
      })
    },
    subBtn: {
      type: [Object],
      default: () => ({
        text: ''
      })
    },
    placeholder: {
      type: String,
      default: '请输入关键字'
    }
  },
  data () {
    return {
      searchValue: this.$route.params.name || '',
      length: 0,
      iframeCount: 0
    }
  },
  mounted () {
    eventObject().$on('IFRAME_FRESH_COUNT', (count) => {
      this.iframeCount = count
    })
  },
  methods: {
    // @handle-btn subBtn未提供index参数是触发
    handleBtn (index) {
      if (this.btnArray[index] && this.btnArray[index].path) {
        this.$router.push(this.btnArray[index].path)
      }
      this.$emit('handle-btn', index)
    },
    // 返回上一页 back为字符串时返回指定路径
    backPrev () {
      if (window.history.length) {
        this.$router.go(-1 - this.iframeCount)
      } else {
        this.$router.push('/')
      }
    },
    // @remote-search 点击图标或回车是触发
    searchMethod () {
      if (this.searchValue) {
        if (this.searchValue.length > 32) {
          this.searchValue = this.searchValue.substr(0, 20)
          this.$tip('请输入1-32位字符', 'error')
          return
        } else if (!validateRule(this.searchValue, 2)) {
          this.$tip(`仅限汉字/字母/数字/下划线/空格`, 'error')
          return
        }
      }
      this.$emit('remote-search', this.searchValue.toString().trim())
    },
    routeChange (link) {
      if (link) this.$router.push(link)
    }
  },
  computed: {
    show: {
      get () {
        return this.showPopover
      },
      set () {
      }
    }
  },
  watch: {
    $route: {
      handler (val) {
        this.iframeCount = 0
      },
      deep: true
    }
  },
  beforeDestroy () {
    eventObject().$off('IFRAME_FRESH_COUNT')
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  // 主题内容区tab 菜单样式
  .sub-tab-wrap {
    padding: 20px 20px 8px;
    line-height: 24px;
    font-size: 16px;
    border-bottom: 1px dashed rgba(151,151,151,0.10);
    &.pd--lr20{
      padding-left: 20px;
      padding-right: 20px;
    }
    .sub-tab-main {
      float: left;
      font-size: 16px;
      height: 100%;
      line-height: 24px;
      .el-icon-arrow-left {
        cursor: pointer;
      }
      .tab__link--item{
        + .tab__link--item{
          margin-left: 40px;
        }
      }
      a{
        display: inline-block;
        line-height: 30px;
        padding: 0 5px;
        box-sizing: border-box;
        color: rgba(255, 255, 255, 1);
        &:not([href]){
          cursor: text;
        }
      }
      a.router-link-active[href]{
        position: relative;
        color: rgba(255, 255, 255, 1);
        /*border-bottom: 2px solid #fff;*/
        &:after{
          content: '';
          position: absolute;
          width: 100%;
          left: 0;
          bottom: -8px;
          height: 2px;
          background: #fff;
          // background-image: linear-gradient(-90deg, #6D2EBB 0%, #0F9EE9 100%);
          border-radius: 4px;
        }
      }
      a[href] {
        color: rgba(255, 255, 255, 0.5);
        /*color: #fff;*/
      }
      > .text {
        cursor: text;
      }
      .separator {
        width: 2px;
        margin: 0 10px;
        height: 18px;
        background-image: linear-gradient(to top, #813FC5, #1896E6);
      }
    }
    .sub-tab-link {
      float: right;
      font-size: 14px;
    }
    &.medium {
      padding: 0 20px;
      line-height: 28px;
      .separator {
        display: none;
      }
      .sub-tab-main {
        font-size: 14px;
        margin-right: 20px;
        > a {
          height: 28px;
          line-height: 26px;
          background-color: rgba(0, 0, 0, .2);
          padding: 0 20px;
          margin-right: 20px;
          &:last-child {
            margin-right: 0;
          }

        }
      }
    }
    &.small {
      padding: 5px 20px;
      height: auto;
      .sub-tab-main {
        font-size: 14px;
        margin-bottom: 5px;
      }
    }
    /*搜索框*/
    .nav-search {
      width: 190px;
      max-width: 100%;
      border: none;
      background: transparent;
      .el-input__prefix {
        font-size: 18px;
      }
      .el-input__inner {
        background: transparent !important;
        border: none;
        border-bottom: 1px solid #ddd;
      }
    }
  }
</style>
