import { areaList } from '@vant/area-data';
var app = getApp();
Page({
  data: {
    areaList,
    selectedProvince: '',
    score: '',
    ranking: '',
    selectedSubjects1: "", //首选科目
    selectedSubjects2: [], //次选科目
    subjects1: ['物理', '历史'],
    subjects2: ['化学', '生物', '地理', '政治'],
    functions: [
      { name: '查大学', iconUrl: '../../image/universitySearch.png', url: '/pages/universitySearch/universitySearch' },
      { name: '查专业', iconUrl: '../../image/major.png', url: '/pages/majorSearch/majorSearch' },
      { name: '志愿表', iconUrl: '../../image/table.png', url: '/pages/volunteer/volunteer' },
      { name: 'MBTI测试', iconUrl: '../../image/mbti.png', url: '/pages/personality/personality' },
      { name: '测概率', iconUrl: '../../image/p.png', url: '/pages/probability/probability'},
    ],
    //调用弹出框
    provinceShow: false, 
    subjectShow1: false,
    subjectShow2: false,
    arrowdirection: "", //箭头方向
    arrowdirection1: "", //箭头方向
    arrowdirection2: "", //箭头方向
  },
    //下拉刷新函数
    onPullDownRefresh: function () {
        // 自动调用停止下拉刷新
        wx.stopPullDownRefresh();
    },

    onShow() {
      if (app.globalData.isLogin === false){
          wx.showModal({
            title: '提示',
            content: '请先登录',
            showCancel: false,
            success (res) {
                if (res.confirm) {
                    wx.switchTab({
                    url: '/pages/user/user'
                    })
                }
            }
          })
      }
    },
    
    onLoad() {
      if(app.globalData.isLogin === true) {
          wx.showLoading({
              title: '加载中',
              mask: true
          });
          //调用云函数
          var that = this;
          wx.cloud.callFunction({
              name: 'getData', //云函数名称
              data: {
                  url: 'http://114.132.41.159:8080/findUser?openid=' + wx.getStorageSync('openid'),
                  token: wx.getStorageSync('token')
              }
          }).then((res) => {
              var result = JSON.parse(res.result);
              console.log(result)
              if (result.code === 1) {
                  that.setData({
                      score: result.data.mark,
                      ranking: result.data.ranking,
                      selectedProvince: result.data.province,
                      selectedSubjects1: [result.data.firstSubject],
                      selectedSubjects2: [result.data.secondSubject, result.data.thirdSubject]
                  })
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
      }
    },

    onGridItemClick: function (event) {
        if (app.globalData.score === null || app.globalData.ranking === null) {
            wx.showModal({
                title: '提示',
                content: '请先填写个人信息',
                showCancel: false,
                success (res) {
                    if (res.confirm) {
                        wx.switchTab({
                            url: '/pages/home/home',
                        })
                    }
                }
            })
        }
        const index = event.currentTarget.dataset.index;
        var url = this.data.functions[index].url;
        if (index === 2) {
            url = url + '?ranking=' + this.data.ranking + '&score=' + this.data.score;
        }
        if (index === 4) {
            url = url + '?province=' + this.data.selectedProvince + '&subjectsFirst=' + this.data.selectedSubjects1;
        }
        wx.navigateTo({
            url: url
        });
    },

    //省份选择
    onProvinceChange: function(event) {
        this.setData({
          provinceShow : true,
          arrowdirection: "down"
        })
    },
    onProvinceClose(){
        this.setData({
          provinceShow : false,
          arrowdirection: ""
        })
    },
    onConfirm: function(event) {
        this.setData({
            selectedProvince: event.detail.values[0].name,
            arrowdirection: "",
            provinceShow : false
        });
    },

    //选科选择
    onSubjectChange1: function(event) {
      if(this.data.subjectShow1===false){
          this.setData({
              subjectShow1 : true,
              arrowdirection1: "down"
          })
      }
      else if(this.data.subjectShow1===true){
          this.setData({
              subjectShow1 : false,
              arrowdirection1: ""
          })
      }
    },
    onChange1(event) {
        this.setData({
          selectedSubjects1: event.detail,
          arrowdirection1: "",
        });
        if(this.data.selectedSubjects1.length === 1){
          this.setData({
            subjectShow1 : false
          })
        }
    },
    onSubjectChange2: function(event) {
        if(this.data.subjectShow2===false){
            this.setData({
                subjectShow2 : true,
                arrowdirection2: "down"
            })
        }
        else if(this.data.subjectShow2===true){
            this.setData({
                subjectShow2 : false,
                arrowdirection2: ""
            })
        }
    },
    onChange2(event) {
        this.setData({
          selectedSubjects2: event.detail,
          arrowdirection2: "",
        });
        if(this.data.selectedSubjects2.length === 2){
          this.setData({
            subjectShow2 : false
          })
        }
    },

    //排名输入
    onRankingInput: function (event) {
        const ranking = event.detail
        console.log(ranking);
        this.setData({
            ranking: ranking,
        });
    },

    //分数输入
    onScoreInput: function (event) {
        const score = event.detail;
        console.log(score);
        this.setData({
            score: score,
        });
    },

    //保存
    saveData: function (event) {
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        //调用云函数
        var that = this;
        const score = that.data.score;
        const ranking = that.data.ranking;
        const selectedProvince = encodeURIComponent(that.data.selectedProvince);
        const selectedSubjects1 = encodeURIComponent(that.data.selectedSubjects1);
        const selectedSubjects2 = encodeURIComponent(that.data.selectedSubjects2[0]);
        const selectedSubjects3 = encodeURIComponent(that.data.selectedSubjects2[1]);
        if (score!=='' && ranking!=='' && selectedProvince!==''
            && selectedSubjects1!=='' && selectedSubjects2!==''
            && selectedSubjects3!=='') {
            // console.log("score: " + score+ " ranking: " + ranking + " selectedProvince: " + selectedProvince);
            wx.cloud.callFunction({
                name: 'getData', //云函数名称
                data: {
                    url: 'http://114.132.41.159:8080/addUser?mark=' + score + '&ranking=' + ranking
                        + '&province=' + selectedProvince
                        + '&firstSubject=' + selectedSubjects1
                        + '&secondSubject=' + selectedSubjects2
                        + '&thirdSubject=' + selectedSubjects3,
                    token: wx.getStorageSync('token')
                }
            }).then((res) => {
                app.globalData.score = score;
                app.globalData.ranking = ranking;
                wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 1000
                })
            }).catch((res) => {
                // console.log(res);
                wx.showToast({
                    title: '服务器断开',
                    duration: 2000
                });
                wx.hideLoading();
            })
        }
        else{
            wx.showToast({
                title: '请填写完整信息',
                duration: 2000
            });
        }
    },
});
