var app = getApp()
var Meteor = wx.Meteor;
var util = require('../../utils/util.js')
var _ = Meteor.underscore;


Page({

    /**
     * 页面的初始数据
     */
    data: {
        username:'',
        password:''
    },

    userNameInput: function (e) {
        this.setData({
            userName: e.detail.value
        })
    },
    passWdInput: function (e) {
        this.setData({
            userPwd: e.detail.value
        })
    },

    handleLogin:function(){
        console.log("用户名：" + this.data.userName + " 密码：" + this.data.userPwd);
        console.log('login')
        Meteor.loginWithPassword(this.data.userName,this.data.userPwd,function(err){
            if(err){
                console.log(err)    
                return   
            }
            var currentUser = Meteor.user()
            wx.setStorageSync('meteorUser', currentUser)
            wx.switchTab({
                url: "../items/items",
            })
        })
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {


    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})