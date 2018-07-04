<template>
  <el-dialog
    :type="type"
    center
    top="auto"
    @close="closeDialog"
    class="dialog-form-wrapper vam lwh"
    width="500px" :title="title" :visible.sync="dialogVisible">
    <el-scrollbar
      :style="customStyle"
    >
    <div class="go-forword" @click="forword">上一步</div>
    <template>
       <div v-if="deviceData.length == 0">该社群下暂时没有设备可以添加</div>
        <el-radio-group v-model="radio">
            <el-radio  v-for="(val,index) in deviceData" :label="index" :key="index">{{val['deviceName']}}</el-radio>
        </el-radio-group>
    </template>
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <el-button class="cancel"  @click="dialogVisible = false">取 消</el-button>
      <el-button class="affirm" type="primary" @click="submitDialogForm()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>

  export default {
   props: {
            title: {
                type: [String],
                default: ''
            },
            type:{
                type:[String],
                default:'device'
            },
            visible: {
                type: Boolean,
                default: false
            },
            groupId: {
                type: String,
                default: false
            }
      },
    data() {
      return {
        radio: -1,      //不给它默认选择的设备
        dialogVisible: false,
        deviceData: []
      }

    },
     watch: {
      visible: function (val) {
          this.dialogVisible = val;
        },
        //监听群id
       groupId(val) {
           this.getDeviceData();
       },
       //子组件通知父组件
       dialogVisible: function (val) {
        this.$emit('update:visible', val)
      },
     },
    methods:{
        //上一步
      forword() {
          this.$emit("pick-device","上一步");
          this.dialogVisible = false;
      },
       //确定
      submitDialogForm(){
        if(this.radio == -1){
            this.$alert('请选择需要添加设备名称', '提示：', {
            confirmButtonText: '确定'
            });
            return;
        }
        if(this.type==='group'){
          this.$emit("pick-device",this.deviceData[this.radio]);
        }
        this.dialogVisible = false;
        this.$store.commit("SET_GROUP_CONSOLEID",this.deviceData[this.radio].deviceKey);
      },
      closeDialog(){
          //console.info("close-device");
      },
      //获取设备数据
      getDeviceData() {
         this.$http('/device/guid/list ',{
                guid: this.groupId
            }).then(res => {
                if(res.result ==1) {
                 this.deviceData =res.data.content;
                 this.radio = -1;
                }
            }).catch(error => {
                console.info(error);
            });
        }

    },
    beforeDestroy(){

    },
    computed:{
      customStyle:function(){
        switch (this.type){
          case 'group':
            return {width:'400px',background:'#f8f8f8',height:'400px'};
          default:
            return {width:this.width};
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
@import "@/styles/form.scss";
.lwh{
    .go-forword {
        margin-top: 20px;
        font-size: 14px;
        color: #0F9EE9;
        top: 10px;
        left: 30px;
        position: absolute;
    }
    .el-radio {
        display: block;
        height: 34px;
    }
    .el-radio+.el-radio {
        margin-left: 0px;
     }
     .el-scrollbar__wrap {
        display: flex;
        justify-content: center;
        align-items: center;
     }
     .el-radio__label {
        font-size: 14px;
        padding-left: 20px;
    }
  &[type=group]{
    .el-dialog__body{
      padding:0 20px 0;
    }
    .el-tree.white{
      background: transparent;
    }
  }
  .el-dialog__header{
    padding: 25px 20px 10px;
    text-align: center;
    .el-dialog__title{
      font-size: 16px;
    }
    .el-dialog__headerbtn{
      top:10px;
      right: 10px;
      font-size: 20px;
    }
  }
  .el-dialog__body{
    padding:20px 20px 0;
  }
  .el-button+.el-button{
    margin-left: 0;
  }
  .dialog-footer{
    text-align: center;
    .el-button{
      margin-right: 50px;
      &:last-child{
        margin-right: 0;
      }
    }
  }

  .el-radio-group{
    .el-radio-button{
      float: left;
      &.is-active{
        .el-radio-button__inner{
          color:#333;
        }
      }
      .el-radio-button__inner{
        border:none;
        padding: 0 4px;
        border-right: 1px solid #ddd;
        font-size:12px;
        color:  #CBCBCB;
      }
      &:focus{
        box-shadow: none;
      }
      &:last-child{
        .el-radio-button__inner{
          border: none;
          padding-right: 0;
        }
      }
    }
  }
}
</style>
