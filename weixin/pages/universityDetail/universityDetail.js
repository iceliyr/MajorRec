Page({
    data: {
        school: "",
        province: "",
        city: "",
        level: "",
        message: "",
        image: "",
        majors: [],
    },

    //下拉刷新函数
    onPullDownRefresh: function () {
        // 自动调用停止下拉刷新
        wx.stopPullDownRefresh();
    },

    onLoad: function(options) {
        // 获取上一个页面传递的参数
        const school = options.school;
        this.setData({
            school: school
        });
        this.getSchoolDetail();
        this.getMajorBySchool();
    },

    getMajorBySchool: function () {
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        //调用云函数
        const that = this;
        const school = encodeURIComponent(this.data.school);
        wx.cloud.callFunction({
            name: 'getData', //云函数名称
            data: {
                url: 'http://114.132.41.159:8080/getRankBySchool?school='+school,
                token: wx.getStorageSync('token')
            }
        }).then((res) => {
            var result = JSON.parse(res.result);
            if(result.code === 1){
                that.setData({
                    majors: result.data
                })
                console.log(result.data);
            }else{
                wx.showToast({
                    title: '服务器错误',
                    duration: 1000
                });
                wx.hideLoading();
            }
            wx.hideLoading();
        }).catch((res) => {
            wx.showToast({
                title: '服务器断开',
                duration: 2000
            });
            wx.hideLoading();
        })
    },

    getSchoolDetail: function () {
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        //调用云函数
        const that = this;
        const school = encodeURIComponent(this.data.school);

        wx.cloud.callFunction({
            name: 'getData', //云函数名称
            data: {
                url: 'http://114.132.41.159:8080/getSchoolMessageBySchool?school='+school,
                token: wx.getStorageSync('token')
            },
            timeout: 10000
        }).then((res) => {
            var result = JSON.parse(res.result);
            console.log(result.data);
            if(result.code === 1){
                that.setData({
                    province: result.data.province,
                    city: result.data.city,
                    level: result.data.level,
                    message: result.data.message,
                    image: result.data.image
                })
            }else{
                wx.showToast({
                    title: '服务器错误',
                    duration: 1000
                });
                wx.hideLoading();
            }
            wx.hideLoading();
        }).catch((res) => {
            wx.showToast({
                title: '服务器断开',
                duration: 2000
            });
            wx.hideLoading();
        })
    },
});
