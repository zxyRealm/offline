<template>
    <div class="equipment__service--wrap">
      <uu-sub-tab
        search
        back
        @remote-search="search"
        placeholder="快速查找设备"
        :menu-array="menu">
      </uu-sub-tab>
      <div class="filter__list--wrap">
        <el-select clearable v-model="filterValue.type" placeholder="全部类型">
          <el-option :value="4" label="客行分析"></el-option>
          <el-option :value="5" label="人脸抓拍"></el-option>
        </el-select>
        <el-select clearable v-model="filterValue.groupGuid" placeholder="绑定社群">
          <el-option :value="null" label="未绑定"></el-option>
          <el-option
            v-for="(item, $index) in bindGroups"
            :key="$index"
            :value="item.groupGuid"
            :label="item.name"></el-option>
        </el-select>
        <el-menu @select="handleSelect" mode="horizontal" class="device__menu">
          <el-submenu popper-class="device__menu--popper" index="1">
            <template slot="title">批量操作</template>
            <el-menu-item index="bind">绑定</el-menu-item>
            <el-menu-item index="unbind">解绑</el-menu-item>
            <el-menu-item index="delete">删除</el-menu-item>
          </el-submenu>
        </el-menu>
        <el-button class="affirm medium ml10" @click="showCameraDialog('add')">手动添加</el-button>
        <el-upload
          :data="{serverKey: $route.params.key}"
          name="excelFile"
          class="import--excel"
          :action="baseApi + '/manage/device/deviceCamera/info/addBatch'"
          :on-progress="handleProgress"
          :before-upload="beforeUpload"
          :on-success="handleSuccess"
          :on-error="handleError"
          :multiple="false"
          :limit="1"
          :show-file-list="false"
          :file-list="fileList">
          <el-button class="affirm medium ml10">导入设备</el-button>
        </el-upload>
        <a href="javascript:void (0)" @click="clearFilters" class="fr">显示全部</a>
      </div>
      <el-scrollbar class="server__list-wrap">
        <el-table
          @selection-change="handleSelectionChange"
          border
          :data="tableList"
        >
          <el-table-column
            label="全部"
            width="55"
            align="center"
            type="selection">
          </el-table-column>
          <el-table-column
            label="名称"
            prop="name">
            <template slot-scope="scope">
              <span class="ellipsis-20">{{scope.row.name || '暂无'}}</span>
              <el-popover
                placement="top"
                popper-class="nick_name--popover"
                @show="showPopover(scope.$index)"
                @hide="hidePopover(scope.$index)"
                v-model="scope.row.popover"
                trigger="click">
                <el-form
                  @submit.native.prevent
                  :ref="tableForm + scope.$index"
                  :rules="rules"
                  class="table-form"
                  :model="equipmentForm"
                >
                  <el-form-item :key="scope.$index" prop="name">
                    <el-input type="text" v-model.trim="equipmentForm.name"></el-input>
                    <uu-icon type="success" @click.native="changeEquipmentName(scope.$index)"></uu-icon>
                    <uu-icon type="error" @click.native="scope.row.popover = false"></uu-icon>
                  </el-form-item>
                </el-form>
                <i slot="reference" v-if="scope.row.deviceType !== 1" class="el-icon-edit"></i>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="序列号"
            prop="deviceKey">
          </el-table-column>
          <el-table-column
            label="用途"
            prop="type">
            <template slot-scope="scope">
              {{scope.row.type | deviceType('use')}}
            </template>
          </el-table-column>
          <el-table-column
            label="绑定社群"
            props="groupName">
            <template slot-scope="scope">
              <span class="ellipsis-28" :class="{'c-grey': !scope.row.groupName}">{{scope.row.groupName || '暂无'}}</span>
              <uu-icon
                :type="scope.row.groupName ? 'unbinding' : 'binding'"
                @click.native="showDialogForm(scope.row)"></uu-icon>
            </template>
          </el-table-column>
          <el-table-column
            v-if="$route.name === 'equipmentMineService'"
            width="150"
            label="操作">
            <template slot-scope="scope">
              <a href="javascript:void (0)" class="g-mr15" @click="showCameraDialog('edit', scope.row)">编辑</a>
              <a href="javascript:void (0)" class="danger" @click="deleteEquipment(scope.row)">删除</a>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="mt10"
          v-if="pagination.total && pagination.total>pagination.length"
          @current-change="getDeviceList"
          :current-page="pagination.index"
          :page-size="pagination.length"
          layout="total,prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </el-scrollbar>
      <!--绑定社群-->
      <ob-dialog-form
        filter
        @remote-submit="bindCommunity"
        :group="groupList"
        title="绑定社群"
        type="group"
        :visible.sync="dialogFormVisible"
      >
      </ob-dialog-form>
      <!--编辑摄像头信息-->
      <ob-dialog-form
        class="dialog__content--vm"
        :show-button="false"
        :title="deviceInfo.title === 'add' ? '添加摄像头' : '编辑信息'"
        :visible.sync="cameraVisible">
        <div slot="form" class="vam" style="height: 160px">
          <el-form
            slot="form"
            ref="cameraForm"
            block-message
            style="width: 330px"
            label-position="left"
            class="common-form white"
            label-width="82px"
            :model="cameraForm"
            :rules="cameraRules"
          >
            <el-form-item class="mt10" label="名称：" prop="name">
              <el-input placeholder="请输入设备名称" v-model="cameraForm.name"></el-input>
            </el-form-item>
            <el-form-item v-if="deviceInfo.title === 'add'" class="mt10" label="序列号：" prop="deviceKey">
              <el-input placeholder="请输入16位序列号" v-model="cameraForm.deviceKey"></el-input>
            </el-form-item>
            <el-form-item class="mt10" label="类型：" prop="type" v-else>
              <el-select readonly v-model="cameraForm.type" placeholder="请选择设备类型">
                <el-option label="客行分析" :value="4"></el-option>
                <el-option label="人脸抓拍" :value="5"></el-option>
              </el-select>
            </el-form-item>
            <span v-show="textState.text">
              <div class="name--text vam" :class="textState.name"><div>{{textState.text}}</div></div>
            </span>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button class="cancel" @click="cameraVisible = false">返 回</el-button>
          <el-button class="affirm" :disabled="deviceInfo.title === 'add' && textState.name !== 'safe'"  type="primary" @click="cameraDevice('cameraForm')">确定</el-button>
        </div>
      </ob-dialog-form>
    </div>
</template>

<script>
import {simplifyGroups, restoreArray, byKeyDeviceType} from '../../utils'
import {validateRule} from '../../utils/validate'
import {mapState} from 'vuex'
const UPLOAD_API = process.env.UPLOAD_API
export default {
  name: 'service',
  data () {
    // 校验设备名称
    const validateName = (rule, value, callback) => {
      console.log('validator', 'value')
      if (!value) {
        callback(new Error('请输入设备名称'))
      } else {
        if (value.length > 32) {
          callback(new Error('请输入1-32位字符'))
        } else if (validateRule(value, 2)) {
          this.$http('/merchant/device/alias/exist', {name: value}, false).then(res => {
            res.data ? callback(new Error('设备别名已存在')) : callback()
          }).catch(err => {
            callback(new Error(err.msg || '验证失败'))
          })
        } else {
          callback(new Error('请输入正确的设备别名'))
        }
      }
    }
    // 校验设备序列号
    const validateKey = (rule, value, callback) => {
      this.deviceInfo.type = ''
      this.deviceInfo.exist = ''
      if (!value) {
        callback(new Error('请输入16位序列号'))
      } else {
        if (value.length === 16) {
          // 校验设备序列号是否存在
          this.$http('/device/deviceKey', {deviceKey: value}).then(res => {
            if (res.data) {
              // 校验设备是否被绑定过
              this.$http('/merchant/device/exist', {deviceKey: value}, false).then(res2 => {
                let dType = byKeyDeviceType(value)
                if (!res2.data) {
                  this.deviceInfo.exist = false
                } else {
                  this.deviceInfo.exist = true
                }
                // 添加一体机时输入了服务器的序列号时提示 序列号不存在 反之也如此
                if (dType.type === 4 || dType.type === 5) {
                  this.deviceInfo.type = dType.type
                  callback()
                } else {
                  this.deviceInfo.exist = ''
                  callback(new Error('设备序列号不存在'))
                }
              }).catch(err => {
                callback(new Error(err.msg || '服务器异常'))
              })
            } else {
              this.deviceInfo.type = ''
              this.deviceInfo.exist = ''
              callback(new Error('设备序列号不存在'))
            }
          })
        } else {
          callback(new Error('请输入16位序列号'))
        }
      }
    }
    return {
      dialogFormVisible: false, // 绑定社群弹框
      progress: '', // 上传进度弹框提示
      multipleSelection: [],
      serviceList: [],
      groupList: [],
      pagination: {},
      searchText: '',
      filterValue: {
        type: '',
        groupGuid: ''
      },
      bindCommunityForm: {},
      equipmentForm: {
        name: ''
      },
      rules: {
        name: [
          {required: true, validator: validateName, trigger: 'blur'}
        ]
      },
      cameraVisible: false,
      cameraForm: { // 添加摄像头、编辑摄像头 表单对象
        deviceKey: '',
        name: '',
        type: ''
      },
      cameraRules: {
        name: [
          {validator: validateName, trigger: 'blur'}
        ],
        deviceKey: [
          {validator: validateKey, trigger: ['change', 'blur']}
        ]
      },
      fileList: [], // 上传文件列表
      deviceInfo: {
        type: '',
        exist: ''
      } // 设备信息
    }
  },
  created () {
    this.getGroupList()
    this.getDeviceList()
  },
  mounted () {
  },
  computed: {
    ...mapState(['userInfo']),
    menu: {
      get () {
        let [text, name] = ['', this.$route.query.name]
        switch (this.$route.name) {
          case 'equipmentMineService':
            text = `自有设备&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;${name}`
            break
          case 'equipmentService':
            text = `非自有设备&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;${name}`
            break
        }
        return [{title: `${text}`}]
      },
      set () {}
    },
    bindList: {
      get () {
        let list = JSON.parse(JSON.stringify(this.groupList))
        return restoreArray(list, 'memberItem')
      },
      set () {}
    },
    bindGroups: {
      get () {
        let groups = JSON.parse(JSON.stringify(this.serviceList))
        let hash = {}
        groups = groups.map(item => {
          return {
            groupGuid: item.groupGuid,
            name: item.groupName
          }
        }).reduce((item2, next) => {
          if (next.groupGuid && !hash[next.groupGuid]) {
            hash[next.groupGuid] = true
            item2.push(next)
          }
          return item2
        }, [])
        return groups
      },
      set () {}
    },
    tableList: {
      get () {
        let newList = JSON.parse(JSON.stringify(this.serviceList))
        newList = newList.filter(item => {
          if (this.filterValue.type || this.filterValue.groupGuid !== '') {
            return (this.filterValue.type ? item.type === this.filterValue.type : true) && (this.filterValue.groupGuid !== '' ? item.groupGuid === this.filterValue.groupGuid : true)
          }
          return true
        })
        return newList
      },
      set (val) {
        this.serviceList = val
      }
    },
    baseApi () {
      return UPLOAD_API
    },
    textState: {
      get () {
        let [cName, text] = ['', '']
        switch (this.deviceInfo.type) {
          case 3:
            text = `人脸抓拍一体机`
            break
          case 2:
            text = `客行分析一体机`
            break
          case 5:
            text = `人脸抓拍摄像头`
            break
          case 4:
            text = `客行分析摄像头`
            break
          case 1:
            text = '服务器'
            break
        }
        switch (this.deviceInfo.exist) {
          case '':
            cName = ''
            text = ''
            break
          case false:
            cName = 'safe'
            text = `可添加的${text}`
            break
          case true:
            cName = 'danger'
            text = `已添加的${text}`
            break
        }
        return {text: text, name: cName}
      },
      set (val) {
        // this.textValue = val
      }
    }
  },
  methods: {
    // 查询服务列表设备
    search (val) {
      this.searchText = val
      this.filterValue = {
        type: '',
        groupGuid: ''
      }
      this.getDeviceList()
    },
    // 清除过滤条件
    clearFilters () {
      this.filterValue = {
        groupGuid: '',
        type: ''
      }
    },
    // 获取摄像头设备列表信息
    getDeviceList (page) {
      page = page || this.pagination.index || 1
      let searchData = {
        serverKey: this.$route.params.key
      }
      if (this.searchText) searchData.name = this.searchText
      this.$http('/device/deviceCamera/search', searchData).then(res => {
        (res.data || []).map(item => {
          item.popover = false
          return item
        })
        this.serviceList = res.data || []
      })
    },
    // 获取社群树形结构数据
    getGroupList () {
      this.$http('/group/list/self').then(res => {
        this.groupList = simplifyGroups(res.data)
      })
    },
    // 多选框发生改变时触发，返回当前选中值
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 绑定社群
    bindCommunity (data) {
      let [subData, url] = ['', '/device/batch/binding']
      console.log('back', data)
      if (!data[0]) {
        this.$tip('请选取社群', 'error')
        return
      }
      if (!this.bindCommunityForm.deviceKey) {
        subData = JSON.parse(JSON.stringify(this.multipleSelection.filter(item => !item.groupName).map(item => {
          return {
            deviceKey: item.deviceKey,
            name: item.name,
            groupGuid: data[0].groupGuid,
            merchantGuid: this.userInfo.deverloperId
          }
        })))
      } else {
        subData = [{
          merchantGuid: this.userInfo.developerId,
          deviceKey: this.bindCommunityForm.deviceKey,
          groupGuid: data[0].groupGuid,
          name: this.bindCommunityForm.name
        }]
      }
      this.dialogFormVisible = false
      this.$load('设备绑定中...')
      this.$http(url, subData).then(res => {
        this.$load().close()
        this.$tip('绑定成功')
        this.getDeviceList()
      }).catch(() => {
        this.$load().close()
      })
    },
    // 解绑社群
    unBindCommunity (value, index) {
      this.$affirm({
        confirm: '确定',
        cancel: '返回',
        text: '确定将设备从社群解绑？'
      }, (action, instance, done) => {
        if (action === 'confirm') {
          this.$http('/device/unbinding', {
            deviceKey: value.deviceKey,
            groupGuid: value.groupGuid
          }).then(res => {
            this.$tip('解绑成功')
            this.getDeviceList()
          })
        }
        done()
      })
    },
    // 删除设备
    deleteEquipment (data) {
      let deleteArr = [data.deviceKey]
      if (Array.isArray(data)) {
        deleteArr = data.filter(item => !item.groupName).map(item => item.deviceKey)
        if (data.filter(item => item.groupName).length) {
          this.$tip('请先解绑设备', 'error')
          return
        }
      } else if (data.groupName) {
        this.$tip('请先解绑设备', 'error')
        return
      }
      this.$affirm(
        {
          confirm: '确定',
          cancel: '返回',
          text: `确定删除选中设备？`
        }, (action, instance, done) => {
          if (action === 'confirm') {
            this.$http('/device/deviceCamera/delete', deleteArr).then(res => {
              this.$tip('删除成功')
              this.getDeviceList()
            })
          }
          done()
        }
      )
    },
    // 批量操作处理
    handleSelect (type) {
      console.log(type, this.filterValue)
      if (!this.multipleSelection.length) {
        this.$tip('请选取设备', 'error')
        return
      }
      if (type === 'bind') {
        this.dialogFormVisible = true
      } else if (type === 'delete') {
        this.deleteEquipment(this.multipleSelection)
      } else {
        // 批量解绑
        // 数据提交是过滤掉未绑定社群的设备
        let selectArr = this.multipleSelection.filter(item => item.groupName).map(item => item.deviceKey)
        this.$affirm({
          confirm: '确定',
          cancel: '返回',
          text: '确定将设备从社群解绑？'
        }, (action, instance, done) => {
          if (action === 'confirm') {
            this.$http('/device/batch/unbinding', selectArr).then(res => {
              this.$tip('解绑成功')
              this.getDeviceList()
            })
          }
          done()
        })
      }
    },
    // 显示绑定社群弹框
    showDialogForm (row) {
      if (row.groupName) {
        this.unBindCommunity(row)
      } else {
        this.bindCommunityForm = row
        this.dialogFormVisible = true
      }
    },
    // 显示修改昵称popover
    showPopover (index) {
      this.equipmentForm = JSON.parse(JSON.stringify({
        deviceKey: this.serviceList[index].deviceKey,
        serverKey: this.serviceList[index].serverKey,
        name: this.serviceList[index].name
      }))
    },
    // 隐藏修改昵称popover
    hidePopover (index) {
      if (this.$refs['tableForm' + index]) {
        this.$refs['tableForm' + index].clearValidate()
      }
    },
    // 修改设备昵称
    changeEquipmentName (index) {
      this.$refs['tableForm' + index].validate((valid) => {
        if (valid) {
          this.$http('/device/deviceCamera/name/update', this.equipmentForm).then(res => {
            this.$tip('修改成功')
            this.$set(this.serviceList[index], 'popover', false)
            this.serviceList[index].name = this.equipmentForm.name
          }).catch(err => { console.log(err) })
        } else {
          console.log('error submit')
        }
      })
    },
    // 添加摄像头、编辑摄像头信息
    cameraDevice (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http('/device/deviceCamera/info/add', this.cameraForm).then(res => {
            this.$tip(this.deviceInfo.title === 'add' ? '添加成功' : '修改成功')
            this.cameraVisible = false
            this.getDeviceList()
          })
        }
      })
    },
    // 显示添加摄像头弹框
    showCameraDialog (type, data) {
      if (type === 'edit') {
        this.cameraForm = JSON.parse(JSON.stringify(data))
      } else {
        this.cameraForm = {
          deviceKey: '',
          serverKey: this.$route.params.key,
          name: '',
          type: ''
        }
      }
      this.deviceInfo.title = type
      this.cameraVisible = true
    },
    handleProgress (event) {
      console.log(new Date().getTime(), event.percent)
      this.progress = this.$tip(`正在导入，请耐心等待…<br>${Math.floor(event.percent)}/100`, 'waiting', () => {})
    },
    // 文件上传前拦截处理
    beforeUpload (file) {
      if (file && file.type) {
        if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          this.$tip('只允许上传Excel文件', 'error')
          return false
        }
      } else {
        this.$tip('请选取需要上传的文件', 'error')
        return false
      }
    },
    // 上传成功时回调
    handleSuccess (res) {
      this.fileList = []
      if (res.result) {
        this.progress.close()
        this.getDeviceList()
      } else {
        this.$tip(res.msg, 'error', 3000)
      }
    },
    // 上传失败时回调
    handleError (res) {
      this.fileList = []
      this.$tip(res.msg || '上传失败', 'error', 3000)
    }
  },
  watch: {
    dialogFormVisible (val) {
      if (val) {
        this.getGroupList()
      } else {
        this.bindCommunityForm = {}
      }
    },
    filterValue: {
      handler (val) {
        // this.getDeviceList()
      },
      deep: true
    },
    cameraVisible (val) {
      if (val) {
        this.$nextTick(() => {
          if (this.$refs.cameraForm) {
            this.$refs.cameraForm.clearValidate()
          }
        })
      } else {
      }
    }
  },
  filters: {
    cameraType (val) {
      let txt = ''
      switch (val) {
        case 1:
          txt = '客行分析'
          break
        case 2:
          txt = '人脸抓拍'
          break
      }
      return txt
    }
  }
}
</script>

<style lang="scss" scoped>
.filter__list--wrap{
  margin: 22px 0 12px;
  overflow: hidden;
  > *:not(a) {
    float: left;
  }
  > .el-select {
    width: 150px;
    margin-right: 12px;
  }
  > .fr {
    margin-top: 8px;
    font-size: 12px;
  }
}
.server__list-wrap{
  height: calc(100% - 146px);
}
</style>
