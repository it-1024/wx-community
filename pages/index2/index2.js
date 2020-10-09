var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    request_url: 'https://www.xxx.com',
    imageList: [],
    select_if: true,
    touxing_img: '',
    name: '',
    content_up_del_if: false,
    select_val: null,
  },

  select_img: function() {
    var that = this;
    var imageList = that.data.imageList;
    wx.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        var imgurl = res.tempFilePaths;
        var imgarry = imageList.concat(imgurl);
        that.setData({
          imageList: imgarry
        })
        if (that.data.imageList.length == 6) {
          that.setData({
            select_if: false
          })
        }
      }
    })
  },

  remove_img: function(imageList, del_imgs) {
    for (var i = 0; i < imageList.length; i++) {
      if (imageList[i] == del_imgs) {
        imageList.splice(i, 1);
      }
    }
    return -1;
  },

  del_imgs: function(e) {
    var imageList = this.data.imageList;
    var del_imgs = e.target.id;
    this.remove_img(imageList, del_imgs);
    this.setData({
      content_up_del_if: false,
      imageList: this.data.imageList,
    })
    if (this.data.imageList.length < 6) {
      this.setData({
        select_if: true
      })
    }
  },

  yulian_select_img: function(e) {
    wx.previewImage({
      current: e.target.id,
      urls: [e.target.id]
    })
  },

  dizhi: function() {
    var that = this;
    if (that.data.address == undefined) {
      wx: wx.showModal({
        title: '提示',
        content: that.data.qingkaiqisouquan,
      })
    }
    wx.chooseLocation({
      type: 'wgs84',
      success(res) {
        var name = res.name
        var address = res.address
        that.setData({
          address: address
        })
      },
      fail() {

      }
    })
  },

  huoqu_img: function(str) {
    var indexOf = str.lastIndexOf("\/");
    str = str.substring(indexOf + 1, str.length);
    return str;
  },

  up_img: function() {
    var that = this;
    var imageList = that.data.imageList;
    for (var i = 0; i < imageList.length; i++) {
      wx.uploadFile({
        url: that.data.request_url + '/wx/life.php',
        filePath: imageList[i],
        name: 'file',
      })
    }
  },

  formSubmit: function(e) {
    var that = this;
    //console.log(e.detail.value)
    var imageList = that.data.imageList;
    wx.getStorage({
      key: 'user',
      success(res) {
        that.setData({
          touxing_img: res.data.touxing_img,
          name: res.data.name
        })
      }
    });
    if (e.detail.value.textarea !== '') {
      var zhengze = /^[1][3,4,5,7,8][0-9]{9}$/;
      var phone = e.detail.value.dianhua;
      if (!zhengze.test(phone)) {
        wx.showToast({
          icon: 'none',
          title: that.data.qingrushuokhaoma,
        })
      } else {
        if (that.data.name == '') {
          wx.showToast({
            icon: 'none',
            title: that.data.qingshouqdengl,
          })
        } else {
          wx.request({
            url: that.data.request_url + '/wx/life.php',
            data: {
              touxiang_img: that.data.touxing_img,
              username: that.data.name,
              select_val: that.data.select_val,
              neirong: e.detail.value.textarea,
              dizhi: that.data.address,
              haoma: e.detail.value.dianhua,
              imgurl_01: that.huoqu_img(imageList[0]),
              imgurl_02: that.huoqu_img(imageList[1]),
              imgurl_03: that.huoqu_img(imageList[2]),
              imgurl_04: that.huoqu_img(imageList[3]),
              imgurl_05: that.huoqu_img(imageList[4]),
              imgurl_06: that.huoqu_img(imageList[5]),
            },
            header: {
              'content-type': 'application/json'
            },
            success(res) {
              that.setData({
                textarea_val: '',
                dianhua_val: '',
                imageList: [],
              })
              wx.showToast({
                icon: 'success',
                title: that.data.tijiaook,
              })
              setTimeout(function() {
                wx.switchTab({
                  url: '../index/index',
                })
              }, 2300)
            }
          })
        }
      }
    } else {
      wx.showToast({
        icon: 'none',
        title: that.data.neirongonkong,
      })
    }
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

  getLocation: function() {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var speed = res.speed
        var accuracy = res.accuracy
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })

        var qqmapsdk = new QQMapWX({
          key: 'IDZBZ-NFZR4-K7CUG-X2M6H-XVXB3-FZF' //key
        });

        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function(res) {
            that.setData({
              address: res.result.address
            })
          }
        })
      },
      fail: function() {

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
          shurufabuval: res.data.life[0].shurufabuval,
          dizhis: res.data.life[0].dizhis,
          shurudianhua: res.data.life[0].shurudianhua,
          lijifabu: res.data.life[0].lijifabu,
          neirongonkong: res.data.life[0].neirongonkong,
          tijiaook: res.data.life[0].tijiaook,
          qingrushuokhaoma: res.data.life[0].qingrushuokhaoma,
          qingkaiqisouquan: res.data.life[0].qingkaiqisouquan,
          qingshouqdengl: res.data.life[0].qingshouqdengl,
        })
      }
    })
    that.getStorage();
    that.getLocation();
    that.setData({
      select_val: options.select_val
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