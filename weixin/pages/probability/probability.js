Page({
    data: {
        province: '',
        subjectsFirst: '',
        ranking: '',
        school: '',
        probability: '',
        major: '',
        majors: {},
        isShow: false
    },

    //下拉刷新函数
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
    },

    onInputSchool: function (e) {
        this.setData({
            school: e.detail.value
        })
    },

    onInputRanking: function (e) {
        this.setData({
            ranking: e.detail.value
        })
    },

    submit: function (e) {
        const province = this.data.province;
        const subjectsFirst = this.data.subjectsFirst;
        const ranking = this.data.ranking;
        const school = this.data.school;
        console.log(province, subjectsFirst, ranking, school);
        if (province=== '' || subjectsFirst === '' || ranking === '' || school === '') {
            wx.showToast({
                title: '请填写完整信息',
                icon: 'none',
                duration: 2000
            })
        } else {
            this.getData();
        }
    },

    calculateProbability() {
        let predictedRanking = this.data.majors.rank24;
        if (predictedRanking === '' || predictedRanking === null) {
            predictedRanking = this.data.majors.rank22;
        }
        let yourRanking = this.data.ranking;
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
        probability = probability.toFixed(2);
        this.setData({
            probability: probability
        })
    },

    getData(){
        let that = this;
        const school = encodeURIComponent(this.data.school);
        const subjectsFirst = encodeURIComponent(this.data.subjectsFirst);
        const url = 'http://114.132.41.159:8080/getScoreMinRank' +
            '?school='+school
            +'&subjectsFirst='+subjectsFirst;
        console.log(url);
        wx.cloud.callFunction({
            name: 'getData', //云函数名称
            data: {
                url: url,
                token: wx.getStorageSync('token')
            }
        }).then( (res)=>{
            console.log(res);
            var result = JSON.parse(res.result);
            console.log(result)
            if(result.code === 1){
                that.setData({
                    majors: result.data,
                    major: result.data.major,
                    isShow: true
                })
                that.calculateProbability();
            }else if(result.code === 0){
                wx.showToast({
                    title: '未找到该学校',
                    duration: 2000
                });
                wx.hideLoading();
            }
            else{
                wx.showToast({
                    title: '服务器错误',
                    duration: 1000
                });
                wx.hideLoading();
            }
            wx.hideLoading();

        }).catch( (res)=>{
            console.log(res);
            wx.showToast({
                title: '服务器断开',
                duration: 2000
            });
            wx.hideLoading();
        })
    },

    //页面加载时触发的事件
    onLoad: function (options) {
        console.log(options);
        const province = options.province;
        const subjectsFirst = options.subjectsFirst;
        this.setData({
            province: province,
            subjectsFirst: subjectsFirst
        })
    }
})
