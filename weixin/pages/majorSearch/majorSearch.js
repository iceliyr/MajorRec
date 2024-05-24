Page({
    data: {
        currentPage: 'sort',
        levels: ['本科', '专科'],
        level: '本科',
        firsts1: ['工学', '理学','医学', '文学', '历史学', '哲学', '农学', '管理学', '艺术学'],
        firsts2: ['农林牧渔大类','资源环境与安全大类','能源动力与材料大类','土木建筑大类','水利大类',
            '装备制造大类','生物与化工大类','轻工纺织大类','食品药品与粮食大类','交通运输大类',
            '电子与信息大类','医药卫生大类','财经商贸大类','旅游大类', '文化艺术大类','新闻传播大类',
            '教育与体育大类','公安与司法大类','公共管理与服务大类'],
        first: '工学',
        seconds: [],
        second: "计算机类",
        majors: [],
        searchResults: [],
        keyword:"",
    },

    //下拉刷新函数
    onPullDownRefresh: function () {
        // 自动调用停止下拉刷新
        wx.stopPullDownRefresh();
    },

    bindChange(e) {
        const val = e.detail.value;
        console.log(val)
        this.setData({
            level: this.data.levels[val[0]],
        })
        if (this.data.level==='本科') {
            this.setData({
                first: this.data.firsts1[val[1]],
            })
        }
        else {
            this.setData({
                first: this.data.firsts2[val[1]],
            })
        }
        this.getFirstMajors(val[2]);
        // this.getMajors();
    },

    toSort() {
        this.setData({
            currentPage: 'sort',
        })
    },

    toSearch() {
        this.setData({
            currentPage: 'search',
        })
    },

    clearKeyword(){
      console.log("clear")
        this.setData({
            searchResults: ""
        })
    },

    // 监听搜索框输入事件，确定搜索关键词
    onInputChange(event) {
        const keyword = event.detail;
            this.setData({
                keyword: keyword,
            });
        if (this.data.keyword!=="") {
            this.getSearchMajors();
        }
        else {
            this.setData({
                searchResults: ""
            })
        }
    },

    // 监听搜索按钮点击事件，点击搜索
    onSearch() {
        const keyword = this.data.keyword;
        if(keyword!==""){
            this.getSearchMajors();
        }
    },

    onLoad() {
        this.getFirstMajors(0);
        // this.getSearchMajors()
        // this.getMajors()
    },

    //发起网络请求
    getFirstMajors(n){
        let that = this
        let level = 1
        if (this.data.level === '本科') { level = 1 }
        else { level = 2 }
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        //调用云函数
        const first = encodeURIComponent(this.data.first);
        wx.cloud.callFunction({
            name: 'getData', //云函数名称
            data: {
                url: 'http://114.132.41.159:8080/majorFirst?level='+level+'&category='+first,
                token: wx.getStorageSync('token')
            },
            hearder: {
                'content-type': 'application/json' // 默认值
            }
        }).then( (res)=>{
            console.log('res1:'+res.result);
            var result = JSON.parse(res.result);
            console.log(result)
            if(result.code === 1){
                that.setData({
                    seconds: result.data,
                    second: result.data[n],
                })
                that.getMajors();
            }else{
                wx.showToast({
                    title: '服务器错误',
                    duration: 1000
                });
                wx.hideLoading();
            }
            wx.hideLoading();

        }).catch( (res)=>{
            console.log('err1:'+res);
            wx.showToast({
                title: '服务器断开',
                duration: 2000
            });
            wx.hideLoading();
        })
    },

    getMajors: function () {
        var that = this
        var level = 1
        if (this.data.level === '本科') { level = 1 }
        else { level = 2 }
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        //调用云函数
        var that = this;
        const first = encodeURIComponent(this.data.first);
        const second = encodeURIComponent(this.data.second);
        console.log('http://114.132.41.159:8080/majorSecond?level='+level+'&category='+first+'&firstSubject='+second)
        wx.cloud.callFunction({
            name: 'getData', //云函数名称
            data: {
                url: 'http://114.132.41.159:8080/majorSecond?level='+level+'&category='+first+'&firstSubject='+second,
                token: wx.getStorageSync('token')
            }
        }).then( (res)=>{
            console.log('res2:'+res.result);
            var result = JSON.parse(res.result);
            console.log(result)
            if(result.code === 1){
                that.setData({
                    majors: result.data
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
            console.log('err2:'+res);
            wx.showToast({
                title: '服务器断开',
                duration: 2000
            });
            wx.hideLoading();
        })
    },

    //搜索结果
    getSearchMajors: function () {
        var that = this
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        //调用云函数
        var that = this;
        const keyword = encodeURIComponent(this.data.keyword);
        wx.cloud.callFunction({
            name: 'getData', //云函数名称
            data: {
                url: 'http://114.132.41.159:8080/majors?secondSubject='+keyword,
                token: wx.getStorageSync('token')
            }
        }).then( (res)=>{
            var result = JSON.parse(res.result);
            console.log(result)
            if(result.code === 1){
                that.setData({
                    searchResults: result.data
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
            console.log('err3:'+res);
            wx.showToast({
                title: '服务器断开',
                duration: 2000
            });
            wx.hideLoading();
        })
    }
});