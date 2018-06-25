// pages/index/opencard/opencard.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    name:'',
    phone:'',
    address:'',
    isAgree:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = app.globalData.userInfo
    this.setData({
      name: userInfo ? userInfo.nickName:''
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  bindAgreeChange:function(){
    this.setData({
      isAgree: !this.data.isAgree
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  chooseAddress:function(){
    var that = this;
    wx.chooseLocation({
      success:function(data){
        that.setData({
          address: data.address
        })
      }
    });
  },
  getPhoneNumber: function (e) {
    var that = this;
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      //发起网络请求
      wx.request({
        method:'POST',
        url: 'https://e20.xin/api/wxPhp/demo.php',
        data: {
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData,
          session_id: app.globalData.session_id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (data) {
          if (data !== "error"){
            var phone = data.data.phoneNumber;
            that.setData({
              phone: phone
            })
          }

        }
      })
    } else {
      console.log('获取失败！' + e.errMsg)
    }
  },
  inputName: function (e) {
    this.setData({
      name: e.detail.value
    })
   },
  inputAddress:function(e){
    this.setData({
      address: e.detail.value
    })
  },
  register:function(){
    var that = this;
    if (that.data.date && that.data.name && that.data.phone && that.data.address){
      wx.showLoading({
        title: '正在提交...',
      })
      wx.request({
        method: 'POST',
        url: 'https://e20.xin/api/wx/open/card',
        data: {
          openid: app.globalData.openid,
          id: app.globalData.userLoaclInfo.id,
          birthdate: that.data.date,
          name: that.data.name,
          phone: that.data.phone,
          address: that.data.address,
          token:'jiehaikeji'
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          wx.hideLoading();
          if (res.data.code==0){
            app.globalData.userLoaclInfo = res.data.data;
            wx.showToast({
              title: '会员卡开通成功',
              icon: 'success',
              duration: 2000
            })
            wx.redirectTo({
              url: "/pages/index/index"
            })
          }else{
            wx.showToast({
              title: '会员卡开通失败',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '信息填写不全',
        icon: 'none',
        duration: 2000
      })
    }
    
    
  } 
})