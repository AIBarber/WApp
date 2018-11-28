// pages/endService/end.js
var app = getApp();
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    detail:null,
    access: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('orderid: ' + options.orderid)
    this.setData({
      id:options.orderid
    })
    this.getData_Order();
  },

  getData_Order:function(){
    console.log('getDataList ' + api.OrderDetail);
    wx.showNavigationBarLoading();
    var that = this;

    util.weshowRequest(
      api.OrderDetail,
      {
        'orderid': that.data.id
      },
      'POST').then(res => {
        //if (res.data) {}
        console.log('getDataList ************************88888888888888');
        console.log(res);
        // success
        that.setData({ detail: res.data });
        that.stopRefreshing();
        //that.waitUpdate();
      }).catch((err) => {
        console.log('getDataList err' + err);
        // fail
        that.stopRefreshing();
        that.setData({ detail: (wx.getStorageSync('detail') || []) });
      });
  },

  stopRefreshing: function () {
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  toQRCode:function(){
    var that=this;
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxba71617fb1ac4213&secret=aa2c4031799c35fb656da3ea2a0071b3',
      success: function (res) {
        console.log(res)
        that.setData({
          access: res.data.access_token
        })
        wx.navigateTo({
          url: '../QR_code/code?access_token=' + that.data.access,
        })
      }
    })
  }
})