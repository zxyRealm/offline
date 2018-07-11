<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <div class="transition-wrap fl">
      <transition-group name="list-complete" tag="p">
        <div
          v-for="item in items"
          :key="item"
          class="list-complete-item"
        >
          <div class="item-content">
            {{ item }}
          </div>
        </div>
      </transition-group>
    </div>
    <div class="transition-wrap fr">
      <transition-group :duration="1000" name="list-complete" tag="p">
        <div
          v-for="item in items"
          :key="item"
          class="list-complete-item"
        >
          <div class="item-content">
            {{ item }}
          </div>
        </div>
      </transition-group>
    </div>
    <el-button @click="add">新增</el-button>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        items: [],
        nextNum: 1,
        animation: [1, 2, 3],
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      add: function () {

        // let max = Math.max.call(null,this.items)+1;
        if(this.items.length>=4){
          this.items.splice(this.items.length-1, 1,);
        }
        this.items.unshift(this.nextNum++);
      },
    },
    watch: {
      data: {
        handler(val) {
          console.log('changed list', val)
        },
        deep: true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .hello {
    text-align: center;
  }
  .transition-wrap{
    width: calc(110px * 4);
    overflow: hidden;
    p{
      float: right;
      width: calc(110px * 5);
      overflow: hidden;
      height: 180px;
    }
    .list-complete-item {
      float: right;
      transition: all 1s;
      display: inline-block;
      width: 20%;
      padding-right: 10px;
      height: 180px;
      line-height: 180px;
      box-sizing: border-box;
      .item-content{
        background: #4AB7BD;
        height: 100%;
      }
    }
    /*.list-complete-leave-active{*/
      /*position: absolute;*/
    /*}*/
    &.fr{
      p{
        float: left;
      }
      .list-complete-enter{
        opacity: 0;
        transform: translateX(-100%);
      }
      .list-complete-item{
        float: left;
        &:last-child{
          margin-right: 0;
        }
      }
    }
    &.fl{
      .list-complete-enter{
        opacity: 0;
        transform: translateX(100%);
      }
      .list-complete-item{
        &:first-child{
          margin-right: 0;
        }
      }
    }
  }

  .el-button {
    margin-top: 15px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
