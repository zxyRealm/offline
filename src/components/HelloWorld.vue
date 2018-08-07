<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>

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
    <el-form
      :model="formData"
      :rules="rules"
    >
      <el-form-item prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'HelloWorld',
    components: {},
    data () {
      const validateName = (rule, value, callback) => {
        console.log(rule,value, value.length);
        callback()
      };
      return {
        formData: {
          name: ''
        },
        rules: {
          name: [
            {validator: validateName, trigger: 'change'}
          ]
        },
        items: [],
        nextNum: 1,
        animation: [1, 2, 3],
        msg: 'Welcome to Your Vue.js App',
        empty: {}
      }
    },
    methods: {
      add: function () {
        // let max = Math.max.call(null,this.items)+1;
        if (this.items.length >= 4) {
          this.items.splice(this.items.length - 1, 1,);
        }
        this.items.unshift(this.nextNum++);
        this.$set(this.empty, 'name', `${this.nextNum}测试开始`);
        // this.empty.name = `${this.nextNum}测试开始`;
        console.log(this.empty)
      },
    },
    watch: {
      data: {
        handler (val) {
          console.log('changed list', val)
        },
        deep: true
      },
      empty: {
        handler (val) {
          console.log('change', val)
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

  .transition-wrap {
    width: calc(110px * 4);
    overflow: hidden;
    p {
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
      .item-content {
        background: #4AB7BD;
        height: 100%;
      }
    }
    /*.list-complete-leave-active{*/
    /*position: absolute;*/
    /*}*/
    &.fr {
      p {
        float: left;
      }
      .list-complete-enter {
        opacity: 0;
        transform: translateX(-100%);
      }
      .list-complete-item {
        float: left;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    &.fl {
      .list-complete-enter {
        opacity: 0;
        transform: translateX(100%);
      }
      .list-complete-item {
        &:first-child {
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
