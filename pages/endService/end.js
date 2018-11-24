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
    detail:null
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
    wx.navigateTo({
      url: '../QR_code/code',
    })
  }
})