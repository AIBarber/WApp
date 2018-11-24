// pages/endService/end.js
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
    //获取上一个页面照片的临时地址
    var Pages = getCurrentPages();
    var Page = Pages[Pages.length - 1];//当前页
    var prevPage = Pages[Pages.length - 2];  //上一个页面
    this.setData({
      id:prevPage.data.id,
      detail: prevPage.data.customer_detail
    })
  },

  getData_Order:function(){
    console.log('getDataList ' + api.StoreList);
    wx.showNavigationBarLoading();
    var that = this;

    util.weshowRequest(
      api.StoreList,
      {
        'size': 10
      },
      'POST').then(res => {
        //if (res.data) {}
        console.log('getDataList ');
        console.log(res);
        // success
        that.setData({ shop_arrays: res.data.data.list });
        console.log(that.data);
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
        that.setData({ shop_arrays: (wx.getStorageSync('shop_arrays') || []) });
      });
  },

  stopRefreshing: function () {
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  }
})