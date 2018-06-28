<template>
    <div class="screening-wrap">
      <div>筛选</div>
      <el-form  v-model="filterParams" ref="params" class="demo-ruleForm" label-width="90px" :class="type!=1?'normal-from':'' ">
        <el-form-item label="选择对象：" prop="selectObj">
          <input class="group-name-input" type="text" v-model="groupGuidName" @click="groupGuidNameClick"/>
            <!-- <option value ="volvo">Volvo</option> -->
        </el-form-item>
       <el-form-item label="维度：" prop="dimension" auto-complete="off">
         <template v-for="(ele,index ) in dimensionData">
           <button class="dimension-button" @click="handleButton(index)" :key="index" :class="buttonIndex== index?'active':''">{{ele}}</button>
         </template>
        </el-form-item>
        <el-form-item label="时间："  prop="startTime" auto-complete="off">
          <el-date-picker v-if="dimensionIdex == 0" 
          type="date" 
           v-model="filterParams.startTime"
           placeholder="选择日期"
           value-format = "yyyy-MM-dd" 
           class="picker-data"
          >
          </el-date-picker> 
          <el-date-picker v-else
            v-model="filterParams.startTime"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format = "yyyy-MM-dd"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="affirm" @click="submitForm()">提交</el-button>
        </el-form-item>
      </el-form>
      <!-- 选择社群 -->
     <ob-dialog-form
      @remote-submit="remoteSubmit"
      :type="dialogOptions.type"
      :title="dialogOptions.title"
      :visible.sync="dialogFormVisible">
    </ob-dialog-form>
    </div>
</template>

<script>
    import { mapGetters,mapMutations} from 'vuex'
    export default {
        name: "screening-index",
        props: ['type'],
        data() {
          return {
            groupGuidName: '请选择对象',
            dialogFormVisible: false,
            dialogOptions: {
              title: '添加社群',
              type: 'group'
            },
            buttonIndex: 0,
            dimensionIdex: 0,
            dimensionData: ['小时','日','周','月'],
            filterParams: {
              groupGuid: '',     //选择社群 6867A6C096844AD4982F19323B6C9574 
              type: '',         //类型
              dimension: '',    //维度
              startTime: '',    //开始时间
              endTime:''        //结束时间
            }
          }
        },
      methods: {
        //选择对象
        groupGuidNameClick() {
            this.dialogFormVisible = true;
        },
        remoteSubmit(data) {
          if(!data) {
             this.$alert('请选择设备', '提示:', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
            return;
          }
          this.dialogFormVisible = false;
          this.groupGuidName = data[0].groupNickName;
          this.filterParams.groupGuid = data[0].groupGuid;
        },
        //点击维度
        handleButton(value) {
          this.buttonIndex = value;
          this.dimensionIdex = value;
          this.filterParams.dimension = value+1;
        },
        //处理时间
        dealTime() {
          if(this.filterParams.startTime.constructor == Array){
            let tempDate = this.filterParams.startTime;
            this.filterParams.startTime = tempDate[0];
            this.filterParams.endTime = tempDate[1];
          }else {
            this.filterParams.endTime = this.filterParams.startTime;
          }
        },
        //vuex状态管理数据
        changeParams() {
          this.$store.commit("SET_FILTER_PARAMS",this.filterParams);
          //这这里触发兄弟组件更新条件
          console.info(this.$parent.$children);
          this.$parent.$children[1].getData();
          this.$parent.$children[2].getData();
        },
        //查询
        submitForm() {
          if(this.filterParams.groupGuid == "") {
             this.$alert('请选择设备', '提示:', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
            return;
          }
          this.dealTime();
          this.changeParams();
        }
      },
      created() {
          //默认值处理
          this.filterParams.startTime = this.$getNowFormatDate();
          this.filterParams.endTime = this.$getNowFormatDate();
          this.filterParams.type = this.type;
          this.filterParams.dimension = 1;
          this.$store.commit("SET_FILTER_PARAMS",this.filterParams);
      },
      computed: {
      }
    }
</script>
<style  rel="stylesheet/scss" lang="scss">
     .demo-ruleForm {
       .el-form-item__label {
        color: #ffffff;
      }
      .el-range__icon,.el-input__icon {
        display: none;
      }
      .el-range-separator {
        line-height: 20px;
      }
      .el-range-editor--small.el-input__inner  {
        height: 28px ;
            line-height: 28px;
      }
       .picker-data  {
        input.el-input__inner {
            height: 28px ;
            line-height: 28px;
        }
      }
     }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .screening-wrap {
      height: 100%;
      box-sizing: border-box;
      padding: 20px;
    .demo-ruleForm {
      box-sizing: border-box;
      padding: 40px 14px;
      .el-form-item--small.el-form-item {
        margin-bottom: 10px;
      }
      .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 210px;
      }
      .picker-data {
        .el-input--small .el-input__inner {
            height: 28px;
            line-height: 28px;
        }
      }
      .group-name-input {
        width: 210px;
        height: 22px!important;
        line-height: 28px;
        border-radius: 3px;
        text-indent: 10px;
      }
      input.group-name-input::after {
        content: "";
        width: 0px;
        height: 0px;
        border-right: 8px solid transparent;
        border-left: 8px solid transparent;
        border-top: 8px solid #ffffff;
        top: 14px;
        left: 10px;
        position: relative;
      }
      .dimension-button {
        width: 48px;
        height: 28px;
        background: transparent;
        border: 1px solid #ffffff;
        color: #ffffff;
        border-radius: 3px;
        font-size: 12px;
        margin-right: 6px;
      }
      .active {
        color: #2187DF;
        border: 1px solid #2187DF;
        box-shadow: 0 2px 4px 0 rgba(22,20,24,0.50);
      }
    }
    .normal-from {
         padding: 14px !important;
   }
  }
</style>
