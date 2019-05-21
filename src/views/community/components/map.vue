/*
* @author  张晓元
* @date    2019-04-26
*/
<template>
  <div class="map__form--wrap" :class="{center: center}">
    <el-form
      ref="communityMapForm"
      label-position="left"
      label-width="68px"
      class="icon-absolute"
      :model="communityMapForm"
      :rules="communityRules"
    >
      <el-scrollbar class="scroll-x">
        <el-form-item
          v-for="(map, index) in communityMapForm.map"
          label-width="20px"
          class="map-item--wrap"
          :label="`${index + 1}`"
          :key="map.key">
          <el-form-item
            label="楼层名称"
            :prop="'map.' + index + '.floorName'"
            :rules="{
              required: true, message: '请输入名称', trigger: 'blur'
            }"
          >
            <el-input placeholder="请输入名称" v-model="map.floorName"></el-input>
          </el-form-item>
          <el-form-item
            label="楼层地图"
            :rules="validFile()"
            :prop="'map.' + index + '.floorMap'">
            <label
              class="label--item"
              :class="{empty: !map.floorMap}"
              :for="'map__input--file' + index">
              <input
                title=""
                type="file"
                class="input__file"
                :id="'map__input--file' + index"
                @click="checkFilesStatus($event, index)"
                @change="onChange($event, index)"/>
              <el-input v-show="false" v-model="map.floorMap"></el-input>
              <span class="ellipsis">
                {{map.floorMap | fileName}}
              </span>
            </label>
          </el-form-item>
          <span
            v-if="index && index === communityMapForm.map.length - 1"
            class="iconfont icon-guanbi"
            @click.prevent="removeMap(map, index)"></span>
        </el-form-item>
      </el-scrollbar>
      <el-form-item label-width="0px">
        <el-button class="add-map--btn" @click="addMap">添加</el-button>
      </el-form-item>
      <el-form-item label-width="0px">
        <div class="handle-item alert-item" v-if="showAlert">
          <span class="el-icon-warning"></span>
          <span>请按由底层向上的顺序添加楼层</span>
          <span class="iconfont icon-guanbi" @click.prevent="() => {showAlert = false}"></span>
        </div>
        <div class="handle-item" :class="{'g-center': center}">
          <el-button @click="handleCancel">{{cancelButtonText}}</el-button>
          <el-button type="primary" @click="submitMapForm">保存</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { fileTypeAllow } from '@/utils'
import axios from 'axios'
import { uploadFileToOss } from '@/api/common'
import { load } from '@/utils/request'
import prefix from '@/api/prefix'
import {
  addFloorMap,
  updateFloorMap,
  getManageMember
} from '@/api/community'

const BASE_API = process.env.VUE_APP_BASE_API
export default {
  name: 'CommunityMap',
  props: {
    maxHeight: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    actionType: {
      type: String,
      default: 'add'
    },
    center: {
      type: Boolean,
      default: false
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    visible: { // form 表单的可见状态
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      communityMapForm: {
        map: [
          { floorName: '', floorMap: '' }
        ]
      },
      communityRules: {},
      fileList: [],
      showAlert: true,
      communityCopyMap: []
    }
  },
  mounted () {
    this.initData()
  },
  computed: {
    ...mapState(['currentManage'])
  },
  methods: {
    getFloorsList () {
      let param = {
        type: 1,
        groupGuid: this.currentManage.groupGuid
      }
      getManageMember(param).then(res => {
        let map = res.data.map(item => {
          let { name, floorMap, floorIndex, guid, operation  } = item
          return {
            floorName: name,
            floorMap,
            floorIndex,
            guid,
            operation
          }
        })
        if (!map.length) map = [ { floorName: '', floorMap: '' } ]
        this.$set(this.communityMapForm, 'map', map)
        this.fileList = []
        map.forEach(() => {
          this.fileList.push('')
        })
      }).catch(error => {
        console.log(error)
      })
    },

    submitMapForm () {
      let apiMap = {
        add: addFloorMap,
        edit: updateFloorMap
      }
      this.$refs.communityMapForm.validate((valid) => {
        if (valid) {
          this.uploadOss((floor) => {
            let floors = floor.map((item, index) => {
              item.floorIndex = index + 1
              return item
            })
            let params = {
              groupGuid: this.currentManage.groupGuid,
              floors
            }
            apiMap[this.actionType](params).then(() => {
              // this.$tip('创建成功')
              this.$emit('handle-success', { actionType: 'map', type: this.type})
            })
          })
        }
      })
    },
    // 处理取消按钮事件
    handleCancel () {
      this.$emit('handle-cancel', 'mapForm')
    },
    // 清除form表单校验，重置表单
    resetFields () {
      this.$refs.communityMapForm.resetFields()
    },
    // 新增地图元素
    addMap () {
      this.communityMapForm.map.push({
        floorName: '',
        floorMap: ''
      })
      let len = this.communityMapForm.map.length
      this.$set(this.fileList, len - 1, '')
    },
    // 删除地图元素
    removeMap (map, index) {
      this.checkFilesStatus( '',index)
      this.communityMapForm.map.splice(index, 1)
      this.fileList.splice(index, 1)
    },
    findIndex (array, index = 0) {
      for (let i = index, len = array.length; i < len; i++) {
        if (array[i]) {
          return i
        }
      }
      return array.length - 1
    },
    // 图片上传阿里云
    uploadOss (cb) {
      let _this = this
      let urlList = JSON.parse(JSON.stringify(this.communityMapForm.map))

      let uploadFile = (array, index) => {
        let formData = new FormData()
        formData.append('file', array[index])
        axios.post(`${BASE_API}${prefix[0]}/oss/file`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' }
          }).then(res => {
          if (res.data.result) {
            urlList[index]['floorMap'] = res.data.data
            let _index = _this.findIndex(array, index + 1)
            if (index === array.length - 1) {
              cb(urlList)
            } else {
              uploadFile(array, _index)
            }
          } else {
            _this.$tip(res.data.msg, 'error')
          }
        }).catch(error => {
          if (error.response) {
            _this.$tip(error.response.msg, 'error')
          }
        })
      }
      let _index = _this.findIndex(this.fileList, 0)
      console.log('out index', _index)
      if (!this.fileList[_index] &&_index === this.fileList.length - 1) {
        cb(urlList)
      } else {
        uploadFile(this.fileList, _index)
      }
    },
    // 文件改变事件监听
    onChange (e, index) {
      let files = (e || window.event).target.files
      if (files[0]) {
        this.fileList.splice(index, 1, files[0])
        this.$set(this.communityMapForm.map[index], 'floorMap', files[0].name)
      }

      console.log(this.communityMapForm.map[index], this.fileList)
    },
    // 校验地图文件是否可以更改
    checkFilesStatus (e, index) {
      let map = this.communityMapForm.map[index]
      if (map) {
        if (!map.operation && map.operation !== undefined) {
          if (e) e.preventDefault()
          this.$tip('已创建出入口，地图不允许修改', 'error')
          return false
        }
      }
    },
    // 文件格式校验
    validFile () {
      const validFiles = (rule, value, callback) => {
        if (value) {
          if (!fileTypeAllow(value.split('?')[0], 'svg')) {
            callback(new Error('文件格式只支持svg'))
          } else {
            callback()
          }
        } else {
          callback(new Error('请导入地图'))
        }
      }
      return [
        { validator: validFiles, trigger: ['change', 'blur'] }
      ]
    },
    initData () {
      console.log('00000000', this.actionType, '----------', this.type)
      if (this.actionType === 'edit') {
        this.getFloorsList()
      }
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.initData()
      }
    }
  },
  filters: {
    fileName (val) {
      let text = '导入地图'
      if (typeof val === 'object') {
        text = val.name
      } else if (val && typeof val === 'string') {
        text = decodeURIComponent(val.substring(val.lastIndexOf('/') + 1))
      }
      return text
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-form.center {
    margin: 0 auto;
  }

  .form-title {
    height: 56px;
    line-height: 56px;
    margin-bottom: 35px;
    font-size: 22px;
    .el-icon-arrow-left {
      font-weight: bold;
      vertical-align: 0;
    }
  }

  .map__form--wrap {
    width: 500px;
    &.center {
      margin: auto;
    }
    .icon-guanbi {
      cursor: pointer;
    }
    .add-map--btn {
      width: 100%;
      color: $theme-blue;
    }
    .handle-item {
      margin-bottom: 22px;
    }
    .alert-item {
      height: 36px;
      line-height: 36px;
      padding: 0 15px;
      background: rgba(11, 126, 249, 0.06);
      border: 1px solid rgba(11, 126, 249, 0.30);
      border-radius: 4px;
      color: $theme-blue;
      box-sizing: border-box;
      .el-icon-warning {
        margin-right: 8px;
        font-size: 18px;
      }
      .icon-guanbi {
        float: right;
        font-size: 14px;
        color: #C0C4CC;
      }
    }
    .label--item {
      position: relative;
      float: left;
      display: inline-block;
      overflow: hidden;
      width: 130px;
      height: 36px;
      padding: 0 5px;
      line-height: 34px;
      box-sizing: border-box;
      text-align: center;
      font-weight: normal;
      border: 1px solid #F0F0F0;
      border-radius: 4px;
      cursor: pointer;
      &.empty {
        color: $theme-blue;
      }
    }
    .input__file {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
      cursor: pointer;
    }
  }

</style>

<style lang="scss">
  .map__form--wrap {
    .map-item--wrap {
      .el-form-item {
        display: inline-block;
        float: left;
        .el-form-item__content {
          width: 130px;
          margin-right: 30px;
        }
        .el-form-item__label {
          padding: 0;
        }
      }
    }
  }
</style>
