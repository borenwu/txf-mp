var app = getApp()
var Meteor = wx.Meteor;
var util = require('../../utils/util.js')
var _ = Meteor.underscore;
var items = []

function sortMessage(msgArr) {
    if (!_.isArray(msgArr)) {
        return msgArr;
    }
    return msgArr.sort(function (a, b) {
        return new Date(b._updateAt) - new Date(a._updateAt);
    });
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        community_name: '',
        itemList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var meteorUser = wx.getStorageSync("meteorUser")
        if(meteorUser){
            var platform_id = meteorUser.profile.platform_id
            var community_id = meteorUser.profile.community_id
            var community_name = meteorUser.profile.community_name
        }
        

        // 数据订阅
        var subReady = Meteor.subscribe('items.leader', platform_id, community_id);
        var DDP = Meteor.getData().ddp;
        Meteor.Tracker.autorun(function () {
            console.log("items.leader 订阅状态", subReady.ready())
        });
        DDP.on("added", ({ collection, id, fields }) => {
            // fields.test = "hello"
            // fields.test2 = "hello"
            var collection = Meteor.collection(collection).find()
            console.log(collection)
            for (var i = 0; i < collection.length; i++) {
                collection[i].community_name = community_name
                collection[i].link = `/pages/itemInfo/itemInfo?id=${collection[i]._id}&community=${collection[i].community_name}`
            }
            this.setData({
                itemList:collection
            })
        });
        DDP.on("changed", ({ collection, id, fields }) => {
            this.setData({
                itemList: sortMessage(Meteor.collection(collection).find())
            })
        });
        DDP.on("removed", ({ collection, id }) => {
            this.setData({
                itemList: sortMessage(Meteor.collection(collection).find())
            })
        });

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