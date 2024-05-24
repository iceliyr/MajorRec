// 云函数入口文件
const cloud = require('wx-server-sdk')
//引入request-promise用于做网络请求
var rp = require('request-promise');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  let url = event.url;
  let token = event.token;
  if(url === null || url === undefined ){
      return 'URL不存在'
  }
  if (token === null || token === undefined) {
      return 'token不存在'
  }
  else{
    return rp({
      url: url,
      method: 'GET',
      headers: {
        'token': token
      }
    }).then( (res)=>{
        console.log(res)
      return res;
    }).catch( (err)=>{
      return err;
    })
  }
}
