### 项目技术

JDK11、springboot2.7.15、mybatis-plus3.5.5.3、mysql8.0.31、jwt0.9.1、微信小程序 

### 演示视频

### 项目介绍

项目为微信小程序与java服务的前后端分离项目，项目主要是收集各个学校及其专业高考录取情况数据，并预测当年分数线，且提供专业推荐功能及性格测试功能

### 功能技术

（1）使用jwt进行验证登录，小程序发送请求后端，进行拦截查验，不通过重定向到登录界面，用户点击登录发送code到后端，后端通过code、APPID、AppSecret到微信验证平台，验证成功后将用户openid经过jwt加密后返回，每次小程序请求携带登录信息，在拦截器中解析openid获取用户信息，保存到HttpServletRequest。

（2）使用多表查询，在大学信息查询中，大学基础信息表通过schoolid连接到专业分数表，返回基础信息及院校分数信息

（3）分页查询，使用mybatus-plus分页查询，通过current、size参数，返回size大小且页码为current的页面。
