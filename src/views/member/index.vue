<template>
    <div class="menber">
      <div class="member__title">
        <el-breadcrumb separator="/" class="fl">
          <el-breadcrumb-item :to="{ path: '/member' }">人员管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button class="affirm medium fr add__button" @click="addNew">添加库<div @click.stop="add__hint" class="first__enter" v-show="firstEnter">人员库添加点这里</div></el-button>
      </div>
      <el-scrollbar class="table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column label="库名" min-width="200" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span class="libraryName">{{scope.row.name || '—'}}</span>
              <el-popover
                v-model="scope.row.showPopver"
                placement="top"
                width="220">
                <input type="text" maxlength="20" v-model.trim="changeName" class="changeText">
                <span class="el-icon-circle-check-outline sure" @click="sureChange(scope.row)"></span>
                <span class="el-icon-circle-close-outline close" @click="closeChange"></span>
                <span class="el-icon-edit name__edit" slot="reference" @click="getName(scope.row.name)"></span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            min-width="200"
            prop="remark"
            :show-overflow-tooltip="true"
            label="备注">
            <template slot-scope="scope">
              <span class="libraryName">{{scope.row.remark || '—'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="memberCount"
            label="人员数">
          </el-table-column>
          <el-table-column
            label="关联社群"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div v-if="!scope.row.groupName" class="relevance__cont">暂无</div>
              <div v-else class="relevance__cont">{{scope.row.groupName}}</div>
              <div v-if="!scope.row.groupName" class="relevance" @click="getGroupList(scope.row)"></div>
              <div v-else class="relevance el-icon-edit noImage" @click="getGroupList(scope.row)"></div>
            </template>
          </el-table-column>
          <el-table-column
            min-width="200"
            label="操作">
            <template slot-scope="scope">
              <div class="fl hand edit" @click="editNew(scope.row.guid)">编辑</div>
              <div class="fl hand manage" @click="goDetails(scope.row.guid)">人员管理</div>
              <div class="fl hand del" @click="del(scope.row.guid)">删除</div>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>

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
import {simplifyGroups} from '@/utils'
export default {
  name: 'index',
  data: () => ({
    // 列表内容
    tableData: [],
    // 要改变的库名称
    changeName: '',
    showPopver: false,
    firstEnter: false,
    dialogFormVisible: false,
    sendData: '',
    groupList: []

  }),
  created () {
    this.getList()
    this.$http('/firstCheck', {name: 'insight_member_list_first'}).then(res => {
      if (res.data) {
        this.firstEnter = true
      }
    })
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    // 获取人员库列表
    getList () {
      let data = {
        index: 1,
        length: -1
      }
      this.$http('/memberLibrary/search', data).then(res => {
        if (res.result) {
          for (let i = 0; i < res.data.content.length; i++) {
            res.data.content[i].showPopver = false
          }
          this.tableData = res.data.content
        }
      })
    },
    // 添加库
    addNew () {
      this.$http('/group/faceSetCheck').then(res => {
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
    // 编辑库
    editNew (e) {
      this.$router.push({path: '/member/library', query: {guid: e}})
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
          this.$http('/memberLibrary/delete', data).then(res => {
            if (res.result) {
              this.getList()
              done()
            }
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
    sureChange (e) {
      let data = {
        guid: e.guid,
        name: this.changeName
      }
      this.$http('/memberLibrary/update', data).then(res => {
        if (res.result) {
          this.getList()
          this.removeState()
        }
      })
    },
    // 关闭改变库名称
    closeChange () {
      this.changeName = ''
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
      this.changeName = e
    },
    add__hint () {
      console.log(123)
    },
    // 获取自有社群列表，绑定社群时只能绑定自有社群
    getGroupList (e) {
      this.sendData = e
      this.$http('/group/list/self').then(res => {
        this.groupList = simplifyGroups(res.data)
        this.dialogFormVisible = true
      })
    },
    // 确认关联
    bindCommunity (data) {
      if (!data) {
        return false
      }
      let send = {
        guid: this.sendData.guid,
        name: this.sendData.name,
        groupGuid: data[0].groupGuid
      }
      this.$http('/memberLibrary/update', send).then(res => {
        if (res.result) {
          this.getList()
          this.dialogFormVisible = false
        }
      })
    }
  },
  watch: {}
}
</script>

<style scoped>
  .menber{
    padding: 0 20px;
  }
  .member__title{
    padding-top: 26px;
    margin-bottom: 22px;
    height: 36px;
    border-bottom: 1px dashed rgba(151,151,151,0.10);
  }
  .hand{
    cursor: pointer;
  }
  .edit{
    color: #0F9EE9;
  }
  .manage{
    margin-left: 40px;
    color: #0F9EE9;
  }
  .del{
    margin-left: 40px;
    color: #FF6660;
  }
  .table{
    height: calc(100% - 63px - 40px);
    overflow: hidden;
  }
  .name__edit{
    position: absolute;
    right: 20px;
    color: #0F9EE9;
    font-size: 16px;
    cursor: pointer;
  }
  .changeText{
    width: 160px;
    height: 16px;
  }
  .sure{
    cursor: pointer;
    color: #0F9EE9;
    font-size: 20px;
  }
  .close{
    cursor: pointer;
    color: #EE6C4B;
    font-size: 20px;
  }
  .add__button{
    position: relative;
  }
  .first__enter{
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
  .first__enter::before{
    box-sizing: content-box;
    width: 0px;
    height: 0px;
    position: absolute;
    top: -10px;
    right:40px;
    padding:0;
    border-bottom:5px solid #FFFFFF;
    border-top:5px solid transparent;
    border-left:5px solid transparent;
    border-right:5px solid transparent;
    display: block;
    content:'';
    z-index: 12;
  }
  .libraryName{
    float: left;
    width: calc(100% - 50px);
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>

<style>
  .menber .el-scrollbar__wrap{
    overflow-x:hidden;
  }
  .relevance{
    cursor: pointer;
    position: absolute;
    right: 15px;
    top: 12.5px;
    width: 15px;
    height: 15px;
    background: url("/static/img/binding.png");
    background-size: contain;
  }
  .noImage{
    background: none;
  }
  .relevance__cont{
    width: calc(100% - 21px - 30px);
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
</style>
