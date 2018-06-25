//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasVip: false,
    cardNum:null,
    balance:'-',
    integral:'-',
    level:'-',
    name:'',
    arrLevel:[18000,6000,2000],
    isManager:false,
    menus:[]
  },
  onLoad: function () {
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      if (app.globalData.userLoaclInfo && app.globalData.userLoaclInfo.isOpen == "1") {
        that.setData({
          hasVip: true,
          name: app.globalData.userLoaclInfo.realname,
          cardNum: app.globalData.userLoaclInfo.cardNum,
          balance: app.globalData.userLoaclInfo.balance,
          integral: app.globalData.userLoaclInfo.integral,
          level: app.globalData.userLoaclInfo.levelcount
        })
        if (app.globalData.userLoaclInfo.isManager == "1"){
          that.setData({
            isManager: true
          });
        }
      }
      
      
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        var timeClock = setInterval(function () {
          if (app.globalData.userLoaclInfo && app.globalData.userLoaclInfo.isOpen == "1") {
            clearInterval(timeClock);
            that.setData({
              hasVip: true,
              name: app.globalData.userLoaclInfo.realname,
              cardNum: app.globalData.userLoaclInfo.cardNum,
              balance: app.globalData.userLoaclInfo.balance,
              integral: app.globalData.userLoaclInfo.integral,
              level: app.globalData.userLoaclInfo.levelcount
            });
            if (app.globalData.userLoaclInfo.isManager == "1") {
              that.setData({
                isManager: true
              });
            }
          }
        }, 500);

        
      
        
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
      
    }
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.request({
      url: 'https://e20.xin/api/wx/vip/menu',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
          if(res.data.code == 0){
             that.setData({
               menus: res.data.data
             });
          }
      }
    });
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  openCode: function(){
    wx.navigateTo({    //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
      url: "/pages/index/cardcode/cardcode"
    })
  },
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '027-84808278'
    })
  },
  openCard: function(){
    wx.redirectTo({ 
      url: "/pages/index/opencard/opencard"
    })
  },
  onPullDownRefresh:function(){
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function(){
      if (app.globalData.userLoaclInfo && app.globalData.userLoaclInfo.cardNum) {
        wx.request({
          url: 'https://e20.xin/api/wx/vipinfo/user',
          data: {
            code: app.globalData.userLoaclInfo.cardNum,
            token: 'jiehaikeji'
          },
          success: function (res) {
            if (res.data.code == 0) {
              app.globalData.userLoaclInfo = res.data.data;
              that.setData({
                balance: app.globalData.userLoaclInfo.balance,
                integral: app.globalData.userLoaclInfo.integral,
                level: app.globalData.userLoaclInfo.levelcount
              })
            }
            // success
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
          }
        })
      }  
    },1000);
       
  },
  onShareAppMessage: function (options) {
    　　
  }
})
