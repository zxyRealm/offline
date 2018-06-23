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
            let div = document.createElement("div");
            div.classList.add('shadow-detail-div');
            div.id = "lwh-shadow-detail"
            
            let content = document.createElement("div");
            content.classList.add("shadow-detail-content");

            let img = document.createElement("img");
            img.classList.add("detail-content-img");
            img.src = "data:image/jpg;base64,"+this.detailInfo.img;
            content.appendChild(img);

            let detail = document.createElement("div");
            detail.classList.add("detail-content-div");
            content.appendChild(detail);
            this.detailInfo.status==0 ?this.inSpan(detail):this.outSpan(detail);

            let cancle =  document.createElement("img");
            cancle.classList.add("detail-content-cancel");
            cancle.src = "/static/img/cancel-img.png";
            cancle.onclick = () => {
                document.body.removeChild(div);
            }

            div.appendChild(content);
             div.appendChild(cancle);
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
        .shadow-detail-content {
            position: relative;
            left: 350px;
            top: 80px;
            background: rgba(16,156,231,0.5);
            height: calc(100% - 204px);
            width: calc(100% - 700px);
            padding: 40px;
            box-sizing: border-box;
            .detail-content-img {
                display: inline-block;
                width: 56%;
                height: calc(100%);
                vertical-align: middle;
            }
            .detail-content-div {
                display: inline-block;
                width: 27%;
                text-align: center;
                color: #ffffff;
                margin-left: 10%;
                span {
                    border-bottom: 2px dashed #ffffff;
                    padding: 12px 0;
                    width: 100%;
                    display: inline-block;
                }
            }
        }
        .detail-content-cancel {
                 position: absolute;
                 bottom: 80px;
                display: inline-block;
                width: 32px;
                left: calc(50% - 16px);
        }
     }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    .customer-info-wrap {
        width: 100%;
        height: 100%;
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
                left: calc(50% - 28px);
                opacity: 0.6;
                background: #6D2EBB;
                padding: 0 4px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                max-width: 54px;
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
