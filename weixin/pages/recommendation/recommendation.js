import { areaList } from '@vant/area-data';
var app = getApp();
Page({
    data: {
        firstSubject: '',
        secondSubject: '',
        thirdSubject: '',
        mbti: '',
        mark: 0,
        ranking: 0,
        province: '',
        option: '1',
        majors: [],
        cityShow: false,
        typeShow: false,
        types: ['全部', '本科', '专科'],
        selectedProvince: '全部',
        selectedCity: '全部',
        selectedType: '全部',
        loadResults: [],
        areaList: areaList,
        page: 1, // 当前页数
        isLastPage: false, // 是否最后一页
    },

    //下拉刷新函数
    onPullDownRefresh: function () {
        // 自动调用停止下拉刷新
        this.setData({
            page: 1,
            majors: [],
            loadResults: [],
            isLastPage: false
        })
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        this.onLoad();
        wx.stopPullDownRefresh();
    },

    onReachBottom: function () {
        // console.log('page:'+this.data.page+'totalNum:'+this.data.totalNum);
        if (!this.data.isLastPage) { // 如果还有下一页数据
            this.getRecommendation()
        } else {
            wx.showToast({
                title: '没有更多数据了',
                icon: 'none'
            });
        }
    },

    onLoad(options) {
        let areaList = this.data.areaList;
        areaList.province_list[100000] = '全部';
        for (let i in areaList.province_list) {
            let code = parseInt(i)+99;
            areaList.city_list[code] = '全部';
        }
        this.setData({
            areaList: areaList
        })
        if(app.globalData.isLogin === true) {
            wx.showLoading({
                title: '加载中',
                mask: true
            });
            this.getUserInfo();
        }
    },

    onDetail(event) {
        const major = event.currentTarget.dataset.major;
        const school = event.currentTarget.dataset.school;
        const probability = event.currentTarget.dataset.probability;
        // console.log(event);
        wx.navigateTo({
            url: '/pages/recDetail/recDetail'
                + '?major=' + major
                + '&school='+school
                + '&probability='+probability
                + '&ranking='+this.data.ranking
                + '&score='+this.data.mark
        })
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
                            url: '/pages/user/user',
                        })
                    }
                }
            })
        } else {
            console.log(app.globalData.isLogin);
            console.log(app.globalData.score, app.globalData.ranking);
            if (app.globalData.score === null || app.globalData.ranking === null
            || app.globalData.score==='' || app.globalData.ranking==='') {
                wx.showModal({
                    title: '提示',
                    content: '请先正确填写分数与排名',
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
        }
    },

    joinTable(event) {
        const major = encodeURIComponent(event.currentTarget.dataset.major);
        const school = encodeURIComponent(event.currentTarget.dataset.school);
        const rank24 = event.currentTarget.dataset.rank24;
        const rank22 = event.currentTarget.dataset.rank22;
        let rank = rank24;
        if (rank24 === null || rank24 === '') {
            rank = rank22;
        }
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        //调用云函数
        const that = this;
        const url = 'http://114.132.41.159:8080/addUserVolunteer' +
            '?school='+school+
            '&major='+major+
            '&rank24='+rank
        console.log(url);
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
                wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 1000
                });
            }else if(result.code === 0){
                wx.showToast({
                    title: '请勿重复添加',
                    icon: 'none',
                    duration: 1000
                });
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
    },

    // 确定冲稳保筛选
    optionChange(event) {
        const option = event.currentTarget.dataset.option;
        this.setData({
            option: option,
            page: 1,
            majors: [],
            loadResults: [],
            isLastPage: false
        })
        console.log(option);
        this.getRecommendation();
    },

    // 确定院校城市筛选
    onCityChange(event) {
        this.setData({
            page: 1,
            majors: [],
            loadResults: [],
            isLastPage: false
        })
        this.getRecommendation();
    },

    // 确定院校类型筛选
    onTypeChange(event) {
        this.setData({
            page: 1,
            majors: [],
            loadResults: [],
            isLastPage: false
        })
        this.getRecommendation();
    },

    getUserInfo() {
        wx.cloud.callFunction({
            name: 'getData', //云函数名称
            data: {
                url: 'http://114.132.41.159:8080/findUser?openid=' + wx.getStorageSync('openid'),
                token: wx.getStorageSync('token')
            }
        }).then((res) => {
            var result = JSON.parse(res.result);
            // console.log(result);
            if (result.code === 1) {
                this.setData({
                    firstSubject: result.data.firstSubject,
                    secondSubject: result.data.secondSubject,
                    thirdSubject: result.data.thirdSubject,
                    mbti: result.data.mbti,
                    mark: result.data.mark,
                    ranking: result.data.ranking,
                    province: result.data.province,
                })
                this.onReachBottom();
            } else {
                wx.showToast({
                    title: '服务器错误',
                    duration: 1000
                });
            }
        }).catch((res) => {
            // console.log(res);
            wx.showToast({
                title: '服务器断开',
                duration: 2000
            });
        })
    },

    calculateProbability(predictedRanking,rank22) {
        if (predictedRanking === null || predictedRanking === '') {
            predictedRanking = rank22;
        }
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
    },

    getRecommendation(){
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        var that = this;
        var subjectsFirst = encodeURIComponent(this.data.firstSubject);
        var subjectsSecond = encodeURIComponent(this.data.secondSubject);
        var subjectsThird = encodeURIComponent(this.data.thirdSubject);
        var ranking = this.data.ranking;
        var mark = this.data.mark;
        var mbti = this.data.mbti;

        var province =this.data.selectedProvince;
        if (province === '全部'){
            province = '';
        } else {
            province = encodeURIComponent(province);
        }
        var city = this.data.selectedCity;
        if (city === '全部'){
            city = '';
        } else {
            city = encodeURIComponent(city);
        }
        var type = this.data.selectedType;
        if (type === '全部'){
            type = '';
        } else {
            type = encodeURIComponent(type+'批');
        }

        var page = this.data.page;

        const url = 'http://114.132.41.159:8080/getScore?'
            +'current='+page
            +'&subjectsFirst='+subjectsFirst
            +'&province='+province
            +'&city='+city
            +'&batch='+type
            +'&mbti='+mbti
            +'&size=10'
            +'&ranking='+ranking
            +'&option='+this.data.option

        console.log(url);
        wx.cloud.callFunction({
            name: 'getData', //云函数名称
            data: {
                url: url,
                token: wx.getStorageSync('token')
            },
        }).then( (res)=>{
            var result = JSON.parse(res.result);
            console.log(result);
            if (result.code === 1) {
                const oldMajors = this.data.majors;
                const newMajors = oldMajors.concat(
                    result.data.list.map(major => ({
                        ...major,
                        probability: this.calculateProbability(major.rank24,major.rank22)
                    }))
                );
                let filteredMajors = [];
                if (this.data.option === '1') {
                    filteredMajors = newMajors.filter(major =>
                        major.probability >= 20
                        && major.probability < 50
                    );
                } else if (this.data.option === '2') {
                    filteredMajors = newMajors.filter(major =>
                        major.probability >= 50
                        && major.probability < 90
                    );
                } else if (this.data.option === '3') {
                    filteredMajors = newMajors.filter(major =>
                        major.probability >= 90
                    );
                }
                console.log(filteredMajors);

                this.setData({
                    majors: filteredMajors,
                    loadResults: filteredMajors,
                    totalNum: result.data.total,
                    page: result.data.current + 1
                });

            } else if(result.code === 0){
                this.setData({
                    isLastPage: true
                })
                wx.showToast({
                    title: '没有更多数据了',
                    icon: 'none'
                });
            } else{
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

    onCityShow() {
        this.setData({ cityShow: true });
    },
    onTypeShow() {
        this.setData({ typeShow: true });
    },
    onCityClose() {
        this.setData({ cityShow: false });
    },
    onTypeClose() {
        this.setData({ typeShow: false });
    },

    // 监听院校城市筛选变化
    onCityConfirm(event) {
        const { values } = event.detail;
        this.setData({
            cityShow: false,
            selectedProvince: values[0].name,
            selectedCity: values[1].name
        });
        this.onCityChange();
    },

    // 监听院校类型筛选变化
    onTypeConfirm(event) {
        const { value } = event.detail;
        this.setData({
            typeShow: false,
            selectedType: value
        });
        this.onTypeChange();
    },
});