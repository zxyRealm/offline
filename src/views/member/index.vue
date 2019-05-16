<template>
  <div class="menber">
    <div class="member__title">
      <el-breadcrumb separator="/" class="fl">
        <el-breadcrumb-item :to="{ path: '/member' }">人员管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button class="affirm medium fr add__button" @click="addNew">添加库
        <div @click.stop="add__hint" class="first__enter" v-show="firstEnter">人员库添加点这里</div>
      </el-button>
    </div>
    <div class="data-list-wrap">
      <el-scrollbar v-scroll-top class="table">
        <el-table
          :empty-text="emptyText"
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column label="库名" min-width="100" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span class="libraryName">{{scope.row.name || '—'}}</span>
              <el-popover
                :hide="removeVerify(scope.$index)"
                v-model="scope.row.showPopver"
                placement="top"
                width="210">

                <el-form
                  :key="scope.$index"
                  @submit.native.prevent
                  :ref="'tableForm' + scope.$index"
                  :rules="rules"
                  class="table-form"
                  :model="changeName"
                >
                  <el-form-item :key="'form-item' + scope.$index" prop="name">
                    <input type="text" maxlength="20" v-model.trim="changeName.name"
                           class="changeText">
                    <uu-icon type="success"
                             @click.native="sureChange(scope.row,scope.$index)"></uu-icon>
                    <uu-icon type="error" @click.native="closeChange"></uu-icon>
                  </el-form-item>
                </el-form>
                <span class="el-icon-edit name__edit" slot="reference"
                      @click="getName(scope.row.name)"></span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            min-width="100"
            prop="remark"
            :show-overflow-tooltip="true"
            label="备注">
            <template slot-scope="scope">
              <span class="libraryName">{{scope.row.remark || '—'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="类型">
            <template slot-scope="scope">
              {{scope.row.type | libraryType}}
            </template>
          </el-table-column>
          <el-table-column
            width="90"
            prop="memberCount"
            label="人员数">
          </el-table-column>
          <el-table-column
            min-width="100"
            label="操作">
            <template slot-scope="scope">
              <router-link class="fl" :to="{name: 'Library', query: {guid: scope.row.guid}}">编辑
              </router-link>
              <div class="fl hand manage" @click="goDetails(scope.row.guid)">人员管理</div>
              <div class="fl hand del" @click="del(scope.row.guid)">删除</div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="pagination.total && pagination.total > pagination.length"
          @current-change="getList"
          :current-page="pagination.index"
          :page-size="pagination.length"
          layout="total, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </el-scrollbar>
    </div>
    <!--设备绑定社群-->
    <ob-dialog-form
      filter
      @remote-submit="bindCommunity"
      :group="groupList"
      title="关联社群"
      type="group"
      :visible.sync="dialogFormVisible"
    >
    </ob-dialog-form>

  </div>
</template>

<script>
import { validateRule } from '@/utils/validate'
import { MemberNoFloor } from '../../api/community'
import { IsManageGroup, FirstLogin } from '../../api/common'
import { MemberLibraryUpdate, MemberLibraryDelete, MemberLibraryList, MemberLibraryNameExist } from '../../api/member'
import { mapState } from 'vuex'

export default {
  name: 'index',
  data () {
    const name = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入库名称'))
      } else if (!validateRule(value, 2)) {
        callback(new Error('仅限汉字/字母/数字/下划线/空格'))
      } else if (this.checkName === value) {
        callback()
      } else {
        let data = {
          name: value
        }
        MemberLibraryNameExist(data).then(res => {
          if (!res.data) {
            callback(new Error('应用库名称重复'))
          } else {
            callback()
          }
        }).catch(() => {
          callback(new Error('校验失败,请重试'))
        })
      }
    }
    return {
      emptyText: '数据加载中...',
      rules: {
        name: [{required: true, validator: name, trigger: 'change'}]
      },
      // 列表内容
      tableData: [],
      pagination: {
        length: 10
      },
      // 要改变的库名称
      changeName: {
        name: ''
      },
      showPopver: false,
      firstEnter: false,
      dialogFormVisible: false,
      sendData: '',
      groupList: [],
      checkName: ''
    }
  },
  created () {
    this.getList()
    FirstLogin({name: 'insight_member_list_first'}).then(res => {
      if (res.data) {
        this.firstEnter = true
      }
    })
  },
  mounted () {

  },
  computed: {
    ...mapState(['currentManage'])
  },
  methods: {
    // 获取人员库列表
    getList (page) {
      if (!this.currentManage.id) return
      let data = {
        index: page || this.pagination.index || 1,
        length: this.pagination.length || 10,
        groupGuid: this.currentManage.id
      }
      this.emptyText = '数据加载中...'
      MemberLibraryList(data).then(res => {
        for (let i = 0; i < res.data.content.length; i++) {
          res.data.content[i].showPopver = false
        }
        this.tableData = res.data.content
        this.pagination = res.data.pagination
        this.emptyText = '暂无数据'
      }).catch(() => {
        this.emptyText = '数据获取失败'
      })
    },
    // 添加库
    addNew () {
      IsManageGroup().then(res => {
        if (!res.data) {
          this.$affirm({
            confirm: '前往【社群管理】',
            cancel: '知道了',
            text: '需满足条件：<br/>该账号下有管理员社群/单店社群/成员社群（已加入管理员社群）'
          }, (action, instance, done) => {
            if (action === 'confirm') {
              this.$router.push({path: '/community/mine'})
              done()
            } else {
              done()
            }
          })
        } else {
          this.$router.push({path: '/member/library'})
        }
      })
    },
    // 删除库
    del (e) {
      let data = {
        guid: e
      }
      this.$affirm({
        confirm: '确定',
        cancel: '返回',
        text: '确定删除该人员库信息？'
      }, (action, instance, done) => {
        if (action === 'confirm') {
          MemberLibraryDelete(data).then(() => {
            this.getList()
            done()
          })
        } else {
          done()
        }
      })
    },
    // 人员管理
    goDetails (e) {
      this.$router.push({path: '/member/details', query: {guid: e}})
    },
    // 确定改变库名称
    sureChange (e, index) {
      let data = {
        guid: e.guid,
        name: this.changeName.name
      }
      this.$refs['tableForm' + index].validate((valid) => {
        if (valid) {
          MemberLibraryUpdate(data).then(() => {
            this.getList()
            this.removeState()
          })
        } else {
          console.log('error submit')
        }
      })
    },
    // 关闭改变库名称
    closeChange () {
      this.changeName.name = ''
      this.removeState()
    },
    // 恢复弹窗状态
    removeState () {
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].showPopver = false
      }
    },
    // 获取库名称
    getName (e) {
      this.changeName.name = e
      this.checkName = e
    },
    add__hint () {
      // console.log(123)
    },
    // 获取自有社群列表，绑定社群时只能绑定自有社群
    getGroupList (e) {
      this.sendData = e
      if (!this.currentManage.id) return
      MemberNoFloor({groupId: this.currentManage.id}).then(res => {
        if (res.data[0]) {
          res.data[0].subGroupSon = res.data.slice(1)
          this.groupList = [res.data[0]]
        }
        this.dialogFormVisible = true
      })
    },
    // 确认关联
    bindCommunity (data) {
      if (!data.length) {
        this.$tip('请选择要绑定的社群', 'error')
        return false
      }
      let gid = data[0].guid
      if (data[0].guid === this.groupList[0].guid) {
        gid = this.currentManage.id
      }
      let send = {
        guid: this.sendData.guid,
        name: this.sendData.name,
        groupGuid: gid
      }
      MemberLibraryUpdate(send).then(() => {
        this.getList()
        this.dialogFormVisible = false
      })
    },
    // 清除表单校验
    removeVerify (e) {
      if (this.$refs['tableForm' + e]) {
        this.$refs['tableForm' + e].clearValidate()
      }
    }
  },
  watch: {
    currentManage: {
      handler () {
        this.getList()
      },
      deep: true
    }
  },
  filters: {
    libraryType (type) {
      let typeName = ''
      switch (type) {
        case 1:
          typeName = '会员'
          break
        case 2:
          typeName = '员工'
          break
        case 3:
          typeName = '黑名单'
          break
      }
      return typeName
    }
  }
}
</script>

<style lang="scss" scoped>
  .menber {
  }

  .member__title {
    height: 36px;
    border-bottom: 1px dashed rgba(151, 151, 151, 0.10);
    padding: 26px 20px 0;
  }

  .hand {
    cursor: pointer;
  }

  .edit {
    color: #0F9EE9;
  }

  .manage {
    margin-left: 40px;
    color: #0F9EE9;
  }

  .del {
    margin-left: 40px;
    color: #FF6660;
  }

  .table {
    /*height: calc(100% - 63px - 40px);*/
    overflow: hidden;
  }

  .name__edit {
    position: absolute;
    right: 20px;
    color: #0F9EE9;
    font-size: 16px;
    cursor: pointer;
  }

  .changeText {
    width: 160px;
    height: 16px;
  }

  .sure {
    cursor: pointer;
    color: #0F9EE9;
    font-size: 20px;
  }

  .close {
    cursor: pointer;
    color: #EE6C4B;
    font-size: 20px;
  }

  .add__button {
    position: relative;
  }

  .first__enter {
    z-index: 10;
    font-size: 12px;
    color: #191919;
    letter-spacing: 0;
    position: absolute;
    right: 0;
    top: 40px;
    width: 150px;
    height: 35px;
    line-height: 35px;
    background-color: #fff;
    border-radius: 3px;
  }

  .first__enter::before {
    box-sizing: content-box;
    width: 0px;
    height: 0px;
    position: absolute;
    top: -10px;
    right: 40px;
    padding: 0;
    border-bottom: 5px solid #FFFFFF;
    border-top: 5px solid transparent;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    display: block;
    content: '';
    z-index: 12;
  }

  .libraryName {
    float: left;
    width: calc(100% - 50px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .grey {
    color: rgba(255, 255, 255, 0.5);
  }
</style>

<style>
  .menber .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .relevance {
    cursor: pointer;
    position: absolute;
    right: 15px;
    top: 12.5px;
    width: 15px;
    height: 15px;
    background: url("../../assets/public/binding.png");
    background-size: contain;
  }

  .noImage {
    background: none;
  }

  .relevance__cont {
    width: calc(100% - 21px - 30px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }
</style>
