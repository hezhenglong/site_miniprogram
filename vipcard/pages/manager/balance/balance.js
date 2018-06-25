// pages/manager/balance/balance.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [
      { name: '充值增加（赠送积分需手动）', value: '1' },
      { name: '消费减少（自动加积分）', value: '0', checked: true }
    ],
    cardNum:'',
    name:'',
    phone:'',
    balance:0,
    canSubmit: false,
    price:0,
    integral:0,
    inorout:0,
    vip_id:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },
  radioChange: function (e) {
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    //支付余额  需要余额充足
    if (e.detail.value == 0) {
      this.checkBalance();
    }
    this.setData({
      radioItems: radioItems,
      inorout: e.detail.value
    });
  },
  scanCode:function(){
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        var code = res.result;
        var regNum = /^(8480 8278 \d{4} \d{4})$/;//判断用户输入的是否为数字
        if(regNum.test(code)){

          wx.request({
            url: 'https://e20.xin/api/wx/vipinfo/user',
            data: {
              code: code,
              token:'jiehaikeji'
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
               if(res.data.code == 0){
                 that.setData({
                   cardNum: code,
                   name: res.data.data.realname,
                   phone: res.data.data.phone,
                   balance: res.data.data.balance,
                   integral: res.data.data.integral,
                   vip_id: res.data.data.id
                 });
                 that.checkSubmit();
               }else{
                 wx.showToast({
                   title: '会员卡信息无效',
                   icon: 'none',
                   duration: 2000
                 })
               }
            }
          })

          



          
        }else{
          wx.showToast({
            title: '会员卡信息无效',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  inputPrice:function(e){
    //赋值
    this.setData({
      price: e.detail.value
    })
    //支付余额  需要余额充足
    if (this.data.inorout == 0){
      this.checkBalance();
    }

    this.checkSubmit();

  },
  checkBalance:function(){
    //检查余额是否充足
    if (parseInt(this.data.price) > parseInt(this.data.balance)) {
      wx.showToast({
        title: '余额不足',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        price: 0
      })
    }
  },
  checkSubmit:function(){
    if (parseInt(this.data.price) > 0 && this.data.phone != '') {//
        this.setData({
          canSubmit:true
        });
    }else{
      this.setData({
        canSubmit: false
      });
    }
  },
  submit:function(){
    this.checkSubmit();
    var that = this;
    wx.request({
      method: 'POST',
      url: 'https://e20.xin/api/wx/balance/option',
      data: {
        vip_id:that.data.vip_id,
        inorout: that.data.inorout,
        price: that.data.price,
        token: 'jiehaikeji2016',
        uid: app.globalData.userLoaclInfo?app.globalData.userLoaclInfo.id:null
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        if (res.data.code == 0) {//success
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            balance: res.data.data.balance,
            integral: res.data.data.integral,
            price:0,
            canSubmit: false
          })
        }else{
          wx.showToast({
            title: '操作失败',
            icon: 'none',
            duration: 2000
          })
        }

      }
    })
    
  }
})