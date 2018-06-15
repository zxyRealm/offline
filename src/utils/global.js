import Cookies from "js-cookie"
import Clipboard from "clipboard"
import { fetch,message } from '@/utils/request'
exports.install = function (Vue, options) {
  // 公用提示框
  Vue.prototype.$tip = function (txt, type = 'info', delay = 1000) {
   return message(txt,type,delay)
  };
  // 异步请求
  Vue.prototype.$http = function (url, params) {
    return fetch(url,params);
  };
  // 退出登录
  Vue.prototype.$exit = function () {
    this.$affirm('确认退出吗？', '', (res) => {
      if (res) {
        localStorage.clear();
        Cookies.remove("guid");
        this.$router.push("/login")
      }
    });
  };

  // 确认操作提示框
  Vue.prototype.$affirm = function (txt, title = '操作提示', callback) {
    this.$confirm(txt, title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      center: true,
      customClass: 'affirmBox',
      type: 'warning'
    }).then(() => {
      callback(true)
    }).catch(() => {
      callback(false)
    });
  };

  // loading加载层
  Vue.prototype.$load = function (txt) {
    return this.$loading({
      // lock: true,
      text: txt || '数据努力加载中...',
      spinner: 'el-icon-loading',
      background: 'transparent'
    });
  };

  // 发送验证码
  Vue.prototype.$sendCode = function (data) {
    if (!data.phone) {
      this.$tip("请先填写手机号", 'error', 2000);
      return false
    }
    // console.log(this.timer);
    if (!this.sending && !this.timer) {
      let setTime = 60;
      this.iconTxt = '60s后可重新发送';
      this.timer = setInterval(() => {
        setTime--;
        this.iconTxt = setTime + 's后可重新发送';
        if (setTime <= 0) {
          clearInterval(this.timer);
          this.timer = null;
          this.iconTxt = '发送验证码';
        }
      }, 1000);
      this.sending = true;
      this.$http("/access/user/phone/code", {phone: data.phone}).then(res => {
        this.sending = false;
        if (res.result === 1) {
          this.$tip('发送成功');
        } else {
          clearInterval(this.timer);
          this.timer = null;
          this.iconTxt = '发送验证码';

        }
      })
    }
  };

  // 复制内容到粘贴板
  Vue.prototype.$clip = function (text, event) {
    const clipboard = new Clipboard(event.target, {
      text: () => text
    });
    clipboard.on('success', () => {
      this.$tip("复制成功");
      clipboard.off('error');
      clipboard.off('success');
      clipboard.destroy()
    });
    clipboard.on('error', () => {
      this.$tip("复制失败");
      clipboard.off('error');
      clipboard.off('success');
      clipboard.destroy()
    });
    clipboard.onClick(event)
  };

  // 确认操作框

  Vue.prototype.$affirm = function (text, callback, showCancel=true) {
    const h = this.$createElement;
    this.$msgbox({
      title: '',
      message: h('p', null, [
        h('span', null,text.text)
      ]),
      center:true,
      customClass:'uu-message-affirm',
      confirmButtonClass:'affirm',
      cancelButtonClass:'cancel',
      showCancelButton: showCancel,
      confirmButtonText: text.confirm,
      cancelButtonText: text.cancel,
      beforeClose: (action, instance, done) => {
        callback(action,instance,done);
      }
    })
  }
};

