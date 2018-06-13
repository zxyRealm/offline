<template>
    <div class="screening-wrap">
      <div>筛选</div>
      <el-form  :model="params" ref="params" class="demo-ruleForm" label-width="90px" :class="type!=0?'normal-from':'' ">
        <el-form-item label="选择对象：" prop="selectObj">
          <select>
            <option value ="volvo">Volvo</option>
          </select>
        </el-form-item>
       <el-form-item label="维度：" prop="dimension" auto-complete="off">
         <template v-for="(ele,index ) in dimensionData">
           <button  @click="handleButton()" :key="index" class="dimension-button">{{ele}}</button>
         </template>
        </el-form-item>
        <el-form-item label="时间："  prop="startTime" auto-complete="off">
          <el-date-picker type="date" :model="params.startTime" placeholder="选择日期" class="picker-data">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="affirm" @click="submitForm()">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "index",
        props: ['type'],
        data() {
          return {
            buttonIndex: 0,
            dimensionData: ['小时','日','周','月'],
             params: {
               groupGuid: '',
               type: '',         //类型
               selectObj: '',    //选择对象
               dimension: '',    //维度
               startTime: '',    //开始时间
               endTime:''        //结束时间
             }
          }
        },
      methods: {
        handleButton(value) {
          this.params.dimension = value;
        },
        submitForm() {

        }
      }
    }
</script>

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
      .picker-data  {
        input.el-input__inner {
            height: 28px ;
            line-height: 28px;
        }
      }
      select {
        width: 210px;
        height: 28px;
        border-radius: 3px;
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
        box-shadow: 0 2px 4px 0 rgba(22,20,24,0.50);
      }
    }
    .normal-from {
         padding: 14px !important;
   }
  }
</style>
