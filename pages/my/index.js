var app = getApp()
Page( {
  data: {
    userInfo: {},
    // projectSource: 'https://github.com/liuxuanqiang/wechat-weapp-mall',
    userListInfo: [ {
      icon: '../../images/orders-icon.png',
      text: '我的订单'
      // isunread: true,
      // unreadNum: 2
    }, 
    // {4px
    //     icon: '../../images/iconfont-card.png',
    //     text: '我的代金券',
    //     isunread: false,
    //     unreadNum: 2
    //   }, 
      // {
      //   icon: '../../images/iconfont-icontuan.png',
      //   text: '我的拼团',
      //   isunread: true,
      //   unreadNum: 1
      // }, 
      {
        icon: '../../images/adress-icon.png',
        text: '收货地址管理'
      }, 
      // {
      //   icon: '../../images/iconfont-kefu.png',
      //   text: '联系客服'
      // }, 
      // {
      //   icon: '../../images/iconfont-help.png',
      //   text: '常见问题'
      // }
      ]
  },

  onLoad: function() {
    var that = this
    this.setData({
        userInfo: app.globalData.userInfo
    })
  }
})