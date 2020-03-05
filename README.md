##个人收集案例

####vue接入weixin-js-sdk时注意点：
#####1、安卓与ios在浏览器中的差异，ios保留最初始进入的页面的url，安卓则为当前页面的url
#####2、若微信小程序接入时还需要考虑如果为微信小程序则安卓也保持初始进入的页面的url

```
    getUrl () {
      if (!window.entryUrl || window.entryUrl === '') {
        window.entryUrl = location.href.split('#')[0]
      }
      const u = navigator.userAgent
      const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // g
       if (isAndroid) {
        if (userAgent.isMiniProgram(wx)) {
          // 小程序
          return window.entryUrl
        } else {
          // 浏览器
          return location.href.split('#')[0]
        }
      } else {
        return window.entryUrl
      }
    }
```

```
export const userAgent = {
  isAndroid: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
  isIOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
  isWeiXin: u.toLowerCase().indexOf('micromessenger') !== -1,
  isMiniProgram: function (wx) {
    if (this.isWeiXin) {
      let isMiniProgram = false
      wx.miniProgram.getEnv((res) => {
        isMiniProgram = res.miniprogram
      })
      return isMiniProgram
    }
  }
}
```
