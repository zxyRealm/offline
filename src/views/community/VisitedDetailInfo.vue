<template>
  <div class="visited--detail__info" v-show="state" @click="closeShade">
    <transition name="fade-visited">
      <div class="detail--right__default clearfix" v-show="state">
        <div class="detail--header">
          <span class="header--title">到访记录详情<span class="allTimes">(共计到访{{pageParams.total}}次)</span></span>
          <img class="detail--close clearfix" src="/static/img/face_recoginiton_close_icon.png" @click="closeShade($event,'你的一哥')"/>
        </div>
        <div class="tip--info">
          <p>Person ID：{{detailInfo.personGuid}}</p>
          <div class="message">
            <div class="details__cont">姓名：{{detailInfo.personName}}</div>
            <div class="details__cont">性别：<span v-if="detailInfo.gender === 1">男</span><span v-else>女</span></div>
            <div class="details__cont">年龄：{{detailInfo.age}}</div>
          </div>
        </div>
        <face-recognition @search-params="getFaceDataDetail"></face-recognition>
        <div class="detail--info">
          <el-table
            :data="faceData"
            border
            style="width: 100%">
            <el-table-column
              prop="order"
              label="序号"
              width="80"
            >
            </el-table-column>
            <el-table-column
              label="抓拍图"
              width="160">
              <template slot-scope="scope">
                <img @click="showPreviewDialog(scope.row.imageUrl)" :src="scope.row.imageUrl || ''" class="table--td__img"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="到访时间"
            >
              <template slot-scope="scope">
                {{scope.row.createTime | parseTime('{y}/{m}/{d} {h}:{i}')}}
              </template>
            </el-table-column>
            <el-table-column
              prop="groupName"
              label="到访社群"
            >
            </el-table-column>
          </el-table>
          <div class="table-page">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="pageParams.currentPage"
              :page-size="pageParams.pageSize"
              layout="prev, pager, next"
              :total="pageParams.total">
            </el-pagination>
          </div>
        </div>
      </div>
    </transition>
    <image-preview :visible.sync="dialogPreviewShow" :src="imageSrc"></image-preview>
  </div>
</template>
<script>
import FaceRecognition from '@/components/screening/FaceRecognition'
import ImagePreview from '@/components/preview'
export default {
  components: {FaceRecognition, ImagePreview},
  props: {
    state: {
      type: Boolean,
      default: false // 组件是否显示
    },
    detailInfo: {},
    deviceList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      dialogPreviewShow: false,
      imageSrc: '',
      groupGuid: '', // 新增设备groupGuid
      show: true, // 是否显示组件
      pageParams: {
        pageSize: 6, // 默认每页显示10条
        total: 0, // 总条数
        currentPage: 1 // 当前第几页
      },
      paramsInSear: { // 查询条件

      },
      faceData: [] // 数据
    }
  },
  methods: {
    // 当前显示第几页
    handleCurrentChange (val) {
      this.pageParams.currentPage = val
      this.getDataInParams(this.paramsInSear)
    },
    // 点击遮罩层关闭
    closeShade (event, lwh) {
      event.cancelBubble = true
      if (event.target.className.indexOf('visited--detail__info') > -1 || event.target.className.indexOf('detail--close') > -1) {
        this.$emit('update:state', false) // 第一种方式优化
      }
    },
    // 获取条件查询数据
    getFaceDataDetail (params) {
      this.pageParams.currentPage = 1
      this.paramsInSear = {...params}
      this.getDataInParams(this.paramsInSear)
    },
    // 根据查询条件查询数据
    getDataInParams (params) {
      // console.log(this.detailInfo)
      let paramsSearch = {
        groupGuid: (params && params.groupGuid) || this.detailInfo.groupGuid, // 新增设备绑定groupGuid
        ufaceId: this.detailInfo.ufaceId,
        personGuid: this.detailInfo.personGuid,
        deviceKey: (params && params.deviceKey) || '',
        cameraName: this.detailInfo.cameraName,
        startTime: (params && params.startTime) || '',
        endTime: (params && params.endTime) || '',
        index: this.pageParams.currentPage,
        length: this.pageParams.pageSize
      }
      this.$http('/group/faces/search', paramsSearch).then(res => {
        if (res.result === 1) {
          this.faceData = (res.data && res.data.content) || []
          this.pageParams.total = res.data.pagination.total
        }
      }).catch(error => {
        console.info(error)
      })
    },
    // 显示是大图弹框
    showPreviewDialog (src) {
      this.dialogPreviewShow = true
      this.imageSrc = src
    }
  },
  watch: {
    detailInfo: {
      handler: function (val, oldVal) {},
      deep: true
    },
    // 监听状态改变刷新数据
    state (val, oldVal) {
      if (val) {
        this.getDataInParams()
      } else {
        // 默认进来为1
        this.pageParams.currentPage = 1
        this.faceData = []
      }
    },
    deviceList (val, oldVal) {
    // console.info(val,'详情页')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .visited--detail__info {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.70);
    z-index: 1111;
    border-radius: 1px;
    .detail--right__default {
      // position: absolute;
      height: 100%;
      // right: 0;
      float: right;
      width: 760px;
      background: #141319;
      border-radius: 1px;
      .detail--header {
        width: 100%;
        height: 40px;
        background-image: linear-gradient(90deg, #8041C6 0%, #2090E4 100%);
        border-radius: 1px;
        .header--title {
          font-size: 16px;
          color: #FFFFFF;
          line-height: 40px;
          margin-left: 22px;
        }
        .detail--close {
          width: 12px;
          float: right;
          margin-top: 14px;
          margin-right: 22px;
          cursor: pointer;
        }
      }
      .tip--info {
        font-size: 12px;
        color: #FFFFFF;
        margin-left: 30px;
        margin-top: 16px;
        p {
          padding: 1px 0;
        }
      }
      .face--recognition__wrap {
        padding-left: 30px;
      }
      .detail--info {
        box-sizing: border-box;
        padding: 0 30px;
        table {
          .table--td__img {
            width: 80px;
            height: 80px;
            cursor: pointer;
          }
          .el-table__row td:nth-child(2) .cell {
            text-align: center;
            line-height: 12px;
          }
          .el-table__row td {
            padding: 1px 0;
          }
          thead tr th:nth-child(2) {
            text-align: center;
          }
        }
      }
    }
    .face--recognition__wrap div.label_div {
      margin-right: 6px;
    }

  }

  /* 清楚浮动 */
  .clearfix:after {
    display: block;
    content: '';
    clear: both;
    height: 0;
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .fade-visited-enter-active, .fade-visited-leave-active {
    transition: all .5s;
  }
  .fade-visited-enter, .fade-visited-leave-active {
    transform: translateX(760px);
  }
</style>

<style scoped>
  .details__cont{
    float: left;
    width: 136px;
  }
  .allTimes{
    margin-left: 10px;
    font-size: 12px;
  }
  .message{
    margin-top: 19px;
    padding-bottom: 6px;
    border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
    overflow: hidden;
    font-size: 14px;
  }
  .tip--info{
    margin-right: 30px;
  }
</style>
