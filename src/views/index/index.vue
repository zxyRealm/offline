<template>
  <div class="app-wrapper" :class="classObj">
   
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  created(){
    this.$store.dispatch('GET_USER_INFO');
  },
  mounted(){
    console.log(this.$store.state)
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    checkFirst(){
      this.$http("/merchant/usercenter").then(res=>{
        if(!res.data){
          this.$router.push("/developer/info/edit")
        }
      }).catch(error=>{
        console.log('error',error)
      })
    },
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 
</style>
