<template>
  <div class="equipment-list-wrap">
    <uu-sub-tab :menu-array="menu"></uu-sub-tab>
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
              <span class="ellipsis" v-if="item.name">{{item.name}}</span>
              <el-popover
                placement="top"
                v-model="item.popover"
                trigger="click">
                <el-form
                  ref="tableForm"
                  class="table-form"
                  v-model="equipmentForm"
                  :rules="rules">
                  <el-form-item>
                    <el-input type="text" v-model="equipmentForm.name"></el-input>
                    <uu-icon type="success" @click.native="submitForm('tableForm',$index)"></uu-icon>
                    <uu-icon type="error" @click.native="cancelPopover($index)"></uu-icon>
                  </el-form-item>
                </el-form>
                <a href="javascript:void (0)" slot="reference">BOX</a>
              </el-popover>
            </p>
            <p>
              <span>运行状态：</span>
              <span class="error-color">离线</span>
              <a href="javascript:void (0)" @click="getEquipmentState(item)">
                <i v-if="item.state" class="el-icon-refresh success-color"></i>
                <template v-else>获取</template>
              </a>
            </p>
          </ob-list-item>
          <ob-list-item :data="item" prop="intro,tokenURL" label="通知描述,回调地址"></ob-list-item>
          <ob-list-item router="/developer/notify" text="详情" label="用途："></ob-list-item>
          <ob-list-item>
            <p v-if="!item.community">
              <span>绑定社群：</span>
              <a href="javascript:void (0)" @click="showDialog('community')">未绑定</a>
            </p>
            <template v-else>
              <p>
                <span>绑定社群：</span>
                <span>辛巴克 </span>
                <uu-icon type="relieve" @click.native="unBindCommunity"></uu-icon>
              </p>
              <p><span>绑定时间：</span><span>{{item.createTime | parseTime('{y}/{m}/{d} {h}:{i}')}}</span></p>
              <p><span>应用场景：</span></p>
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
              <el-button class="medium close">关机</el-button>
              <el-button class="medium reboot">重启</el-button>
              <el-button class="medium upgrading">升级</el-button>
              <el-button class="medium reset">重置</el-button>
            </div>
            <el-button icon="el-icon-delete" @click="deleteEquipment(item.noticeGuid)" circle></el-button>
          </ob-list-item>
        </ob-list>
      </template>
    </div>
    <ob-dialog-form
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
          if (value.length <= 18) {
            callback()
          } else {
            callback("设备别名不超过18个字符")
          }
        }
      };
      return {
        dialogOptions:{
          type:'device',
          title:'添加设备'
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
        equipmentForm: {
          name: ''
        },
        rules: {
          name: [
            {required: true, validator: validateName, trigger: "blur"},
            {type: 'string', max: 18, message: '长度不可超过18个字符', trigger: 'change'}
          ]
        },
        dialogFormVisible:false
      }
    },
    methods: {
      submitForm(formName, index) {
        this.$refs[formName][index].validate((valid) => {
          if (valid) {
            console.log(this.equipmentForm)
          }
        })
      },
      // 关闭popover表单
      cancelPopover(index) {
        this.$set(this.equipmentList[index], 'popover', !this.equipmentList[index].popover)
      },
      showDialog(type){
        this.dialogOptions.type = type || 'device';
        this.dialogOptions.title = type==='device'?'添加设备':'添加社群';
        if(type==='community'){
          this.$http("/group/list").then(res=>{
            if(res.data.length){
              this.dialogFormVisible = true;
            }else{
              this.$affirm({
                text: '没有可绑定的社群，前往<a href="/community/create">创建社群</a>。'
              },(action, instance, done) => {
                if (action === 'confirm') {
                  done();
                } else {
                  done()
                }
              },'create')
            }
          });
        }else {
          this.dialogFormVisible = true
        }
      },
      // 获取自有设备
      getMineEquipment(page){
        page = page ||1;
        this.$http("/device/list",{index:page,length:10}).then(res=>{
          console.log(res)
        })
      },
      createEquipment(type) {
        // this.$affirm({
        //   title: '添加设备',
        //   confirm: '删除',
        //   cancel: '取消',
        //   text: '确定将设备【】删除？'
        // }, (action, instance, done) => {
        //   if (action === 'confirm') {
        //     // this.$http("/dataNotice/discard", {noticeGuid: id}).then(res => {
        //     //   if (res.result) {
        //     //     this.$tip("删除成功");
        //     //     this.getNotifyList(this.pagination.index)
        //     //   }
        //     // });
        //     done();
        //   } else {
        //     done()
        //   }
        // })
      },
      deleteEquipment(item) {
        this.$affirm({
          confirm: '删除',
          cancel: '取消',
          text: '确定将设备【' + item.name + '】删除？'
        },(action, instance, done) => {
          if (action === 'confirm') {
            done();
          } else {
            done()
          }
        },'waiting')
      },
      // 获取设备状态
      getEquipmentState(value) {
        // this.http("")
        console.log("equipment state")
      },
      //解 绑社群
      unBindCommunity(value) {
        this.$affirm({
          confirm: '确定',
          cancel: '返回',
          text: '将设备从社群解绑，您将无法查看该设备数据/无法操作设备。确定要将【' + value + '】设备从【' + value + '】社群解绑？'
        }, (action, instance, done) => {
          if (action === 'confirm') {
            this.$tip("解绑成功");
            // this.$http("/dataNotice/discard", {noticeGuid: id}).then(res => {
            //   if (res.result) {
            //     this.$tip("删除成功");
            //     this.getNotifyList(this.pagination.index)
            //   }
            // });
            done();
          } else {
            done()
          }
        })
      },
      // 绑定社群
      getCommunityGroup(){
        this.$http("/group/list").then(res=>{
          if(res.data.length){

          }
        })
      },
      bindCommunity(value) {
        console.log(this.dialogFormVisible);
        this.dialogFormVisible = true;
      }

    },
    created(){
      this.getMineEquipment()
    }
  }
</script>

<style scoped>
  .data-list-wrap {
    margin-top: 24px;
  }
</style>
