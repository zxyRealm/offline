<template>
  <div>
    <api-data :data="flowData"></api-data>
  </div>
</template>

<script>
import ApiData from '@/components/developer/ApiData'
export default {
  name: 'api-code',
  components: {
    ApiData
  },
  data () {
    return {
      flowData: [
        {title: '描述', info: '根据社群ID获取当前社群的客流数据。'},
        {title: '调用URL：', info: 'http://insight.uni-ubi.com/api/visual/group/flow/{groupGuid}/{startTime}/{endTime}', hrefSwitch: true},
        {title: '请求方式：', info: 'GET'},
        {
          title: '请求数据：',
          type: 'table',
          info: [
            {
              title: 'Header域名：',
              tableTitle: [
                {prop: 'names', label: '字段', width: '100'},
                {prop: 'msg', label: '描述', width: '200'},
                {prop: 'typeS', label: '类型', width: '100'},
                {prop: 'required', label: '可空', width: '100'},
                {prop: 'infoS', label: '说明'}
              ],
              tableData: [
                {msg: '校验token', names: 'token', required: 'N', typeS: 'String', infoS: ''}
              ]
            },
            {
              title: 'Path域名：',
              tableTitle: [
                {prop: 'names', label: '字段', width: '100'},
                {prop: 'msg', label: '描述', width: '200'},
                {prop: 'typeS', label: '类型', width: '100'},
                {prop: 'required', label: '可空', width: '100'},
                {prop: 'infoS', label: '说明'}
              ],
              tableData: [
                {names: 'groupGuid', msg: '社群id', typeS: 'String', required: 'N', infoS: ''},
                {names: 'startTime', msg: '开始时间', typeS: 'String', required: 'N', infoS: '时间格式yyyy-MM-dd HH:mm:ss'},
                {names: 'endTime', msg: '结束时间', typeS: 'String', required: 'N', infoS: '时间格式yyyy-MM-dd HH:mm:ss'}
              ]
            }
          ]
        },
        {
          title: '成功请求返回值示例',
          type: 'code',
          info: [
            {
              code: '{\n' +
              '  "result": 1,\n' +
              '  "code": "OB_SUS-200",\n' +
              '  "msg": "success",\n' +
              '  "data": [\n' +
              '       {\n' +
              '           "id": "5b8a716684638808d2447fd7",                // 主键\n' +
              '           "ufaceId": null,                                 // 人脸ID\n' +
              '           "groupGuid": "6867A6C096844AD4982F19323B6C9574", // 社群ID\n' +
              '           "deviceKey": "YF_V1-G1BJMQ",                     // 设备序列号\n' +
              '           "age": -1,                    // 年龄属性 当字段值为-1时说明未检测到人脸年龄属性未知\n' +
              '           "gender": -1,            // 性别属性 0女，1男 当字段值为-1时说明未检测到人脸性别属性未知\n' +
              '           "isFirst": 0,            // 是否第一次到店 0否  1是\n' +
              '           "createTime": "2018-09-01T11:00:54.235+0000"      // 日期为UnixTime\n' +
              '       }\n' +
              '   ],\n' +
              '   "success": true\n' +
              '}'
            }
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
