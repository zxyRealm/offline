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
        <div class="table-column-item" v-for="(subItem, $index2) in item.info" :key="$index2">
          <p v-if="subItem.title" class="api-list-sub-title">{{subItem.title}}</p>
          <el-table
            :data="subItem.tableData"
            border
            stripe
            class="api__table"
            style="width: 100%">
            <el-table-column
              v-for="(items) in subItem.tableTitle" :key="items.id"
              :prop="items.prop"
              :label="items.label"
              :width="items.width||''">
            </el-table-column>
          </el-table>
        </div>
      </li>
      <li class="api-list-context fs12" v-if="!item.type">
        <template v-if="!item.hrefSwitch">
          {{item.info}}
        </template>
        <a v-else>{{item.info}}</a>
      </li>
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
        .table-column-item{
          margin-bottom: 10px;
          &:last-child{
            margin-bottom: 0;
          }
        }
        .api-list-context{
          font-size: 12px;
          line-height: 22px;
          margin: 10px 0 0 15px;
          > a {
            cursor: text;
          }
        }
        .list-items{
          margin-bottom: 14px;
          font-size: 12px;
          > .title{
            position: relative;
            padding-left: 15px;
            margin-top: 10px;
            margin-bottom: 4px;
            font-size: 14px;
            color: #252525;
            font-weight: bold;
            &:after{
              content: '';
              position: absolute;
              left: 0;
              top: 5px;
              width: 8px;
              height: 8px;
              border-radius: 8px;
              background: #0B7EF9;
            }
          }
        }
        .api-list-item {
          margin-bottom: 28px;
          &:first-child{
            .api-list-title{
              font-size: 16px;
              color: #252525;
              font-weight: 100;
            }
          }
          pre{
            color: #252525;
            line-height: 2;
          }
          .des {
            margin-bottom: 10px;
            font-size: 12px;
          }
          .api-list-title {
            margin: 30px 0;
            font-size: 14px;
            color: #252525;
            font-weight: bold;
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
