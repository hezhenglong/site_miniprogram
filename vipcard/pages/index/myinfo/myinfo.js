// pages/index/myinfo/myinfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    phone:'',
    birthday:'',
    address:'',
    cardNum: '',
    balance: '',
    integral: '',
    level: '', 
    arrLevel: [18000, 6000, 2000]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userLoaclInfo && app.globalData.userLoaclInfo.isOpen == "1") {
      this.setData({
        name: app.globalData.userLoaclInfo.realname,
        phone: app.globalData.userLoaclInfo.phone,
        birthday: app.globalData.userLoaclInfo.birthday,
        address: app.globalData.userLoaclInfo.Address,
        cardNum: app.globalData.userLoaclInfo.cardNum,
        balance: app.globalData.userLoaclInfo.balance,
        integral: app.globalData.userLoaclInfo.integral,
        level: app.globalData.userLoaclInfo.levelcount
      })
    }

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
  
  }
})