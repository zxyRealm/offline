<template>
  <td :width="width" class="ob-list-sub-item">
    <template v-if="type==='handle'">
      <div class="handle btn-item">
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
      <div class="btn-wrap btn-item">
        <el-button
          :disabled="btnState(data.deviceState,'run')"
          @click="handleDevice('run')"
          class="medium close">{{data.deviceState===0?'关机':'开机'}}
        </el-button>
        <el-button
          :disabled="btnState(data.deviceState,'reboot')"
          @click="handleDevice('reboot')"
          class="medium reboot">重启
        </el-button>
        <el-button
          :disabled="btnState(data.deviceState,'upgrade')"
          @click="handleDevice('upgrade')"
          class="medium"
          :class="data.deviceState===3?'upgrading':'upgrade'"
        >{{data.deviceState===3?'升级中':'升级'}}
        </el-button>
        <el-button
          :disabled="btnState(data.deviceState,'reset')"
          @click="handleDevice('reset')"
          class="medium reset">重置
        </el-button>
      </div>
      <el-button
        v-if="showDelete"
        class="btn-item"
        :disabled="btnState(data.deviceState,'del')"
        icon="el-icon-delete"
        @click="deleteEquipment(data)" circle>
      </el-button>
    </template>
    <template v-else-if="type==='state'">
      <p>
        <span>设备别名：</span>
        <el-tooltip v-if="!isAmend" :content="data.deviceName" placement="top">
           <span  class="ellipsis">
         {{data.deviceName}}
        </span>
        </el-tooltip>
        <el-popover
          v-else
          placement="top"
          @show="showPopover"
          v-model="data.popover"
          trigger="click">
          <el-form
            @submit.native.prevent
            ref="tableForm"
            class="table-form"
            :model="equipmentForm"
          >
            <el-form-item :rules="rules" prop="deviceName">
              <el-input type="text" v-model="equipmentForm.deviceName"></el-input>
              <uu-icon type="success" @click.native="changeEquipmentName('tableForm')"></uu-icon>
              <uu-icon type="error" @click.native="data.popover=false"></uu-icon>
            </el-form-item>
          </el-form>
          <a href="javascript:void (0)" slot="reference">{{data.deviceName?data.deviceName:'暂无昵称'}}</a>
        </el-popover>
      </p>
      <p>
        <span>运行状态：</span>
        <span class="error-color">{{data.offline | lineState}}</span>
        <a href="javascript:void (0)" @click="getDeviceState(data)">
          <i v-if="data.offline||data.offline===0" class="el-icon-refresh success-color"></i>
          <template v-else>获取</template>
        </a>
      </p>
    </template>
    <template v-else>
      <p v-if="!router" v-for="(item,$index) in propList" :key="$index">
        <span>{{labelList[$index]?labelList[$index]+'：':''}}</span><span class="ellipsis">{{format(data[item])}}</span>
      </p>
      <p  v-else>
        {{label}}<br>
        <router-link :to="router">{{text}}</router-link>
      </p>
    </template>
    <slot></slot>
  </td>
</template>

<script>
  import { parseTime } from '@/utils'
  export default {
    name: "ob-list-item",
    props: {
      width:{
        type:String,
        default:'auto'
      },
      router:{
        type:[String],
        default:''
      },
      text:{
        type:[String],
        default:''
      },
      wrap:{
        type:[Boolean],
        default:true
      },
      type:{
        type:[String],
        default:''
      },
      prop: {
        type: [String],
        default: ''
      },
      label: {
        type: [String],
        default: ''
      },
      data: {
        type: [Object],
        default: () => ({})
      },
      filter:{
        type:[Function]
      },
      showDelete:{
        type:Boolean,
        default:false
      },
      isAmend:{
        type:Boolean,
        default:false
      }
    },
    data(){
      const validateName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('设备别名能为空'))
        } else {
          if (value.length >= 2 && value.length <= 18) {
            this.$http("/merchant/device/alias/exist", {deviceName: value}).then(res => {
              callback()
            }).catch(err => {
              callback(new Error(err.msg || '验证失败'))
            });
          } else {
            callback(new Error("别名长度为2-18个字符"))
          }
        }
      };
      return {
        equipmentForm: {
          deviceName: '',
          deviceKey: ''
        },
        rules: [
          {required: true, validator: validateName, trigger: "blur"}
        ],
      }
    },
    methods:{
      // 格式化内容
      format(val){
        switch (this.type){
          case 'type':
            return this.notifyType(val);
          case 'time':
            return parseTime(val,'{y}-{m}-{d} {h}:{i}');
          default:
            return val
        }
      },
      notifyType(type){
        switch (type){
          default:
            return '到店通知'
        }
      },
      getDeviceState(value){
        // 0为在线，1为离线
        this.$http("/device/state/use",{deviceKey:value.deviceKey}).then(res=>{
          if(this.data.offline!==undefined){
            this.$tip("刷新成功")
          }
          this.$set(this.data,'offline',res.data)
        })
      },
      handleDevice(type) {
        let [des,url,value]=['','',this.data];
        switch (type) {
          case 'upgrade':
            des = '升级';
            url = '/device/upgrade';
            break;
          case 'reboot':
            des = '重启';
            url = '/device/restart';
            break;
          case 'reset':
            des = '重置';
            url = '/device/reset';
            break;
          case 'run':
            if (value.deviceState === 1) {
              des = '开启';
            } else {
              des = '关闭'
            }
            // operationCode  开机为0 ，关机为1
            url = '/device/startOrShutdown';
            break;
          default:
            des = '开启';
            url = '/device/startOrShutdown'
        }
        this.$affirm({text: '确定' + des + '设备【' + value.deviceName + '】?'}, (action, instance, done) => {
          if (action === 'confirm') {
            done();
            let subData = {deviceKey:this.data.deviceKey};
            type ==='run'?subData.operationCode=value.deviceState?0:1:'';
            this.$load(`正在${des}中...`);
            this.$set(value,'deviceState',3);
            this.$http(url,subData).then(res=>{
              this.$load().close();
              switch (type) {
                case 'reboot':
                  this.$tip("重启成功");
                  break;
                case 'upgrade':
                  this.$tip("正在成功");
                  break;
                case 'reset':
                  this.$tip("重置成功");
                  break;
                case 'run':
                  if (value.deviceState === 1) {
                    this.$tip("设备开启成功")
                  } else {
                    this.$tip('设备已关闭')
                  }
                  break;
                default:
              }
            }).catch(err=>{
              this.$load().close()
            });
          } else {
            done()
          }
        })
      },
      btnState(state, type) {
        //0开机 1 关机 2升级 3重启 4重置
        if(this.data.offline===0){
          switch (state) {
            case 0:
              return false;
            case 1:
              return true;
            case 2:
              if (type === 'upgrade') {
                return true;
              } else {
                return false;
              }
            case 3:
              if (type === 'upgrade') {
                return false
              } else {
                return true;
              }
            default:
              return false;
          }
        }else {
          return true
        }

      },
      // 删除设备
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
        })
      },
      // 修改设备昵称
      changeEquipmentName(formName, index) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http("/merchant/device/alias", this.equipmentForm).then(res => {
              this.$tip("修改成功");
              this.$set(this.data, 'popover', false);
              this.data.deviceName = this.equipmentForm.deviceName;
            })
          } else {
            console.log('error submit')
          }
        });

      },
      showPopover(){
        this.$set(this.data,'popover',true);
      }
    },
    computed: {
      propList: function () {
        const arr = this.prop.split(",");
        return arr[0] ? arr : []
      },
      labelList: function () {
        const arr = this.label.split(",");
        return arr[0] ? arr : []
      }
    },
    watch:{
      filter:function (val) {
        this.format = val
      }
    },
    filters:{
      time:function (val) {
        return parseTime(val,'{y}/{m}/{d} {h}:{i}')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '@/styles/variables.scss';
  .ob-list-sub-item {
    &:first-child{
      .ellipsis{
        width:48px;
      }
    }
    [class^=el-icon]{
      font-size: 16px;
    }
    .el-icon-question{
      /*background: #333;*/
      color: #515055;
    }
    &:last-child{
      >.btn-item+.btn-item{
        margin-left: 30px;
      }
      >div{
        display: inline-block;
        vertical-align: middle;
      }
    }
    .btn-wrap {
      display: inline-block;
      width: 80px;
      vertical-align: middle;
      .el-button {
        height: 28px;
        margin-left: 0 !important;
        margin-bottom: 4px;
        &:last-child {
          margin-bottom: 0;
        }
        &[disabled] {
          background: #515055;
        }
      }
    }
    .el-button {
      &.is-circle {
        width: 16px;
        height: 16px;
        padding: 0;
        border: none;
        background: transparent !important;
        color: $orange;
        vertical-align: middle;
        font-size: 16px;
        &[disabled]{
          color: $disable;
        }
      }
    }
    p {
      text-align: left;
      line-height: 1.5;
      margin-bottom: 12px;
      span {
        vertical-align: middle;
        &.ellipsis {
          width: 106px;
        }
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
    > a {
      display: inline-block;
      vertical-align: middle;
    }
    .uu-icon {
      vertical-align: middle;
    }
  }
</style>
