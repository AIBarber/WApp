// pages/photo_share/share.js
var model = require('../../utils/model.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      img: options.share_img
    })
  },

  onShareAppMessage: function (ops) {
    return model.getShareFunction('share_img=' + this.data.img, this.data.img);
  },

  stopRefreshing: function () {
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  saveToLocal:function(){
    var that=this;
    wx.downloadFile({
      url: that.data.img,
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res)
            console.log('fail')
          }
        })
      },
      fail: function () {
        console.log('fail')
      }
    })
  }
})