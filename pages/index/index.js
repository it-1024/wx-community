Page({

  /**
   * 页面的初始数据
   */
  data: {
    request_url: 'https://www.xxx.com',
    img_url: 'https://www.xxx.com/wx/life_img/',
    liu_: '0',
    if_dianz: false,
    idxtrue: true,
  },

  sousuo: function() {
    wx.navigateTo({
      url: '../index5/index5',
    })
  },

  datas: function() {
    var that = this;
    wx.request({
      url: that.data.request_url + '/wx/life.php',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          datas: res.data
        })
      }
    })
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

  dianzan: function(e) {
    var that = this;
    if (e.currentTarget.id) {
      // console.log(e.currentTarget.id)
      // var dianz_idx = e.currentTarget.id
      that.setData({
        dianz_idx: e.currentTarget.id,
        if_dianz: !that.data.if_dianz,
      })
      wx: wx.request({
        url: that.data.request_url + '/wx/zan_val.php',
        data: {
          dianz_idx: e.currentTarget.id,
          if_dianz: false,
        },
        success(res) {
          // console.log(res)
          that.setData({
            zan_val: res.data
          });
          wx.showToast({
            icon: 'success',
            title: '已赞',
          })
        }
      })
    }
    // console.log(e)
    // console.log(that.data.if_dianz)
  },

  getdianzan: function() {
    var that = this;
    wx: wx.request({
      url: that.data.request_url + '/wx/zan_val.php',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          zan_val: res.data
        })
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
    // var that = this;
    // wx.request({
    //   url: that.data.request_url + '/wx/images/life.json',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success(res) {
    //     // console.log(res)
    //     that.setData({
    //       idxtrue: res.data.life[0].idxtrue,
    //       guanjianz: res.data.life[0].guanjianz,
    //       swiper_item01: res.data.life[0].swiper_item01,
    //       swiper_item02: res.data.life[0].swiper_item02,
    //       swiper_item03: res.data.life[0].swiper_item03,
    //       fangyuan: res.data.life[0].fangyuan,
    //       zhuanzu: res.data.life[0].zhuanzu,
    //       quanzhi: res.data.life[0].quanzhi,
    //       jianzhi: res.data.life[0].jianzhi,
    //       ershouwupin: res.data.life[0].ershouwupin,
    //       congwu: res.data.life[0].congwu,
    //       zuixinxiaoxi: res.data.life[0].zuixinxiaoxi,
    //       lianxita: res.data.life[0].lianxita,
    //       fenxiang: res.data.life[0].fenxiang,
    //       swiper_item03: res.data.life[0].swiper_item03,
    //       imgs01: res.data.life[0].imgs01,
    //       imgs02: res.data.life[0].imgs02,
    //     })
    //   }
    // })
    // that.datas();
    // that.liulan();
    // that.getdianzan();
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
    // var that = this;
    // that.datas();
    // that.liulan();
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