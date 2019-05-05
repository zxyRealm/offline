/*
* 业态客流排行
* @author  张晓元
* @date    2019-04-30
*/
<template>
  <div class="industry-flow--wrap">
    <div class="floor__sub--title" :style="{'font-size': fontSize + 2 + 'px'}">
      {{title}}
    </div>
    <div class="clearfix" :style="{'font-size': fontSize + 'px'}">
      <div class="industry__rank--wrap">
        <div class="rank-items" v-for="i in customList" :key="i">
          <img v-if="i === 0" src="@/assets/three/industry_rank_one.png" alt="">
          <img v-if="i === 1" src="@/assets/three/industry_rank_two.png" alt="">
          <img v-if="i === 2" src="@/assets/three/industry_rank_three.png" alt="">
          <p>
            <span class="ellipsis">
              {{data[i] ? data[i].industryName : ''}}
            </span>
            <br>
            {{data[i] ? data[i].percent: ''}}
          </p>
        </div>
      </div>
      <ul class="right__sidebar">
        <template v-for="(item, $index) in data">
          <li
            v-if="$index > 2 && $index < 7"
            class="sidebar--item"
            :key="$index">
            <el-tooltip
              v-if="item.industryName.length > 3"
              class="item" effect="light"
              :content="item.industryName"
              placement="top-start">
              <span class="ellipsis">{{$index + 1}}.{{item.industryName}}</span>
            </el-tooltip>
            <span v-else class="ellipsis">{{$index + 1}}.{{item.industryName}}</span>
            <span class="per">{{item.percent}}</span>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import resize from './resize'
export default {
  name: 'industry',
  mixins: [resize],
  data () {
    return {
      customList: [1, 0, 2]
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: '业态排行'
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
  /*业态客流排行榜*/
  .industry-flow--wrap {
    height: 100%;
    > .clearfix {
      position: relative;
      height: calc(100% - 20px);
    }
    .industry__rank--wrap {
      position: absolute;
      top: 10%;
      overflow: hidden;
      vertical-align: bottom;
      .rank-items {
        display: inline-block;
        position: relative;
        width: 25%;
        text-align: center;
        vertical-align: text-bottom;
        .ellipsis {
          width: 3em;
        }
        > img {
          width: 100%;
          vertical-align: text-bottom;
        }
        p {
          position: absolute;
          width: 100%;
          bottom: 12%;
        }
        &:nth-child(2) {
          margin: 0 12%;
          p {
            bottom: 15%;
          }
        }
        &:nth-child(3) {
          p {
            bottom: 9%;
          }
        }
      }
    }
    .right__sidebar {
      position: absolute;
      width: 100%;
      bottom: 2%;
      text-align: center;
      .sidebar--item {
        display: inline-block;
        height: 1.2em;
        line-height: 1.2em;
        vertical-align: top;
        span {
          display: inline-block;
          text-align: left;
        }
        .ellipsis {
          width: 4em;
          margin-right: 1em;
        }
        .per {
          width: 3em;
        }
        span + span {
          margin-right: 4px;
        }
        &:not(:last-of-type) {
          margin-bottom: 10px;
        }
      }
    }
  }
</style>