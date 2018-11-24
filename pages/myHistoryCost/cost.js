// pages/myHistoryCost/cost.js
var app = getApp();
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cost_list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDataList_cost();
  },

  backToprevPage: function () {
    wx.navigateBack({
    })
  },

  // 获取数据列表
  getDataList_cost: function () {
    console.log('getDataList ' + api.CustomerOrderList);
    console.log(this.data.id);
    wx.showNavigationBarLoading();
    var that = this;

    util.weshowRequest(
      api.CustomerOrderList,
      {
        'size': 10,
        'customerid': app.globalData.userid,
      },
      'POST').then(res => {
        //if (res.data) {}
        console.log('getDataList_cost ');
        console.log(res);
        // success
        that.setData({
          cost_list: res.data.data.list,
          cost_count: res.data.data.list.length
        });
        // console.log(that.data);
        that.stopRefreshing();
        //that.waitUpdate();
      }).catch((err) => {
        console.log('getDataList err' + err);
        // fail
        that.stopRefreshing();
        wx.showToast({
          title: '正在获取数据…',
          icon: 'loading',
          duration: 3000,
          mask: true
        });
        that.setData({ cost_list: (wx.getStorageSync('cost_list') || []) });
      });
  },

  stopRefreshing: function () {
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops)
    }
    var that = this
    return {
      title: '分享给好友',
      path: 'pages/myHistoryCost/cost',//点击分享消息是打开的页面
      imageUrl:ops.target.dataset.id,
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
        var shareTickets = res.shareTickets;
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
})