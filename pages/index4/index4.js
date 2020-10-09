Page({

  /**
   * 页面的初始数据
   */
  data: {
    request_url: 'https://www.xxx.com',
    img_url: 'https://www.xxx.com/wx/life_img/',
    if_del_val: false,
    if_guanbi: false,
    hui_guan: false,
  },

  select_del: function() {
    this.setData({
      if_del_val: !this.data.if_del_val
    })
  },

  del_: function(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: that.data.quedingdels,
      success(res) {
        if (res.confirm) {
          wx.request({
            url: that.data.request_url + '/wx/del.php',
            data: {
              del: e.target.id,
              imgurl_01: e.target.dataset.url01,
              imgurl_02: e.target.dataset.url02,
              imgurl_03: e.target.dataset.url03,
              imgurl_04: e.target.dataset.url04,
              imgurl_05: e.target.dataset.url05,
              imgurl_06: e.target.dataset.url06,
            },
            success(res) {
              wx.showToast({
                icon: 'success',
                title: that.data.delcg,
              })
              setTimeout(function() {
                wx.switchTab({
                  url: '../index/index',
                })
              }, 2200)
            }
          })
        }
      }
    })
  },

  jbao: function() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: that.data.quedingjubao,
      success(res) {
        if (res.confirm) {
          wx.showToast({
            icon: 'success',
            title: that.data.jubaook,
          })
        }
      }
    })
  },
  shouye: function() {
    wx.switchTab({
      url: '../index/index',
    })
  },

  boda: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.id
    })
  },

  bindtap_img: function(e) {
    wx.previewImage({
      current: e.target.id,
      urls: [e.target.id]
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

  ping_guan: function(options) {
    this.setData({
      ping_placeholder: this.data.pingls + options.currentTarget.dataset.ping,
      if_guanbi: !this.data.if_guanbi
    })
  },

  ping_form: function(e) {
    var that = this;
    if (that.data.name == undefined) {
      wx.showToast({
        icon: 'none',
        title: that.data.qingshouqdengl,
      })
    } else {
      wx.request({
        url: that.data.request_url + '/wx/pinglun.php',
        header: {
          'content-type': 'application/json'
        },
        data: {
          ping_idx: that.data.idx,
          useame_01: that.data.name,
          ping_hui: that.data.pingls,
          useame_02: '',
          ping_val: e.detail.value.ping_txt,
          hui_val: '',
        },
        success(res) {
          that.setData({
            ping_val: res.data,
            if_guanbi: false,
          })
        }
      })
    }
  },

  useame: function(options) {
    var that = this;
    that.setData({
      ping_placeholders: options.currentTarget.dataset.hui_useame,
      hui_name: options.currentTarget.dataset.hui,
      ping_placeholder: that.data.huifus + options.currentTarget.dataset.hui_useame,
      hui_guan: !that.data.hui_guan,
    })
  },
  hui_guan: function() {
    this.setData({
      hui_guan: !this.data.hui_guan,
    })
  },

  hui_form: function(e) {
    var that = this;
    if (that.data.name == undefined) {
      wx.showToast({
        icon: 'none',
        title: that.data.qingshouqdengl,
      })
    } else {
      wx.request({
        url: that.data.request_url + '/wx/pinglun.php',
        header: {
          'content-type': 'application/json'
        },
        data: {
          ping_idx: that.data.idx,
          useame_01: that.data.name,
          ping_hui: that.data.huifus,
          useame_02: that.data.hui_name,
          ping_val: '',
          hui_val: e.detail.value.hui_txt,
        },
        success(res) {
          that.setData({
            ping_val: res.data,
            hui_guan: !that.data.hui_guan,
          })
        }
      })
    }
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
          liulanliangs: res.data.life[0].liulanliangs,
          dels: res.data.life[0].dels,
          jubao: res.data.life[0].jubao,
          quanbupingls: res.data.life[0].quanbupingls,
          pingls: res.data.life[0].pingls,
          guanbis: res.data.life[0].guanbis,
          fasongs: res.data.life[0].fasongs,
          shouyes: res.data.life[0].shouyes,
          dianzans: res.data.life[0].dianzans,
          lianxita: res.data.life[0].lianxita,
          fenxiang: res.data.life[0].fenxiang,
          pingls: res.data.life[0].pingls,
          huifus: res.data.life[0].huifus,
          quedingdels: res.data.life[0].quedingdels,
          delcg: res.data.life[0].delcg,
          quedingjubao: res.data.life[0].quedingjubao,
          jubaook: res.data.life[0].jubaook,
          qingshouqdengl: res.data.life[0].qingshouqdengl,
        })
      }
    })
    that.getStorage();
    that.setData({
      idx: options.id
    })
    var id = JSON.parse(options.id);
    wx.request({
      url: that.data.request_url + '/wx/val_xiangqing.php',
      header: {
        'content-type': 'application/json'
      },
      data: {
        idx: id
      },
      success(res) {
        that.setData({
          datas: res.data,
          imgurl: res.data[0].imgurl_01,
        })
      }
    })

    wx.request({
      url: that.data.request_url + '/wx/liulan_val.php',
      header: {
        'content-type': 'application/json'
      },
      data: {
        idx: id
      },
      success(res) {
        that.setData({
          liulan: res.data
        })
      }
    })

    wx.request({
      url: that.data.request_url + '/wx/pinglun.php',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          ping_val: res.data,
        })
      }
    })

    wx.request({
      url: that.data.request_url + '/wx/pinglun_size.php',
      header: {
        'content-type': 'application/json'
      },
      data: {
        ly_size: options.id
      },
      success(res) {
        that.setData({
          ly_size: res.data
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