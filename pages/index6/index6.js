// pages/index6/index6.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
          fangyuan: res.data.life[0].fangyuan,
          zhuanzu: res.data.life[0].zhuanzu,
          quanzhi: res.data.life[0].quanzhi,
          jianzhi: res.data.life[0].jianzhi,
          ershouwupin: res.data.life[0].ershouwupin,
          congwu: res.data.life[0].congwu,
        })
      }
    })
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