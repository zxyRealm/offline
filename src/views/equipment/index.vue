<template>
  <div class="equipment-list-wrap">
    <uu-sub-tab search @remote-search="search" :menu-array="[{title: '设备列表'}]"></uu-sub-tab>
    <uu-sub-tab
      size="medium"
      :show-button="!equipmentEmpty"
      :sub-btn="{text:'创建'}"
      @handle-btn="showDialog('device')"
      :menu-array="menu2"></uu-sub-tab>
    <div v-if="equipmentEmpty" class="no-data-equipment">
      您还没有设备，点击【添加】进行添加设备。
    </div>
    <div class="data-list-wrap" v-else>
      <template v-for="(item,$index) in equipmentList">
        <ob-list>
          <ob-list-item>
            <p>
              <span>设备别名：</span>
              <el-popover
                placement="top"
                @show="showPopover($index)"
                v-model="item.popover"
                trigger="click">
                <el-form
                  @submit.native.prevent
                  ref="tableForm"
                  class="table-form"
                  :model="equipmentForm"
                >
                  <el-form-item :rules="rules" prop="deviceName">
                    <el-input type="text" v-model="equipmentForm.deviceName"></el-input>
                    <uu-icon type="success" @click.native="changeEquipmentName('tableForm',$index)"></uu-icon>
                    <uu-icon type="error" @click.native="cancelPopover($index)"></uu-icon>
                  </el-form-item>
                </el-form>
                <a href="javascript:void (0)" slot="reference">{{item.deviceName?item.deviceName:'暂无昵称'}}</a>
              </el-popover>
            </p>
            <p>
              <span>运行状态：</span>
              <span class="error-color">{{item.deviceState | deviceState}}</span>
              <a href="javascript:void (0)" @click="getEquipmentState(item)">
                <i v-if="item.deviceState" class="el-icon-refresh success-color"></i>
                <template v-else>获取</template>
              </a>
            </p>
          </ob-list-item>
          <ob-list-item>
            <p><span>序列号：</span><span>{{item.deviceKey}}</span></p>
            <p><span>设备类型：</span>{{item.deviceType|deviceType}}</p>
            <p><span>添加时间：</span>{{item.createTime | parseTime('{y}/{m}/{d} {h}:{i}')}}</p>
          </ob-list-item>
          <ob-list-item>
            <p><span>用途：</span><br>
              <router-link v-if="item.deviceType!==1" :to="'/equipment/more/'+item.deviceKey">详情</router-link>
              <template v-else>
                {{item.deviceType | deviceType}}
              </template>
            </p>
          </ob-list-item>
          <ob-list-item>
            <p v-if="item.deviceCsys">
              <span>绑定社群：</span>
              <a href="javascript:void (0)" @click="showDialog('community')">未绑定</a>
            </p>
            <template v-else>
              <p>
                <span>绑定社群：</span>
                <span>{{item.groupName}}</span>
                <uu-icon type="relieve" class='fr' @click.native="unBindCommunity(item)"></uu-icon>
              </p>
              <p><span>绑定时间：</span><span>{{item.bindingTime | parseTime('{y}/{m}/{d} {h}:{i}')}}</span></p>
              <p><span>应用场景：</span>{{item.deviceScene}}</p>
            </template>
          </ob-list-item>
          <ob-list-item>
            <div class="handle">
              操作：<br>
              <el-popover
                placement="top"
                trigger="hover">
                <div>
                  <p>1.获取设备状态后，可进行操作。</p>
                  <p>2.已绑定至社群，无法删除该设备。</p>
                </div>
                <i slot="reference" style="margin-top: 10px" class="el-icon-question"></i>
              </el-popover>
            </div>
            <div class="btn-wrap">
              <el-button
                :disabled="btnState(item.deviceState,'close')"
                @click="handleBtn(item,'close')"
                class="medium close">{{item.deviceState===1?'关机':'开机'}}
              </el-button>
              <el-button
                :disabled="btnState(item.deviceState,'reboot')"
                @click="handleBtn(item,'reboot')"
                class="medium reboot">重启
              </el-button>
              <el-button
                :disabled="btnState(item.deviceState,'upgrade')"
                @click="handleBtn(item,'upgrade')"
                class="medium upgrade">升级
              </el-button>
              <el-button
                :disabled="btnState(item.deviceState,'reset')"
                @click="handleBtn(item,'reset')"
                class="medium reset">重置
              </el-button>
            </div>
            <el-button
              :disabled="btnState(item.deviceState,'del')"
              icon="el-icon-delete"
              @click="deleteEquipment(item)" circle>
            </el-button>
          </ob-list-item>
        </ob-list>
      </template>
    </div>
    <ob-dialog-form
      @remote-submit="submitForm"
      :type="dialogOptions.type"
      :title="dialogOptions.title"
      :visible.sync="dialogFormVisible">
    </ob-dialog-form>
  </div>
</template>

<script>
  import {parseTime} from '@/utils'
  export default {
    name: "index",
    data() {
      const validateName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('设备别名能为空'))
        } else {
          if(value.length>=2&& value.length<=18){
            this.$http("/merchant/device/alias/exist",{deviceName:value}).then(res=>{
              callback()
            }).catch(err=>{
              callback(new Error(err.msg||'验证失败'))
            });
          }else {
            callback(new Error("别名长度为2-18个字符"))
          }
        }
      };
      return {
        dialogOptions: {
          type: 'device',
          title: '添加设备'
        },
        equipmentEmpty: false,
        btnOption: {
          text: '创建'
        },
        menu: [
          {title: '设备列表'}
        ],
        menu2: [
          {title: '自有设备', index: '/equipment/mine'},
          {title: '子社群设备', index: '/equipment/children'}
        ],
        groupList: [],
        equipmentList: [
          {
            createTime: new Date().getTime(),
            intro: "通知",
            lastEditTime: null,
            merchantGuid: "12345678901",
            noticeGuid: "DF2503C1CC8945A9A6D90A78BA16DCD0",
            scene: null,
            state: 1,
            tokenURL: "http://baidu.com",
            type: "1"
          },
          {
            createTime: new Date().getTime(),
            intro: "通知",
            lastEditTime: null,
            merchantGuid: "12345678901",
            noticeGuid: "DF2503C1CC8945A9A6D90A78BA16DCD0",
            scene: null,
            state: 1,
            tokenURL: "http://baidu.com",
            type: "1"
          }
        ],
        pagination: {},
        equipmentForm: {
          deviceName: '',
          deviceKey: ''
        },
        rules: [
          {required: true, validator: validateName, trigger: "blur"}
          // { type: 'string',min:1,max: 18, message: '长度不可超过18个字符', trigger: 'change'}
        ],
        dialogFormVisible: false
      }
    },
    methods: {
      search(val){
        console.log('搜索',val)
      },
      submitForm(data) {
        if (this.dialogOptions.type === 'device') {
          // 添加商户设备
          this.$http("/merchant/device/create", data).then(res => {
            this.dialogFormVisible = false;
            this.$tip("创建成功");
            this.getMineEquipment()
          }).catch(err => {
            this.dialogFormVisible = false;
          });
        } else {
          // 绑定社群
          this.bindCommunity(data)
        }
      },
      // 显示表单
      showPopover(index) {
        this.equipmentForm.deviceName = '';
        this.equipmentForm.deviceKey = this.equipmentList[index].deviceKey;
      },
      // 关闭popover表单
      cancelPopover(index) {
        this.$set(this.equipmentList[index], 'popover', !this.equipmentList[index].popover)
      },
      showDialog(type) {
        this.dialogFormVisible = false;
        this.dialogOptions.type = type || 'device';
        this.dialogOptions.title = type === 'device' ? '添加设备' : '添加社群';
        if (type === 'community') {
          this.$http("/group/list").then(res => {
            if (res.data.length) {
              this.dialogFormVisible = true;
            } else {
              this.$affirm({
                text: '没有可绑定的社群，前往<a href="#/community/create">创建社群</a>。'
              }, (action, instance, done) => {
                if (action === 'confirm') {
                  done();
                } else {
                  done()
                }
              }, 'create')
            }
          });
        } else {
          this.dialogFormVisible = true
        }
      },
      // 获取自有设备
      getMineEquipment(page) {
        page = page || 1;
        this.$http("/device/list", {index: page, length: 10}).then(res => {
          this.equipmentList = res.data.content;
          this.pagination = res.data.pagination;
        })
      },
      deleteEquipment(item) {
        this.$affirm({
          confirm: '删除',
          cancel: '取消',
          text: '确定将设备【' + item.deviceName + '】删除？'
        }, (action, instance, done) => {
          if (action === 'confirm') {
            done();
          } else {
            done()
          }
        }, 'waiting')
      },
      // 获取设备状态
      getEquipmentState(value) {
        this.$set(value, 'deviceState', 1);
        // this.$http('');
        console.log("equipment state")
      },
      // 修改别名
      changeEquipmentName(formName, index) {
        this.$refs[formName][index].validate((valid) => {
          if (valid) {
            this.$http("/merchant/device/alias", this.equipmentForm).then(res => {
              this.$tip("修改成功");
              this.$set(this.equipmentList[index], 'popover', false);
              this.getMineEquipment(this.pagination.index)
            })
          } else {
            console.log('error submit')
          }
        });

      },

      //解 绑社群
      unBindCommunity(value) {
        this.$affirm({
          confirm: '确定',
          cancel: '返回',
          text: '将设备从社群解绑，您将无法查看该设备数据/无法操作设备。确定要将【' + value.deviceName + '】设备从【' + value.groupName + '】社群解绑？'
        }, (action, instance, done) => {
          if (action === 'confirm') {
            done();
            this.$http("/device/unbinding", {
              deviceKey: value.deviceKey,
              groupGuid: value.groupGuid
            }).then(res => {
              this.$tip("解绑成功");
            });
          } else {
            done()
          }
        })
      },
      // 绑定社群
      bindCommunity(value) {
        this.$affirm({
          text: '【设备操作权限】只能授权给一个社群，清谨慎加入。确定加入社群【星巴克】？'
        }, (action, instance, done) => {
          if (action === 'confirm') {
            this.$http('/device/binding', {deviceKey: value.deviceKey}).then(res => {
              this.$tip("解绑成功")
            });
          } else {
            done()
          }
        });

        // console.log(this.dialogFormVisible);
        // this.dialogFormVisible = true;
      },
      handleBtn(value,type) {
        let des = '';
        switch (type){
          case 'upgrade':
            des = '升级';
            break;
          case 'reboot':
            des = '重启';
            break;
          case 'reset':
            des = '重置';
            break;
          case 'close':
            if(value.deviceState!==-1){
              des = '开启';
            }else {
              des = '关闭'
            }
            break;
          default:
            des = '开启'
        }
        this.$affirm({text:'确定'+ des +'设备【'+value.deviceName+'】?'},(action,instance,done)=>{
          if(action==='confirm'){
            switch (type){
              case 'reboot':
                this.$tip("重启成功");
                break;
              case 'upgrade':
                this.$tip("正在升级中...");
                break;
              case 'reset':
                this.$tip("重置成功");
                break;
              case 'close':
                if(value.deviceState===-1){
                  this.$tip("设备开启中...")
                }else {
                  this.$tip('设备关闭中...')
                }
                break;
              default:
            }
            done()
          }else {
            done()
          }
        })

      },
      btnState(state, type) {
        //1开机 -1 关机 2升级 3重启 4重置
        switch (state) {
          case 1:
            return false;
          case -1:
            if (type === 'upgrade') {
              return true;
            } else {
              return false;
            }
          case 2:
            if (type === 'upgrade') {
              return false
            } else {
              return true;
            }
          case 3:
            return true;
          case 4:
            return true;
          default:
            return true;
        }
      }

    },
    created() {
      this.getMineEquipment()
    },
    filters: {
      type: function (val) {
        switch (val) {
          case 1:
            return '分析终端';
          case 2:
            return '客行分析一体机';
          default:
            return '身份识别一体机'
        }
      }
    }
  }
</script>

<style scoped>
  .data-list-wrap {
    margin-top: 24px;
  }
</style>
