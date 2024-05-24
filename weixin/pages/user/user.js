const app = getApp()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
      avatarUrl: defaultAvatarUrl,
      nickname: "微信用户",
      isLogin: app.globalData.isLogin
  },

    //下拉刷新函数
    onPullDownRefresh: function () {
        // 自动调用停止下拉刷新
        wx.stopPullDownRefresh();
    },

  //页面加载时触发的事件
  onLoad: function (options) {
    console.log("GisLogin:"+app.globalData.isLogin)
    if(app.globalData.isLogin === true) {
      this.setData({
        avatarUrl: options.avatarUrl,
        nickname: options.nickname,
        isLogin: app.globalData.isLogin
      })
    }
  },

  login(){
    wx.navigateTo({
        url: '/pages/login/login',
    })
  },

  onLogout(){
    var that = this;
    if(app.globalData.isLogin === false){
        wx.showToast({
            title: '您还未登录',
            icon: 'none',
            duration: 2000
        })
        return
    }
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success (res) {
        if (res.confirm) {
          app.globalData.userInfo = null
          app.globalData.isLogin = false
          that.setData({
            avatarUrl: defaultAvatarUrl,
            nickname: "",
            isLogin: app.globalData.isLogin
          })
          //清除缓存
          wx.clearStorage()
            console.log("token:"+wx.getStorageSync('token'))
            console.log("isLogin:"+wx.getStorageSync('isLogin'))
        } else if (res.cancel) {
            return;
        }
      }
    })
  }
})
