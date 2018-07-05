var app = getApp()
var Meteor = wx.Meteor;
var util = require('../../utils/util.js')
var _ = Meteor.underscore;

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
        item:{},
        num: 0,
        morePrice:0.0,
    },

    getTotal(){
        return this.data.item.sale_price * this.data.num
    },

    inputVl(e) {
        const num = e.detail.value;
        this.howMorePri(num)
    },
    add() {
        const num = this.data.num + 1;
        this.howMorePri(num)
        // this.queryInfo({monParam:'morePrice'})
    },
    cut() {
        if (this.data.num < 2) return;
        const num = this.data.num - 1;
        this.howMorePri(num)
    },
    howMorePri(num) {
        this.setData({
            num: num,
            morePrice: (num * this.data.item.sale_price).toFixed(2)
        });
    },
    createOrder(){
        var orderInfo = {
            community:this.data.item.community_name,
            title:this.data.item.title,
            sale_price:this.data.item.sale_price,
            num:this.data.num,
            morePrice:this.data.morePrice
        }
        var str = JSON.stringify(orderInfo);
        wx.navigateTo({
            url: '../order/order?orderInfo='+ str,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var self = this
        console.log(options)
        var id = options.id
        var community_name = options.community
    
        Meteor.call('getSingleItem',id,function(err,result){
            if(err) return
            if(result.code == 0){
                console.log(result.item)
                var item = result.item
                item.community_name = community_name
                self.setData({
                    item:item
                })
            }
            
        })
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