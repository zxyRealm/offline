<template>
  <div class="behavior__trail--wrap g-prl20">
    <div class="trail__info--wrap dashed--border">
      <div class="fl clearfix">
        <div class="ti-item">
          <p>姓名：</p>
          <p>到访次数：</p>
        </div>
        <div class="ti-item">
          <p><span>性别：</span><span>年龄：</span></p>
          <p>最近一次：{{new Date() | parseTime('{y}/{m}/{d} {h}:{i}')}}</p>
        </div>
      </div>
      <div class="ti-item ti-right">
        <p>Person ID：</p>
        <p>
            <span :key="val" v-for="val in label">
              {{val}}
            </span>
        </p>
      </div>
    </div>
    <div class="trail__detail--wrap">
      <div class="td--left dashed--border">
        <div class="td__date--wrap">
          <i class="el-icon-arrow-left"></i>
          {{spoorDate}}
          <i class="el-icon-arrow-right"></i>
          <i class="el-icon-date fr"></i>
          <el-date-picker
            :clearable="false"
            popper-class="date__popper--wrap theme__popper--wrap"
            v-model="spoorDate"
            type="date"
            value="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <el-scrollbar>
          <div v-for="val in 12" class="spoor-item" :key="val">
            <div class="img-box">
              <img width="36" src="/static/img/logo.png" alt="">
            </div>
            <div class="item--info">
              <p class="name" :class="{start: val === 1, end: val === 12}">{{trailList[0].name}}</p>
              <p class="date">{{new Date() | parseTime('{h}:{i}')}}</p>
              <img width="12" src="@/assets/behavior/signpost_icon@2x.png" alt="">
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div class="td--right dashed--border"></div>
    </div>
  </div>
</template>

<script>
import {parseTime} from '../../utils'
import {GetPersonTrail} from '../../api/behavior'

export default {
  name: 'trail',
  data () {
    return {
      spoorDate: '',
      label: [
        '美妆爱好者',
        '运动达人',
        '抓娃娃狂魔',
        '女装大佬',
        '魔音教主',
        '魔音教主2',
        '魔音教主3'
      ],
      trailList: [
        {name: '气味书店'}
      ]
    }
  },
  created () {
    this.spoorDate = parseTime(new Date(), '{y}/{m}/{d}')
    this.getPersonTrail()
  },
  mounted () {
    // this.getPersonTrail()
  },
  computed: {},
  methods: {
    getPersonTrail () {
      GetPersonTrail({personId: this.$route.params.personId}).then(res => {
        console.log(res.data)
      })
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
  .behavior__trail--wrap{
    height: calc(100% - 82px);
  }
  .dashed--border{
    border: 1px dashed rgba(151,151,151,0.10);
    background: rgba(1,8,20,0.10);
  }
  .trail__info--wrap{
    margin: 10px 0;
    padding: 18px 20px;
    height: 88px;
    box-sizing: border-box;
    .ti-item{
      float: left;
      p{
        line-height: 24px;
        &:first-child{
          margin-bottom: 12px;
          line-height: 1;
        }
      }
      &:first-child{
        width: 160px;
      }
      &:nth-child(2) {
        /*width: 250px;*/
        span{
          display: inline-block;
          width: 120px;
        }
      }
    }
    .ti-right{
      float: inherit;
      overflow: hidden;
      p:nth-child(2)
      {
        height: 24px;
        overflow: hidden;
        span{
          width: auto;
          line-height: 1;
          padding: 5px 12px;
          background: #165F88;
          border-radius: 11px;
          text-align: center;
          font-size: 12px;
          box-sizing: border-box;
          &+ span{
            margin-left: 10px;
          }
      }
      }
    }
    /*background: rgba(1,8,20,0.10);*/
  }
  .trail__detail--wrap{
    height: calc(100% - 110px);
    .td__date--wrap{
      position: relative;
      margin: 16px 0;
      line-height: 24px;
      cursor: pointer;
      .el-icon-date{
        color: #0F9EE9;
        margin-top: 4px;
        font-size: 16px;
      }
      .el-date-editor{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        opacity: 0;
        z-index: 99;
        cursor: pointer;
        .el-input__inner{
          padding: 0;
        }
      }
    }
    .td--left{
      float: left;
      width: 200px;
      margin-right: 10px;
      padding: 0 12px;
      height: 100%;
      box-sizing: border-box;
      .el-scrollbar{
        height: calc(100% - 66px);
        .spoor-item{
          margin-bottom: 8px;
          height: 54px;
          .img-box{
            float: left;
            width: 36px;
            height: 54px;
            /*margin-right: 22px;*/
            img{
              width: 100%;
              height: 100%;
            }
          }
          .item--info{
            padding-left: 22px;
            overflow: hidden;
          }
          .date{
            font-size: 12px;
            color: rgba(255,255,255,0.50);
          }
          .name{
            &.end,
            &.start{
              position: relative;
              &:after{
                content: '';
                position: absolute;
                display: block;
                width: 6px;
                height: 6px;
                top: 7px;
                left: -10px;
                border-radius: 6px;
                background: green;
              }
            }
            &.end{
              &:after{
                background: red;
              }
            }
          }
        }
      }
    }
    .td--right{
      height: 100%;
      overflow: hidden;
    }
  }
</style>
