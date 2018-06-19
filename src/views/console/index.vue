<template>
  <div class="console-wrap">
      <div class="content-top">
            <div class="content-top-left">
                <ul class="left-ul">
                    <li>
                        <p>客流汇总信息</p>
                        <flow-info :type="'left'"  class="flow-left"></flow-info>
                        <flow-info :type="'right'" class="flow-right"></flow-info>
                    </li>
                    <li>
                        <all-time></all-time>
                    </li>
                </ul>
                <div class="left-div">

                </div>
            </div>
            <div class="content-top-right">
                <ul class="bottom-ul">
                    <li> 

                    </li>
                    <li>
                    
                     </li>
                </ul>
            </div>
      </div>
      <div class="content-bottom">
            
      </div>
  </div>
</template>
<script>
  import FlowInfo from './componets/FlowInfo.vue'
  import AllTime from './componets/AllTime.vue'
  export default {
      name: "console",
      components: {FlowInfo,AllTime},
      data() {
        return {
           consoleData: []  //控制台数据
        }
      },
      mounted() {

      },
      methods: {

      }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
   .console-wrap { 
       background: black;
       box-sizing: border-box;
       height: 100%;
       min-width: 1240px;
       .content-top {
          height: 72%;
          .content-top-left,.content-top-right {
            float: left;
          }
          .content-top-left {
            height: 100%;
            width: 60%;
            box-sizing: border-box;
            .left-ul {
                height: 31%;
                li {
                     float: left;
                } 
                li:nth-child(1) {
                     width: 60%;
                     height: 100%;
                     box-sizing: border-box;
                     padding: 20px;
                     border: 1px solid red;
                     .flow-info-wrap {
                        margin-top: 6%;
                     }
                     .flow-left {
                        margin-left: 40px;
                     }
                     .flow-right {
                         float: right;
                     }
                }
                li:nth-child(2) {
                    margin-left: 10px;
                     width: calc(40% - 10px);
                     height: 100%;
                     border: 1px solid red;
                     box-sizing: border-box;
                }
            }
            .left-div {
                margin-top: 10px;
                height: calc(69% - 10px);
                border: 1px solid red;
                box-sizing: border-box;
                
            }
          }
          .content-top-right {
            height: 100%;
            margin-left: 10px;
            width: calc(40% - 10px);
            box-sizing: border-box;
            .bottom-ul {
                height: 100%;
                 li:nth-child(1) {
                     height: 44%;
                     border: 1px solid red;
                }
                li:nth-child(2) {
                     margin-top: 10px;
                     height: calc(56% - 10px);
                     border: 1px solid red;
                     box-sizing: border-box;
                }
            }
          }
       }
       .content-bottom {
          width: 100%;
          margin-top: 10px;
          height: calc(28% - 10px);
          border: 1px solid green;
       }
   }
</style>
