Page({

  /**
   * 页面的初始数据
   */
  data: {
    touxing_img: '',
    name: '',
  },

  bindGetUserInfo(e) {
    var that = this;
    wx.setStorage({
      key: 'user',
      data: {
        touxing_img: e.detail.userInfo.avatarUrl,
        name: e.detail.userInfo.nickName
      },
    });
    that.setData({
      touxing_img: e.detail.userInfo.avatarUrl,
      name: e.detail.userInfo.nickName
    })
  },

  getStorage: function() {
    var that = this;
    wx.getStorage({
      key: 'user',
      success(res) {
        that.setData({
          touxing_img: res.data.touxing_img,
          name: res.data.name
        })
      }
    });
  },

  shezhi: function() {
    wx.getSetting({ 
      success: function(res) {
        wx.openSetting({ 

        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: 'https://www.xxx.com/wx/life.json',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          guanyupt: res.data.life[0].guanyupt,
          shezhizhongxin: res.data.life[0].shezhizhongxin,
          tishishouq: res.data.life[0].tishishouq,
          quedingshouq: res.data.life[0].quedingshouq,
        })
      }
    })
    that.getStorage();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getStorage();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})