<template>
    <div>
    </div>
</template>

<script>
import { GetCode } from '../../api/account'

export default {
  name: 'login',
  data () {
    return {}
  },
  created () {
  },
  mounted () {
    GetCode({phoneNumber: '13112345678'}).then((res) => {
      console.log('mock data', res)
    })
  },
  computed: {},
  methods: {},
  watch: {}
}
</script>

<style scoped>

</style>
