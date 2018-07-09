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
    <ul class="animation">
      <li v-for="item in animation" :key="item" class="animation-item">
        {{item}}
      </li>
    </ul>
    <el-button @click="addItem">新增</el-button>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        animation:[],
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      addItem() {
        this.animation.push(this.animation.length + 1)
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
  .hello{
    text-align: center;
  }
  .animation {
    height: 180px;
    .animation-item {
      width: 100px;
      text-align: center;
      line-height: 180px;
      border: 1px solid #ddd;
    }

  }
  .el-button{
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
