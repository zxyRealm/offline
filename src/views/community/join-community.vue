<template>
  <div class="edit-custom-wrap">
    <uu-sub-tab
      back
      :menu-array="[{title:'加入社群'}]"></uu-sub-tab>
    <div class="community-common-form-wrap dashed-border vam">
      <uu-form
        width="320px"
        label-width="96px"
        :sub-text="step===2?'确定':''"
        @handle-submit="submitForm"
        v-model="joinForm"
        :rules="rules"
      >
        <el-form-item label-width="86px">
          <div class="item-title">
            1.通过社群邀请码搜索社群
          </div>
        </el-form-item>
        <el-form-item label="社群邀请码：" prop="code">
          <el-input
            type="text"
            placeholder="请输入社群邀请码"
            v-model.trim="joinForm.code"></el-input>
        </el-form-item>
        <el-form-item v-if="communityInfo.guid && step!==2" label-width="0">
          <div class="info-wrap">
            <div class="txt">
              您
              <a href="javascript:void (0)" @click="ensure">确定</a>
              加入【
              <el-tooltip :content="communityInfo.name" placement="top">
              <span class="ellipsis" style="">
                {{communityInfo.name}}
              </span>
              </el-tooltip>
              】社群？
            </div>
            <div class="fs12">
              <p><span>社群名称：</span>{{communityInfo.name}}</p>
              <p><span>地区：</span>{{communityInfo.fullAddress}}</p>
              <p><span>联系人：</span>{{communityInfo.cantact}}</p>
              <p><span>联系电话：</span>{{communityInfo.phone}}</p>
              <p><span>索权范围：</span>{{communityInfo.rule | authority}}</p>
            </div>
          </div>
        </el-form-item>
        <el-form-item label-width="86px" v-if="step===2">
          <div class="item-title">
            2.选择自有社群加入
          </div>
        </el-form-item>
        <el-form-item v-if="step===2" label="选择社群：" prop="groupGuid">
          <el-select v-model="joinForm.groupGuid" placeholder="请选择自有社群">
            <el-option
              v-for="item in groupList"
              :key="item.groupGuid"
              :label="item.groupNickName"
              :value="item.groupGuid"></el-option>
          </el-select>
        </el-form-item>
      </uu-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'edit-custom',
  data () {
    const validateCode = (rule, value, callback) => {
      value = value.trim()
      this.communityInfo = {}
      if (!value) {
        this.step = 1
        callback(new Error('请输入社群邀请码'))
      } else {
        if (value.length === 10) {
          if (/^[\da-zA-Z]{10}$/.test(value)) {
            this.$http('/group/code/info', {code: value}, false).then(res => {
              if (res.data) {
                this.communityInfo = res.data
                if (!this.groupList.length) {
                  this.getGroups()
                }
                callback()
              } else {
                callback(new Error('邀请码不存在，请重新输入'))
              }
            }).catch(err => {
              this.step = 1
              callback(new Error(err.msg || '邀请码不存在'))
            })
          } else {
            this.step = 1
            callback(new Error('请输入正确的社群邀请码'))
          }
        } else {
          this.step = 1
          callback(new Error('请输入10位社群邀请码'))
        }
      }
    }
    return {
      step: 1,
      currentCode: '',
      groupList: [],
      communityInfo: {},
      joinForm: {
        groupPid: '',
        groupGuid: '',
        code: ''
      },
      rules: {
        groupPid: [
          {required: true, message: '请选择一个自有社群', trigger: 'blur'}
        ],
        groupGuid: [
          {required: true, message: '请选择一个自有社群', trigger: 'blur'}
        ],
        code: [
          {validator: validateCode, trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    submitForm (data) {
      let join = () => {
        this.$http('/group/join', data).then(res => {
          this.$tip('加入成功')
          this.$router.push('/community/mine')
        })
      }
      if (this.communityInfo.rule.split(',').length === 2) {
        this.$http('/merchant/device/operationPermission', {guid: data.groupGuid}).then(res => {
          if (res.data) {
            join()
          } else {
            this.$tip(`您已将【设备操作权限】授权给其他社群,
              <br>无法加入【
              <span class="maxw200 ellipsis">${this.communityInfo.name}</span>】`,
            'caution')
          }
        })
      } else {
        join()
      }
    },
    // 获取自有社群
    getGroups () {
      this.$http('/group/list').then(res => {
        this.groupList = res.data
      })
    },
    ensure () {
      this.joinForm.groupPid = this.communityInfo.guid
      if (this.communityInfo.rule.split(',').length === 2) {
        this.$affirm({
          text: '【设备操作权限】只能授权给一个社群，请谨慎加入。<br>确定加入社群【' + this.communityInfo.name + '】？'
        }, (action, instance, done) => {
          if (action === 'confirm') {
            done()
            this.step = 2
          } else {
            done()
          }
        })
      } else {
        this.step = 2
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .community-common-form-wrap {
    .el-form-item {
      .item-title {
        font-size: 14px;
        margin: 30px 0 15px;
      }
      .info-wrap {
        float: right;
        > .txt {
          font-size: 14px;
          line-height: 40px;
          margin-top: 10px;
          .ellipsis {
            max-width: 7em;
            width: auto;
            line-height: 1;
            vertical-align: sub;
          }
        }
        > .fs12 {
          color: rgba(255, 255, 255, 0.5);
          p {
            line-height: 30px;
            text-align: left;
            > span {
              font-size: 14px;
            }
          }
        }
      }
      &:first-child {
        .item-title {
          margin-top: 0;
        }
      }
    }
  }
</style>
