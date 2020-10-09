Page({

  /**
   * 页面的初始数据
   */
  data: {
    request_url: 'https://www.xxx.com',
    img_url: 'https://www.xxx.com/wx/life_img/',
    select_val: '',
  },

  boda: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.target.id
    })
  },

  bindtap_img: function(e) {
    wx.previewImage({
      current: e.target.id,
      urls: [e.target.id]
    })
  },

  tofabu: function() {
    wx.switchTab({
      url: '../index6/index6',
    })
  },

  liulan: function() {
    var that = this;
    wx.request({
      url: that.data.request_url + '/wx/liulan_val.php',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          liulan: res.data
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: that.data.request_url + '/wx/life.json',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          lianxita: res.data.life[0].lianxita,
          fenxiang: res.data.life[0].fenxiang,
          zanshiwuxinx: res.data.life[0].zanshiwuxinx,
          tofabu: res.data.life[0].tofabu,
        })
        wx.hideLoading()
      }
    })
    that.liulan();
    wx.request({
      url: that.data.request_url + '/wx/select_val.php',
      data: {
        select_val: options.select_val
      },
      success(res) {
        that.setData({
          datas: res.data,
          select_val: res.data[0].select_val
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
    var that = this;
    that.liulan(); //获取浏览量
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
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      return {
        title: res.target.dataset.title,
        path: 'pages/index4/index4?id=' + JSON.stringify(res.target.id),
      }
    }
    return {
      path: 'pages/index/index',
    }

  }
})