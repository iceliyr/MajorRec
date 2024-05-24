// promise化API
import {promisifyAll} from 'miniprogram-api-promise'
const wxp = wx.p = {}
promisifyAll(wx, wxp)

App({
    globalData: {
        token: null,
        isLogin: false,
        score: '',
        ranking: '',
    },

    onLaunch() {
        //云环境
        wx.cloud.init({
           env: 'school-2g0fynkg40838bd4'
        })
    },
})
