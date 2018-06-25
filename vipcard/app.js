//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://e20.xin/api/wx/login/check',
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success:function(data){
              that.globalData.session_id = data.data.session_key;
              that.globalData.openid = data.data.openid;
              //发起网络请求  保存用户信息
              wx.request({
                method: 'POST',
                url: 'https://e20.xin/api/wx/vip/save',
                data: {
                  openid: that.globalData.openid,
                  nickName: that.globalData.userInfo?that.globalData.userInfo.nickName:''
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                success: function (res) {
                  if(res.data.code == 0){
                    that.globalData.userLoaclInfo = res.data.data;
                  }
                }
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    session_id: null,
    openid: null,
    userLoaclInfo:null
  }
})