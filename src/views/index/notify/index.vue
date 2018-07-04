<template>
    <div class="home-notify-wrapper">
        <div class="title">系统消息</div>
        <div class="tip" v-if="state">
            <div>暂无消息通知。</div>
        </div>
        <div class="content" v-if="!state">
            <ul>
               <li v-for="(val,index) in notifyData" :key="index" :class="val.readState ==1?'': 'readed'">
                   <span :class="val.readState ==1?'active':''">{{index}}.&nbsp;&nbsp;{{val.content}}</span>
                   <span>{{val.createTime}}</span>
               </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                state: false,
                notifyData: []
            }
        },
        methods: {
            getData() {
                this.$http('/siteNotice/list',{}).then(res => {
                    if(res.result == 1){
                      if(res.data.length > 0) {
                         this.notifyData = res.data
                      }else {
                        this.state = true;
                      }
                    }
                } );
            }
        },
        created() {
             let notifyState = this.$route.params.notifyState;
             this.getData();
//             if(notifyState == "true") {
//                this.getData();
//             }else{
//                this.state = true;
//             }
        }
    }
</script>
<style rel="stylesheet/scss"  lang="scss" scoped>
    .home-notify-wrapper {
        height: 100px;
        min-width: 1020px;
        display: flex;
        flex-direction: column;
        background-color: rgba(0,0,0,0.3);
        .tip {
            flex: auto;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            div {
                width: 720px;
                height: 110px;
                text-align: center;
                line-height: 110px;
                background: rgba(1,8,20,0.10);
                border: 2px dashed rgba(151,151,151,0.30);
                opacity: 0.5;
                font-size: 12px;
                color: #FFFFFF;
          }
       }
       .title {
           font-size: 16px;
           padding: 20px 0 0 20px;
           box-sizing: border-box;
       }
       .content {
           height: 100%;
           padding-top: 6%;
           box-sizing: border-box;
           display: flex;
           justify-content: center;
           ul,li {
               list-style: disc inside url(/static/img/list-icon-green.png);
           }
           ul {
               width: 72%;
               height: 60%;
               padding: 16px;
               overflow-y: auto;
               border: 2px dashed  hsla(0, 0%, 62%, 0.03);
               background: rgba(15,158,233,0.003);
               .readed {
                 opacity: 0.5;
               }
               li {
                    display: flex;
                    justify-content: space-between;
                    padding: 0 0 16px 0;
                    font-size: 14px;
                     span:nth-child(1) {
                         position: relative;
                         left: 20px;
                        width: 60%;
                        display: inline-block;
                        word-wrap: break-word;
                     }
                    /*<!--span:nth-child(1)::before{-->*/
                        /*<!--content: '';-->*/
                        /*<!--border: 4px solid #0F9EE9;-->*/
                        /*<!--border-radius: 50%;-->*/
                        /*<!--position: absolute;-->*/
                        /*<!--top: 4px;-->*/
                        /*<!--left: -20px-->*/
                    /*<!--}-->*/
                   .active::before {
                     content: '';
                     border: 4px solid #0F9EE9;
                     border-radius: 50%;
                     position: absolute;
                     top: 6px;
                     left: -20px
                   }
               }
           }
       }
    }
</style>
