<template>
  <div>
    <api-data :data="ruleData"></api-data>
  </div>
</template>

<script>
import ApiData from '@/components/developer/ApiData'
export default {
  name: 'rule',
  components: {
    ApiData
  },
  data () {
    return {
      ruleData: [
        {
          title: 'API通用规则',
          type: 'list',
          info: [
            {title: 'API调用——原理', content: 'API是HTTP API,常用的编程语言都能发起HTTP请求（通过第三方库或自带API），使用者向我们的服务器发起HTTP请求，并加上合适的参数，服务器将会对请求进行处理，得到结果将会返回给使用者。'},
            {title: 'API调用——鉴权', content: '帐号下每创建一个应用就会生成一组对应的 api_key 和 api_secret，用以识别用户是否有权限调用 API，所有的API调用必须提供对应的一组 api_key 和 api_secret 参数。'},
            {title: 'API调用——参数', content: '调用每个API需要根据需求传不同的参数，每个API参数的详细定义请查看 人脸识别 。所有 API 的调用都要使用 POST 请求，用户可以以 Query String 的形式将参数写进请求体中，传图片文件参数时则需要在请求体中使用 multipart/form-data 格式来编码。'},
            {title: 'API调用——提示', content: '为了避免因网络问题而造成的阻塞，建议将 API 调用放进异步线程里执行。'}
          ]
        }
      ]
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
  },
  watch: {}
}
</script>

<style scoped>

</style>
