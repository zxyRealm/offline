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
            :prop="'map.' + index + '.mapUrl'">
            <label
              class="label--item"
              :class="{empty: !map.mapUrl}"
              :for="'map__input--file' + index">
              <input
                title=""
                type="file"
                class="input__file"
                :id="'map__input--file' + index"
                @click="checkFilesStatus"
                @change="onChange($event, index)"/>
              <el-input v-show="false" v-model="map.mapUrl"></el-input>
              <span class="ellipsis">
                {{map.mapUrl | fileName}}
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
import { fileTypeAllow } from '../../../utils'
import axios from 'axios'

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
      // https://offline-browser-images.oss-cn-hangzhou.aliyuncs.com/static/img/%E5%9C%B0%E5%9B%BE%E8%83%8C%E6%99%AF%402x(2).png
      communityMapForm: {
        map: [
          { floorName: '', mapUrl: '' }
        ]
      },
      communityRules: {},
      fileList: [],
      showAlert: true
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    submitMapForm () {
      this.$refs.communityMapForm.validate((valid) => {
        if (valid) {
          this.$emit('handle-success', this.type)
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
        mapUrl: ''
      })
    },
    // 删除地图元素
    removeMap (map, index) {
      this.communityMapForm.map.splice(index, 1)
      this.fileList.splice(index, 1)
    },
    // 自定义文件上传
    httpRequest () {
      OssSignature({ superKey: 'floor_map' }).then(res => {
        if (res.data) {
          let time = parseTime(new Date()).replace(/[ :-]/g, '')
          this.loadModule = load('数据加载中...')
          this.uploadOss(res.data, 0, time)
        }
      }).catch(() => {
        this.$tip('服务器错误，请重新尝试')
      })
    },
    // 图片上传阿里云
    uploadOss (signature, index, time) {
      let file = this.fileList[index]
      if (!file) return
      let formData = new FormData()
      let fileName = encodeURIComponent(`${this.communityForm.map[index].floorName}${file.name.substring(file.name.lastIndexOf('.'))}`)
      let uid = this.userInfo.developerId
      formData.append('key', `floor_map/${uid}/${time}/${fileName}`)
      formData.append('policy', signature['policy'])
      formData.append('OSSAccessKeyId', signature['accessid'])
      formData.append('success_action_status', '200')
      formData.append('signature', signature['signature'])
      formData.append('file', file, fileName)
      // 构建formData 对象，将图片上传至阿里云oss服务
      axios.post(signature.host, formData).then(back => {
        if (!back.data) {
          if (index < this.fileList.length - 1) {
            this.uploadOss(signature, index + 1, time)
          }
          // 所图片成功上完成后 进行表单提交
          if (index === (this.fileList.length - 1)) {
            this.loadModule.close()
            this.byTypeAddCommunity(`${signature.host}/floor_map/${uid}/${time}/`)
          }
        } else {
          this.loadModule.close()
          this.$tip('上传失败，请稍后重试', 'error')
        }
      }).catch(() => {
        this.loadModule.close()
        this.$tip('网络异常，请稍后重新尝试', 'error')
      })
    },
    // 文件改变事件监听
    onChange (e, index) {
      let files = (e || window.event).target.files
      if (files[0]) {
        this.fileList.splice(index, 1, files[0])
        this.$set(this.communityMapForm.map[index], 'mapUrl', files[0].name)
      }

      console.log(this.communityMapForm.map[index])
    },
    // 校验地图文件是否可以更改
    checkFilesStatus (e) {
      setTimeout(() => {
        e.preventDefault()
      }, 0)
      // e.preventDefault()
    },
    validFile () {
      const validFiles = (rule, value, callback) => {
        if (value) {
          if (!fileTypeAllow(value, 'svg')) {
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
    }
  },
  watch: {},
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
