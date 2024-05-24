const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()

Page({
  data: {
    avatarUrl: defaultAvatarUrl,
    nickname: "微信用户",
    token: ''
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    this.setData({
      avatarUrl,
    })
  },

  inputConfirm(event){
    let nickname = event.detail.value
    // console.log("name:"+nickname)
    this.setData({
      nickname: nickname
    })
  },

  confirm() {
    const { avatarUrl, nickname } = this.data;
    var that = this;
    wx.login({
      success (res) {
        if (res.code) {
          wx.showLoading({
            title: '登录中',
            mask: true
          });
          //调用云函数
          wx.cloud.callFunction({
            name: 'login', //云函数名称
            data: {
              url: 'http://114.132.41.159:8080/login?code='+res.code,
            },
          }).then( (res)=>{
            var result = JSON.parse(res.result);
            console.log(result)
            if(result.code === 1){
              that.setData({
                token: result.data
              })
              //存入全局变量
              app.globalData.token = result.data
              app.globalData.isLogin = true
              that.getUserInfo();
              //存入缓存
              wx.setStorageSync('token', result.data)
              wx.setStorageSync('isLogin', true)
              wx.reLaunch({
                url: '/pages/user/user?avatarUrl='+avatarUrl+"&nickname="+nickname,
              })
            }else{
              wx.showToast({
                title: '服务器错误',
                duration: 1000
              });
              wx.hideLoading();
            }
            wx.hideLoading();

          }).catch( (res)=>{
            console.log(res)
            wx.showToast({
              title: '服务器断开',
              duration: 2000
            });
            wx.hideLoading();
          })
        }
      }
    })
  },

  getUserInfo() {
    wx.cloud.callFunction({
      name: 'getData', //云函数名称
      data: {
        url: 'http://114.132.41.159:8080/findUser?openid=' + app.globalData.openid,
        token: wx.getStorageSync('token')
      }
    }).then((res) => {
      var result = JSON.parse(res.result);
      console.log(result);
      if (result.code === 1) {
          app.globalData.score = result.data.mark;
          app.globalData.ranking = result.data.ranking;
          //存入缓存
          wx.setStorageSync('score', result.data.mark)
          wx.setStorageSync('ranking', result.data.ranking)
      } else {
        wx.showToast({
          title: '服务器错误',
          duration: 1000
        });
        wx.hideLoading();
      }
      wx.hideLoading();

    }).catch((res) => {
      // console.log(res);
      wx.showToast({
        title: '服务器断开',
        duration: 2000
      });
      wx.hideLoading();
    })
  },
})