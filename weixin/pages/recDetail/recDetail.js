Page({
    data: {
        major: '',
        school: '',
        probability: '',
        ranking: '',
        score: '',
        detail: {}
    },

    onLoad(options) {
        this.setData({
            major: options.major,
            school: options.school,
            probability: options.probability,
            ranking: options.ranking,
            score: options.score
        })
        // console.log(options.probability);
        this.getDetail();
    },

    getDetail() {
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        //调用云函数
        const that = this;
        const major = encodeURIComponent(this.data.major);
        const school = encodeURIComponent(this.data.school);
        const url = 'http://114.132.41.159:8080/getRank?school='+school
            +'&major='+major

        wx.cloud.callFunction({
            name: 'getData', //云函数名称
            data: {
                url: url,
                token: wx.getStorageSync('token')
            }
        }).then((res) => {
            var result = JSON.parse(res.result);
            // console.log(result);
            if(result.code === 1){
                that.setData({
                    detail: result.data
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
        wx.stopPullDownRefresh();
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