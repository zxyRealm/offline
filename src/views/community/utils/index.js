import { validateRule } from '@/utils/validate'
import {
  getMemberNameIsExist,
  getManageNameIsExist
} from '@/api/community'

export function validateCommunityName (rule, value, callback) {
  const apiObj = {
    member: getMemberNameIsExist,
    manage: getManageNameIsExist
  }
  if (!value) {
    callback(new Error('请输入社群名称'))
  } else {
    if (value.length > 32) {
      callback(new Error('请输入1-32位字符'))
    } else if (validateRule(value, 2)) {
      apiObj[rule.valueType]({ name: value }).then((res) => {
        !res.data ? callback() : callback(new Error('社群名称已存在'))
      }).catch((err) => {
        callback(new Error(err.msg || '验证失败'))
      })
    } else {
      callback(new Error('仅限汉字/字母/数字/下划线/空格'))
    }
  }
}
