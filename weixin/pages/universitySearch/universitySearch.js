import { areaList } from '@vant/area-data';

Page({
    data: {
        areaList,
        keyword: '',
        types: ['全部', '本科', '专科'],
        selectedProvince: '全部',
        selectedCity: '全部',
        selectedType: '全部',
        loadResults: [],
        current: 1,
        isLastPage: false,
        cityShow: false,
        typeShow: false,
    },

    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
    },

    onLoad: function (options) {
        let areaList = this.data.areaList;
        areaList.province_list[100000] = '全部';
        for (let i in areaList.province_list) {
            let code = parseInt(i)+99;
            areaList.city_list[code] = '全部';
        }
        this.setData({
            areaList: areaList
        })
        this.getUniversities();
    },

    onReachBottom() {
        if (!this.data.isLastPage) {
            this.getUniversities();
        } else {
            wx.showToast({
                title: '没有更多数据了',
                icon: 'none'
            });
        }
    },

    onCityConfirm(event) {
        const { values } = event.detail;
        this.setData({
            cityShow: false,
            selectedProvince: values[0].name,
            selectedCity: values[1].name,
            current: 1,
            loadResults: [],
            isLastPage: false,
            keyword: ''
        });
        this.getUniversities();
    },

    onTypeConfirm(event) {
        const { value } = event.detail;
        console.log(value);
        this.setData({
            typeShow: false,
            selectedType: value,
            current: 1,
            loadResults: [],
            isLastPage: false,
            keyword: ''
        });
        this.getUniversities();
    },

    onInputChange(event) {
        const keyword = event.detail;
        this.setData({
            current: 1,
            loadResults: [],
            isLastPage: false,
            province: '全部',
            city: '全部',
            type: '全部',
            keyword: keyword,
        });
        this.searchUniversity();
    },

    onSearch() {
        this.setData({
            current: 1,
            loadResults: [],
            isLastPage: false,
            province: '全部',
            city: '全部',
            type: '全部'
        });
        if (this.data.keyword === '' || this.data.keyword === null) {
            wx.showToast({
                title: '请输入关键词',
                icon: 'none'
            });
            return;
        }
        this.searchUniversity();
    },

    searchUniversity(event) {
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        const that = this;
        const keyword = encodeURIComponent(this.data.keyword);
        let current = this.data.current;
        const url = 'http://114.132.41.159:8080/find'+
            '?school='+keyword+
            '&current='+current+
            '&size=10';
        console.log(url);
        wx.cloud.callFunction({
            name: 'getData',
            data: {
                url: url,
                token: wx.getStorageSync('token')
            },
        }).then( (res)=>{
            var result = JSON.parse(res.result);
            console.log(result)
            if(result.code === 1){
                const oldResults = that.data.loadResults;
                let newResults = oldResults.concat(result.data.list);
                that.setData({
                    loadResults: newResults,
                    current: result.data.current+1,
                })
            }else if(result.code === 0){
                that.setData({
                    isLastPage: true
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

    getUniversities () {
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        const that = this;
        const keyword = encodeURIComponent(this.data.keyword);
        let province = encodeURIComponent(this.data.selectedProvince);
        let city = encodeURIComponent(this.data.selectedCity);
        let type = encodeURIComponent(this.data.selectedType);
        if (this.data.selectedProvince === '全部') province = '';
        if (this.data.selectedCity === '全部') city = '';
        if (this.data.selectedType === '全部') type = '';
        let current = this.data.current;
        const url = 'http://114.132.41.159:8080/find'+
            '?province='+province+
            '&city='+city+
            '&level='+type+
            '&current='+current+
            '&size=10';
        console.log(current)
        console.log(url);
        wx.cloud.callFunction({
          name: 'getData',
          data: {
              url: url,
              token: wx.getStorageSync('token')
          },
        }).then( (res)=>{
            var result = JSON.parse(res.result);
            console.log(result)
            if(result.code === 1){
                const oldResults = that.data.loadResults;
                let newResults = oldResults.concat(result.data.list);
                that.setData({
                    loadResults: newResults,
                    current: result.data.current+1,
                })
            }else if(result.code === 0){
                that.setData({
                    isLastPage: true
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
});