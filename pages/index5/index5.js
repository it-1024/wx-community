Page({

  /**
   * 页面的初始数据
   */
  data: {
    request_url: 'https://www.xxx.com',
    img_url: 'https://www.xxx.com/wx/life_img/',
    no_val: false,
  },

  sousuo: function(e) {
    var that = this;
    wx.request({
      url: that.data.request_url + '/wx/sousuo.php',
      data: {
        sousuo_val: e.detail.value.sousuo_val
      },
      success(res) {
        that.setData({
          datas: res.data,
          sousuo_value: '',
        })
        if (res.data.length == 0) {
          that.setData({
            no_val: true
          })
        } else {
          that.setData({
            no_val: false
          })
        }
      }
    })
  },

  select_remen: function(e) {
    var that = this;
    wx.request({
      url: that.data.request_url + '/wx/sousuo.php',
      data: {
        sousuo_val: e.target.id
      },
      success(res) {
        that.setData({
          datas: res.data,
        })
        if (res.data.length == 0) {
          that.setData({
            no_val: true
          })
        } else {
          that.setData({
            no_val: false
          })
        }
      }
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
    wx.request({
      url: that.data.request_url + '/wx/life.json',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          guanjianz: res.data.life[0].guanjianz,
          lianxita: res.data.life[0].lianxita,
          fenxiang: res.data.life[0].fenxiang,
          sousuos: res.data.life[0].sousuos,
          remensousuos: res.data.life[0].remensousuos,
          danjians: res.data.life[0].danjians,
          shoujis: res.data.life[0].shoujis,
          wuxiangguanxx: res.data.life[0].wuxiangguanxx,
        })
      }
    })
    that.liulan();
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
    that.liulan(); 
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