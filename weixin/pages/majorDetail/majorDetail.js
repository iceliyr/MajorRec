var app = getApp();
Page({
    data: {
        major: '',
        level: '',
        introduction: '',
        course: '',
        employmentDirection: '',
        universities: [],
        option: '2020',
    },

    //下拉刷新函数
    onPullDownRefresh: function () {
        // 自动调用停止下拉刷新
        wx.stopPullDownRefresh();
    },

    onLoad(options) {
        // 接收参数
        this.setData({
            major: options.major,
            level: options.level
        })
        if (this.data.level === '本科') {
            this.setData({
                level: 1
            })
        }
        if (this.data.level === '专科') {
            this.setData({
                level: 2
            })
        }
        this.getUniversitiesByMajor();
        this.getMajorDetail();
    },

    getUniversitiesByMajor: function () {
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        //调用云函数
        const that = this;
        const major = encodeURIComponent(this.data.major);
        wx.cloud.callFunction({
            name: 'getData', //云函数名称
            data: {
                url: 'http://114.132.41.159:8080/getRankByMajor?major='+major,
                token: wx.getStorageSync('token')
            }
        }).then((res) => {
            var result = JSON.parse(res.result);
            if(result.code === 1){
                that.setData({
                    universities: result.data
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

    getMajorDetail: function () {
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        //调用云函数
        const that = this;
        const major = encodeURIComponent(this.data.major);
        const level = this.data.level;

        wx.cloud.callFunction({
            name: 'getData', //云函数名称
            data: {
                url: 'http://114.132.41.159:8080/getMajorsBySecondSubject?level='+level+'&secondSubject='+major,
                token: wx.getStorageSync('token')
            },
            timeout: 10000
        }).then((res) => {
            var result = JSON.parse(res.result);
            console.log(result.data);
            if(result.code === 1){
                that.setData({
                    introduction: result.data[0].introduction,
                    course: result.data[0].course,
                    employmentDirection: result.data[0].employmentDirection
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

    sortByRanking: function (event) {
        const option = event.currentTarget.dataset.option;
        this.setData({
            option: option
        })
        var universities = this.data.universities;
        var sortPattern = this.data.option;
        if (sortPattern === "2020") {
            universities.sort(function (a, b) {
                if (a.rank20 === 0 || a.rank20 == null)
                    return 1;
                if (b.rank20 === 0 || b.rank20 == null)
                    return -1;
                return a.rank20 - b.rank20;
            });
            this.setData({
                universities: universities
            })
        } else if (sortPattern === "2021") {
            universities.sort(function (a, b) {
                if (a.rank21 === 0 || a.rank21 == null)
                    return 1;
                if (b.rank21 === 0 || b.rank21 == null)
                    return -1;
                return a.rank21 - b.rank21;
            });
            this.setData({
                universities: universities
            })
        } else if (sortPattern === "2022") {
            universities.sort(function (a, b) {
                if (a.rank22 === 0 || a.rank22 == null)
                    return 1;
                if (b.rank22 === 0 || b.rank22 == null)
                    return -1;
                return a.rank22 - b.rank22;
            });
            this.setData({
                universities: universities
            })
        } else if (sortPattern === "2023") {
            universities.sort(function (a, b) {
                if (a.rank23 === 0 || a.rank23 == null)
                    return 1;
                if (b.rank23 === 0 || b.rank23 == null)
                    return -1;
                return a.rank23 - b.rank23;
            });
            this.setData({
                universities: universities
            })
        } else if (sortPattern === "2024") {
            universities.sort(function (a, b) {
                if (a.rank24 === 0 || a.rank24 == null)
                    return 1;
                if (b.rank24 === 0 || b.rank24 == null)
                    return -1;
                return a.rank24 - b.rank24;
            });
            this.setData({
                universities: universities
            })
        }
        // console.log(this.data.universities);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})