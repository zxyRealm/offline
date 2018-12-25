<template>
  <div class="developer__list--wrap">
    <ul class="api-list-item" v-for="(item,index) in data" :key="index">
      <li class="api-list-title">{{item.title}}</li>
      <li v-if="item.subTitle" class="api-list-sub-title">{{item.subTitle}}</li>
      <li v-if="item.type === 'list'">
        <div class="list-items" v-for="(items,$index) in item.info" :key="$index">
          <p class="title">{{items.title}}</p>
          <p class="api-list-context">{{items.content}}</p>
        </div>
      </li>
      <template v-if="item.type === 'code'">
        <li  v-for="(items,$index) in item.info" :key="$index">
          <p class="des">{{items.des}}</p>
          <pre v-html="items.code">{{items.code}}</pre>
        </li>
      </template>
      <li v-if="item.type === 'table'">
        <el-table
          :data="item.info[1].tableData"
          border
          style="width: 100%">
          <el-table-column v-for="(items) in item.info[0].tableTitle" :key="items.id"
                           :prop="items.prop"
                           :label="items.label"
                           :width="items.width||''">
          </el-table-column>
        </el-table>
      </li>
      <li class="api-list-context fs12" v-if="!item.type">{{item.info}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'api-data',
  props: {
    data: {
      type: [Array, Object],
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
  .developer-api-inner {
    height: calc(100% - 64px);
    /*padding: 0 20px;*/
    .developer-api-header {
      padding-bottom: 10px;
      border-bottom: 1px dashed rgba(151, 151, 151, 0.10);
      > h3 {
        font-size: 14px;
        line-height: 30px;
      }
      .developer-detail {
        > p {
          float: left;
          display: inline-block;
          margin-right: 100px;
          min-width: 190px;
          line-height: 26px;
          &:last-child {
            margin-right: 0;
          }

        }

      }
    }
    .developer-api-container {
      margin-top: 5px;
      height: calc(100% - 72px);
      .developer-api-nav {
        float: left;
        width: 128px;
        height: 100%;
        border-right: 1px dashed rgba(151, 151, 151, 0.10);
        .da-nav-title {
          line-height: 54px;
        }
        .da-nav-items {
          height: 36px;
          line-height: 36px;
          > a {
            color: #fff;
            &.router-link-active {
              color: #0F9EE9;
            }
          }
        }
      }
      .developer-api-content {
        height: calc(100% - 30px);
        margin-left: 128px;
        box-sizing: border-box;
        overflow: hidden;
        .el-scrollbar {
          height: 100%;
        }
        .el-scrollbar__wrap {
          width: calc(100% + 17px);
          height: calc(100% + 17px);
          overflow-x: hidden;
        }
        .scroll-inner {
          margin-left: 20px;
        }
        .api-list-context{
          font-size: 12px;
          line-height: 22px;
          color: rgba(255,255,255, 0.7);
        }
        .list-items{
          margin-bottom: 14px;
          font-size: 12px;
          > .title{
            position: relative;
            padding-left: 15px;
            color: #fff;
            margin-bottom: 4px;
            &:after{
              content: '';
              position: absolute;
              left: 0;
              top: 6px;
              width: 4px;
              height: 4px;
              border-radius: 4px;
              background: #fff;
            }
          }
        }
        .api-list-item {
          margin-bottom: 28px;
          .des {
            margin-bottom: 10px;
            font-size: 12px;
          }
          .api-list-title {
            margin: 10px 0;
          }
          .api-list-sub-title {
            line-height: 20px;
            margin-bottom: 8px;
            font-size: 12px;
            color: rgba(255,255,255,0.70);
          }
        }
      }
    }
  }
</style>
