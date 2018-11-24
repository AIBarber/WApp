// pages/myReservation/personal.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp();


function getInfo(that) {
    console.log('getDataList ' + api.StoreCustomerDetail);
    wx.showNavigationBarLoading();

    util.weshowRequest(
      api.StoreCustomerDetail,
      {
        'customerid': app.globalData.userid
      },
      'POST').then(res => {
        //if (res.data) {}
        console.log('getDataList 11111111111111111111');
        console.log(res);
        // success
        that.setData({ info: res.data });
        console.log(res.data.type)
        app.globalData.userType=res.data.type
        // console.log(that.data);
        //that.stopRefreshing();
        //that.waitUpdate();
      }).catch((err) => {
        console.log('getDataList err22222222222222222222' + err);
        // fail
        //that.stopRefreshing();
        wx.showToast({
          title: '正在获取数据…',
          icon: 'loading',
          duration: 3000,
          mask: true
        });
        that.setData({ info: (wx.getStorageSync('info') || []) });
      });
  }

  function getReservation(that) {
    console.log('getDataList ' + api.CustomerSubscribeList);
    wx.showNavigationBarLoading();

    util.weshowRequest(
      api.CustomerSubscribeList,
      {
        'customerid': app.globalData.userid,
      },
      'POST').then(res => {
        //if (res.data) {}
        console.log('getReservation ' + app.globalData.userid);
        console.log('getDataList 33333333333333333333333333333333');
        console.log(res);
        // success
        that.setData({ reservation: res.data.data.list });
        // console.log(that.data);
        //that.stopRefreshing();
        //that.waitUpdate();
      }).catch((err) => {
        console.log('getDataList err 44444444444444444444444444444444' + err);
        // fail
        //that.stopRefreshing();
        wx.showToast({
          title: '正在获取数据…',
          icon: 'loading',
          duration: 3000,
          mask: true
        });
        that.setData({ reservation: (wx.getStorageSync('reservation') || []) });
      });
  }

  function getAttribute(that) {
    console.log('getDataList ' + api.CustomerAttribute);
    wx.showNavigationBarLoading();

    util.weshowRequest(
      api.CustomerAttribute,
      {
        'costomerid': app.globalData.userid
      },
      'POST').then(res => {
        //if (res.data) {}
        console.log('getDataList 555555555555555555555555555');
        console.log(res);
        // success
        that.setData({ attribute: res.data });
        // console.log(that.data);
        //that.stopRefreshing();
        //that.waitUpdate();
      }).catch((err) => {
        console.log('getDataList err' + err);
        // fail
        //that.stopRefreshing();
        wx.showToast({
          title: '正在获取数据…',
          icon: 'loading',
          duration: 3000,
          mask: true
        });
        that.setData({ attribute: (wx.getStorageSync('attribute') || []) });
      });
  }

  function goToMyBarber() {
    wx.navigateTo({
      url: '../myBarber/myBarber',
    })
  }

  function goToCoupon() {
    wx.navigateTo({
      url: '../myCoupon/coupon',
    })
  }

  function goToConsumption() {
    wx.navigateTo({
      url: '../myHistoryCost/cost',
    })
}

function changeToBarber(that) {
  console.log('changeToBarber');
  if (that.data.info.type != 1) {
    wx.navigateTo({
      url: '../FaceIdentity/Identity',
    })
  } else {
    that.setData({
      userType: 1
    });
  }
}


module.exports = {
  getInfo,
  getReservation,
  getAttribute,
  goToMyBarber,
  goToCoupon,
  goToConsumption,
  changeToBarber,
}