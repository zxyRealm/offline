<template>
    <div class="customer-info-wrap" @click="handleDetail">
       <img :src="detailInfo.img | imgBase">
        <span class="order">{{`第${detailInfo.order}位`}}</span>
        <div class="customer-detail">
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
            topDiv.classList.add("detail-img-topDiv","icon-lwh-common");
            imgPartent.appendChild(topDiv);
            let rightDiv = document.createElement("div");
            rightDiv.classList.add("detail-img-rightDiv","icon-lwh-common");
            imgPartent.appendChild(rightDiv);
             let bottomDiv = document.createElement("div");
            bottomDiv.classList.add("detail-img-bottomDiv","icon-lwh-common");
            imgPartent.appendChild(bottomDiv);
             let leftDiv = document.createElement("div");
            leftDiv.classList.add("detail-img-leftDiv","icon-lwh-common");
            imgPartent.appendChild(leftDiv);
             
            //主内容区图片
            let img = document.createElement("img");
            img.classList.add("detail-content-img");
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
                        width: 250px;
                        border: 2px solid #109CE7;
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
                    .detail-img-topDiv {
                         top: -2px;
                        left: -2px;
                    }
                    .detail-img-rightDiv {
                        top: -2px;
                        right: -2px;
                        background-image: url(/static/img/console-detail-border-icon-right.png);
                    }
                    .detail-img-bottomDiv {
                        bottom: -2px;
                        right: -2px;
                        background-image: url(/static/img/console-detail-border-icon-bottom.png);
                    }
                    .detail-img-leftDiv {
                        bottom: -2px;
                        left: -2px;
                        background-image: url(/static/img/console-detail-border-icon-left.png);
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
                opacity: 0.6;
                background: #6D2EBB;
                padding: 0 4px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                // max-width: 54px;
                width: 60%;
                text-align: center;
            }
            div.customer-detail {
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
    }
    
</style>
