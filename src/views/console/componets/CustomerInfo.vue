<template>
    <div class="customer-info-wrap" :class="detailInfo.status==0?'customer-info-wrap-in':'customer-info-wrap-out'" @click="handleDetail">
       <img :src="detailInfo.img | imgBase">
        <span class="order" :class="detailInfo.status==0?'':'order-in'">{{`第${detailInfo.order}位`}}</span>
        <div class="customer-detail" :class="detailInfo.status==0?'customer-detail-in':''">
            <span v-if="detailInfo.status==0">{{detailInfo.gender==0?'女':(detailInfo.gender==1?'男':'')}}</span>
            <span v-if="detailInfo.status==0">{{detailInfo.age ==-1?"":detailInfo.age}}</span>
            <span>{{this.daytime(detailInfo.time)}}</span>
            <span>{{this.time(detailInfo.time)}}</span>
        </div>
    </div>
</template>
<script>
export default {
    props: ['index','detailInfo'],
    data() {
        return {
            data: []   //数据
        }
    },
    filters: {
        //日
        daytime(date) {
            date = new Date(date);
            let m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            return m + '/' + d;
        },
        //时分
        time(date) {
            date = new Date(date);
            let h = date.getHours();
            h=h < 10 ? ('0' + h) : h;
            let minute = date.getMinutes();
            minute = minute < 10 ? ('0' + minute) : minute;
            return  h+':'+minute;
        },
        imgBase(data) {
            return `data:image/jpg;base64,${data}`
        }
    },
    methods: {
        daytime(date) {
            date = new Date(date);
            let m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            return m + '/' + d;
        },
        //时分
        time(date) {
            date = new Date(date);
            let h = date.getHours();
            h=h < 10 ? ('0' + h) : h;
            let minute = date.getMinutes();
            minute = minute < 10 ? ('0' + minute) : minute;
            return  h+':'+minute;
        },
        //进客信息
        inSpan(parent) {
            let sex = this.detailInfo.gender==0?'女':(this.detailInfo.gender==1?'男':'');
            let params = {
                head: `第${this.detailInfo.order}位访客`,
                gender: sex,
                age: this.detailInfo.age ==-1?"":this.detailInfo.age,
                day: this.daytime(this.detailInfo.time),
                time: this.time(this.detailInfo.time)
            };
            for(let ele in params){
                 let span = document.createElement("span");
                 span.innerHTML = params[ele];
                 parent.appendChild(span);
            }
        },
        outSpan(parent) {
            let params = {
                head: `第${this.detailInfo.order}位出客`,
                day: this.daytime(this.detailInfo.time),
                time: this.time(this.detailInfo.time)
            };
            for(let ele in params){
                 let span = document.createElement("span");
                 span.innerHTML = params[ele];
                 parent.appendChild(span);
            }
        },
        handleDetail() {
            //主页面
            let div = document.createElement("div");
            div.classList.add('shadow-detail-div');
            div.id = "lwh-shadow-detail"
            //主内容区
            let content = document.createElement("div");
            content.classList.add("shadow-detail-content");
            //主内容区图片父
            let imgPartent = document.createElement("div");
            imgPartent.classList.add("detail-img-div");
            content.appendChild(imgPartent);
            //四个小图标
            let topDiv = document.createElement("div");
            this.detailInfo.status==0 ? topDiv.classList.add("detail-img-topDiv-in","icon-lwh-common-in"):topDiv.classList.add("detail-img-topDiv","icon-lwh-common");
            imgPartent.appendChild(topDiv);
            let rightDiv = document.createElement("div");
            this.detailInfo.status==0 ? rightDiv.classList.add("detail-img-rightDiv-in","icon-lwh-common-in"):rightDiv.classList.add("detail-img-rightDiv","icon-lwh-common");
            imgPartent.appendChild(rightDiv);
             let bottomDiv = document.createElement("div");
            this.detailInfo.status==0 ? bottomDiv.classList.add("detail-img-bottomDiv-in","icon-lwh-common-in"):bottomDiv.classList.add("detail-img-bottomDiv","icon-lwh-common");
            imgPartent.appendChild(bottomDiv);
             let leftDiv = document.createElement("div");
             this.detailInfo.status==0 ? leftDiv.classList.add("detail-img-leftDiv-in","icon-lwh-common-in") : leftDiv.classList.add("detail-img-leftDiv","icon-lwh-common");
            imgPartent.appendChild(leftDiv);

            //主内容区图片
            let img = document.createElement("img");
          this.detailInfo.status==0 ? img.classList.add("detail-content-img-in"):img.classList.add("detail-content-img");
            img.src = "data:image/jpg;base64,"+this.detailInfo.img;
            imgPartent.appendChild(img);
            //主内容区详情
            let detail = document.createElement("div");
            detail.classList.add("detail-content-div");
            imgPartent.appendChild(detail);
            this.detailInfo.status==0 ?this.inSpan(detail):this.outSpan(detail);
            //取消按钮
            let canclePrent = document.createElement("div");
            canclePrent.classList.add("detail-cancle-div");
            let cancle =  document.createElement("img");
            cancle.classList.add("detail-content-cancel");
            cancle.src = "/static/img/cancel-img.png";
            cancle.onclick = () => {
                document.body.removeChild(div);
            }
            canclePrent.appendChild(cancle);
            content.appendChild(canclePrent);

            div.appendChild(content);
            document.body.appendChild(div);
        }

    },
    mounted() {
    },
    watch: {

    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
     /* 遮罩层div */
    #lwh-shadow-detail.shadow-detail-div {
        min-width: 1280px;
        min-height: 720px;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999999;
        background: rgba(0,0,0,0.8);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .shadow-detail-content {
            .detail-img-div {
                   position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: rgba(16,156,231,0.2);
                    //background: url(/static/img/background-image.png) no-repeat;
                    //background-size: 100% 100%;
                    padding: 40px;
                    .detail-content-img {
                        /*width: 250px;*/
                        height: 420px;
                        border: 2px solid #109CE7;
                    }
                    .detail-content-img-in {
                        height: 420px;
                        border: 2px solid #6D2EBB;
                    }
                    .detail-content-div {
                        display: flex;
                        flex-direction: column;
                        padding: 0 30px;
                        text-align: center;
                        span {
                            color: #ffffff;
                            border-bottom: 1px dashed #ffffff;
                            padding: 12px 12px;
                            width: 100%;
                            display: inline-block;
                        }
                    }
                    .icon-lwh-common {
                        background-image: url(/static/img/console-detail-border-icon-top.png);
                        position: absolute;
                        height: 40px;
                        width: 57px;
                        background-repeat: no-repeat;
                        background-size: contain;
                    }
                    .icon-lwh-common-in {
                      background-image: url(/static/img/console-detail-border-in-icon-top.png);
                      position: absolute;
                      height: 40px;
                      width: 57px;
                      background-repeat: no-repeat;
                      background-size: contain;
                    }
                    .detail-img-topDiv {
                         top: -2px;
                        left: -2px;
                    }
                    .detail-img-topDiv-in {
                      top: -2px;
                      left: -2px;
                    }
                    .detail-img-rightDiv {
                        top: -2px;
                        right: -2px;
                        background-image: url(/static/img/console-detail-border-icon-right.png);
                    }
                    .detail-img-rightDiv-in {
                        top: -2px;
                        right: -2px;
                        background-image: url(/static/img/console-detail-border-in-icon-right.png);
                    }
                    .detail-img-bottomDiv {
                        bottom: -2px;
                        right: -2px;
                        background-image: url(/static/img/console-detail-border-icon-bottom.png);
                    }
                    .detail-img-bottomDiv-in {
                      bottom: -2px;
                      right: -2px;
                      background-image: url(/static/img/console-detail-border-in-icon-bottom.png);
                    }
                    .detail-img-leftDiv {
                        bottom: -2px;
                        left: -2px;
                        background-image: url(/static/img/console-detail-border-icon-left.png);
                    }
                    .detail-img-leftDiv-in {
                      bottom: -2px;
                      left: -2px;
                      background-image: url(/static/img/console-detail-in-border-left.png);
                    }
            }
            .detail-cancle-div {
                display: flex;
                justify-content: center;
                align-items: center;
                .detail-content-cancel {
                    width: 32px;
                    margin-top: 10px;
                }
            }

        }

     }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    .customer-info-wrap-in {
        background: url(/static/img/background-img-in.png) no-repeat center;
        background-size: 100% 100%;
    }
    .customer-info-wrap-out {
        background: url(/static/img/background-image.png) no-repeat center;
        background-size: 100% 100%;
    }
    .customer-info-wrap {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
                display: block;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                padding: 20px 12px;
            }
            span.order {
                position: absolute;
                top: -6px;
                // left: calc(50% - 28px);
               // opacity: 0.6;
                background: rgba(109,46,187,0.3);
                padding: 0 4px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                // max-width: 54px;
                //width: 60%;
                width: 54%;
                text-align: center;
            }
            span.order-in {
                background: rgba(16,156,231,0.3);
            }
            .customer-detail {
                position: absolute;
                bottom: 20px;
                right: 12px;
                font-size: 12px;
                span {
                    text-align: center;
                    line-height: 16px;
                    display: block;
                    width: 46px;
                    height: 16px;
                    margin-bottom: 4px;
                    opacity: 0.4;
                    background: #000000;
                }
            }
      .customer-detail-in {
        right: 22px;
      }
    }

</style>
