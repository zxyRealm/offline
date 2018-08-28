<template>
  <div class="sub-tab-wrap clearfix" :class="size?size:''">
    <div class="sub-tab-main vam">
      <i v-if="back" @click="backPrev" class="el-icon-arrow-left"></i>
      <template v-for="(item,$index) in menuArray">
        <router-link v-if="item.index" :key="$index" :to="item.index">{{item.title}}</router-link>
        <a href="javascript:void (0)" class="text" v-else >{{item.title}}</a>
        <span v-if="$index!==menuArray.length-1" class="separator"></span>
      </template>
    </div>
    <template v-if="subLink.title">
      <!--<router-link v-if="subLink.index" :to="subLink.index" class="sub-tab-link">{{subLink.title}}</router-link>-->
      <a href="javascript:void (0)" class="sub-tab-link" @click="routeChange(subLink.index)">{{subLink.title}}</a>
    </template>
    <template v-if="showButton && !search">
      <el-button class="affirm medium fr" @click="handleBtn">{{subBtn.text}}</el-button>
    </template>
    <el-input
      v-if="search && !showButton"
      clearable
      @clear="searchMethod"
      class="nav-search fr"
      :placeholder="placeholder"
      @keyup.native.enter="searchMethod"
      v-model="searchValue">
      <i slot="prefix" @click="searchMethod" class="el-input__icon el-icon-search"></i>
    </el-input>
  </div>
</template>
<script>
export default {
  name: 'uu-sub-tab',
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
      searchValue: ''
    }
  },
  methods: {
    // @handle-btn subBtn未提供index参数是触发
    handleBtn () {
      if (this.subBtn.index) {
        this.$router.push(this.subBtn.index)
      } else {
        this.$emit('handle-btn')
      }
    },
    // 返回上一页 back为字符串时返回指定路径
    backPrev () {
      if (window.history.length) {
        this.$router.go(-1)
      } else {
        this.$router.push('/')
      }
    },
    // @remote-search 点击图标或回车是触发
    searchMethod () {
      this.$emit('remote-search', this.searchValue.toString().trim())
    },
    routeChange (link) {
      if (link) this.$router.push(link)
    }
  },
  watch: {
    searchValue (val) {
      console.log('search val', val)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  // 主题内容区tab 菜单样式
  .sub-tab-wrap {
    padding: 20px;
    line-height: 24px;
    font-size: 16px;
    .sub-tab-main {
      float: left;
      font-size: 16px;
      height: 100%;
      line-height: 24px;
      .el-icon-arrow-left {
        cursor: pointer;
      }
      > a:not(.router-link-active) {
        color: #fff;
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
      width: 280px;
      max-width: 100%;
      border: none;
      background: transparent;
      .el-input__prefix {
        font-size: 24px;
      }
      .el-input__inner {
        background: transparent !important;
        border: none;
        border-bottom: 1px solid #ddd;
      }
    }
  }

</style>
<style lang="scss" rel="stylesheet/scss">
  @import "@/styles/variables.scss";

  .nav-search {
    width: 280px;
    border: none;
    .el-input__prefix {
      font-size: 22px;
      color: $blue;
      z-index: 999;
      cursor: pointer;
    }
    &.el-input--prefix {
      .el-input__inner {
        background: transparent !important;
        background-image: none;
        border: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        padding-left: 35px;
        border-radius: 0;
        color: #fff;
      }
    }

  }
</style>
