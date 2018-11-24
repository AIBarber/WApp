// pages/subscribe_Success/sub_Success.js
var app = getApp();
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var model = require('../../utils/model.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   info_reservation:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取上一个页面照片的临时地址
    var pages = getCurrentPages();
    var Page = pages[pages.length - 1];//当前页
    var prevPage = pages[pages.length - 2];  //上一个页面
  },

  backToprevPage: function () {
    wx.navigateBack({
    })
  },


  getInfoOfReservation:function(){

  },
  
  goToSelf:function(){
    wx.switchTab({
      url: '../PersonalHome/PersonalHome',
    })
  }
})