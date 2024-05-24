var app = getApp();
Page({
    data: {
        majors: [],
        ranking: '',
        score: ''
    },

    onPullDownRefresh: function () {
        // 自动调用停止下拉刷新
        wx.stopPullDownRefresh();
    },

    onDetail(event) {
        const major = event.currentTarget.dataset.major;
        const school = event.currentTarget.dataset.school;
        const probability = event.currentTarget.dataset.probability;
        console.log(event);
        wx.navigateTo({
            url: '/pages/recDetail/recDetail'
                + '?major=' + major
                + '&school='+school
                + '&probability='+probability
                + '&ranking='+this.data.ranking
                + '&score='+this.data.score
        })
    },

    onLoad(options) {
        this.setData({
            ranking: options.ranking,
            score: options.score
        })
        this.getMajors();
    },

    calculateProbability(predictedRanking) {
        if (predictedRanking === '' || predictedRanking === null) {
            return '';
        }else {
            const yourRanking = this.data.ranking;
            let probability = '';
            if (predictedRanking>yourRanking) { // 到达预测排名
                probability = (predictedRanking/yourRanking)/2 * 100;
            }else if (predictedRanking===yourRanking) {
                probability = 50.00;

            }else { // 排名不够
                probability = (predictedRanking / yourRanking)/2 * 100;
            }

            if (probability > 100) {
                probability = 99.99;
            }
            return probability.toFixed(2);
        }
    },

    getMajors() {
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        //调用云函数
        const that = this;
        const url = 'http://114.132.41.159:8080/findUserVolunteer'
        wx.cloud.callFunction({
            name: 'getData', //云函数名称
            data: {
                url: url,
                token: wx.getStorageSync('token')
            }
        }).then((res) => {
            var result = JSON.parse(res.result);
            console.log(result);
            if(result.code === 1){
                const newMajors = result.data.map(major => ({
                        ...major,
                        probability: this.calculateProbability(major.rank24)
                    })
                );
                that.setData({
                    majors: newMajors
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
            console.log(res);
            wx.showToast({
                title: '服务器断开',
                duration: 2000
            });
            wx.hideLoading();
        })
    },

    deleteTable(event) {
        const id = event.currentTarget.dataset.id;
        console.log(id);
        wx.showModal({
            title: '提示',
            content: '确定要删除该志愿吗？',
            success: (res) => {
                if (res.confirm) {
                    this.deleteMajor(id);
                } else if (res.cancel) {

                }
            }
        })
    },

    deleteMajor(id) {
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        //调用云函数
        const that = this;
        const url = 'http://114.132.41.159:8080/deleteUserVolunteer?id='+id
        wx.cloud.callFunction({
            name: 'getData', //云函数名称
            data: {
                url: url,
                token: wx.getStorageSync('token')
            }
        }).then((res) => {
            var result = JSON.parse(res.result);
            if(result.code === 1){
                wx.showToast({
                    title: '已移除',
                    icon: 'none',
                    duration: 1000
                })
                that.getMajors();
            }else{
                wx.showToast({
                    title: '服务器错误',
                    duration: 1000
                });
                wx.hideLoading();
            }
            // wx.hideLoading();
        }).catch((res) => {
            console.log(res);
            wx.showToast({
                title: '服务器断开',
                duration: 2000
            });
            wx.hideLoading();
        })
    }
})