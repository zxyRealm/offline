<template>
  <div class="equipment-list-wrap">
    <uu-sub-tab :menu-array="menu"></uu-sub-tab>
    <uu-sub-tab
      size="medium"
      :show-button="!equipmentEmpty"
      :sub-btn="{text:'创建'}"
      @handle-btn="createEquipment"
      :menu-array="menu2"></uu-sub-tab>
    <div v-if="equipmentEmpty" class="no-data-equipment">
      您还没有设备，点击【添加】进行添加设备。
    </div>
    <div v-else class="data-list-wrap">
      <template v-for="(item,$index) in equipmentList">
        <ob-list>
          <ob-list-item>
            <p>
              <span>设备别名：</span>
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
              <a href="javascript:void (0)" @click="getEquipmentState">
                <i v-if="item.state" class="el-icon-refresh success-color"></i>
                <template v-else>获取</template>
              </a>
            </p>
          </ob-list-item>
          <ob-list-item :data="item" prop="intro,tokenURL" label="通知描述,回调地址"></ob-list-item>
          <ob-list-item router="/developer/notify" text="详情" label="用途："></ob-list-item>
          <ob-list-item type="time" :data="item" prop="createTime,lastEditTime" label="创建时间,上次编辑">
            <p>
              <span>绑定社群：</span>

            </p>
            <p><span></span></p>
            <p><span></span></p>
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
  </div>
</template>

<script>
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
        }
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
      createEquipment(){
        this.$affirm({
          title:'添加设备',
          confirm: '删除',
          cancel: '取消',
          text: '确定将设备【】删除？'
        }, (action, instance, done) => {
          if (action === 'confirm') {
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
      deleteEquipment(item) {
        this.$affirm({
          confirm: '删除',
          cancel: '取消',
          text: '确定将设备【' + item.name + '】删除？'
        }, (action, instance, done) => {
          if (action === 'confirm') {
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
      // 获取设备状态
      getEquipmentState() {
        console.log("equipment state")
      }

    }
  }
</script>

<style scoped>
.data-list-wrap{
  margin-top: 24px;
}
</style>
