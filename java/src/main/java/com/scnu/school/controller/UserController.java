package com.scnu.school.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.scnu.school.pojo.SchoolMessageAndUserVolunteer;
import com.scnu.school.pojo.User;
import com.scnu.school.pojo.UserVolunteer;
import com.scnu.school.service.UserService;
import com.scnu.school.utils.JwtUtils;
import com.scnu.school.utils.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;


@Slf4j
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/login")
    public Result userLogin(@RequestParam(value = "code", required = false) String code) {

        // 构建请求参数
        String appid = "wx86a65623b56beef3"; // 小程序的 AppID
        String secret = "e50ca570ee64e3d147f999b22c8b0531"; // 小程序的 AppSecret
        String grant_type = "authorization_code";
        String url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secret + "&js_code=" + code + "&grant_type=" + grant_type;

        // 发送 HTTP 请求
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);

        // 解析返回结果，获取 openid
        JSONObject result = JSON.parseObject(response);
        String openid = result.getString("openid");


        // 返回 openid
        if (openid == null) {
            return Result.error("登录失败，请重新登录");
        } else {

            //查询openid是否在表内
            if(userService.userExits(openid)==0){
                userService.addUser(openid);
            }

            String jwt = JwtUtils.generateJwt(openid);
            return Result.success(jwt);
        }

    }

    @RequestMapping("/addUser")
    public Result addUser(HttpServletRequest request, User user){
        String openid = (String) request.getAttribute("openid");
        user.setOpenid(openid);
        log.info(user.toString());
       return userService.updateUser(user);
    }

    @RequestMapping("/findUser")
    public Result findUser(HttpServletRequest request){
        String openid = (String) request.getAttribute("openid");
//        openid="okz6E6-goLZ6Vy2zobca8W7qTfAs";
        return Result.success(userService.findUser(openid));
    }

    @RequestMapping("/addUserVolunteer")
    public Result addVolunteer(HttpServletRequest request, UserVolunteer userVolunteer){
        String openid = (String) request.getAttribute("openid");
        log.info("增加用户志愿表："+userVolunteer);
        userVolunteer.setOpenid(openid);
        return userService.addVolunteer(userVolunteer);
    }

    @RequestMapping("/deleteUserVolunteer")
    public Result deleteVolunteer(HttpServletRequest request,Integer id){
        String openid = (String) request.getAttribute("openid");
        log.info("删除用户志愿表："+id);
        return userService.deleteVolunteer(openid,id);
    }

    @RequestMapping("/updateUserVolunteer")
    public Result updateVolunteer(HttpServletRequest request,UserVolunteer userVolunteer){
        String openid = (String) request.getAttribute("openid");
        userVolunteer.setOpenid(openid);
        log.info("修改用户志愿表："+userVolunteer);
        return userService.updateVolunteer(userVolunteer);
    }

    @RequestMapping("/findUserVolunteer")
    public Result findVolunteer(HttpServletRequest request){
        String openid = (String) request.getAttribute("openid");
        ArrayList<SchoolMessageAndUserVolunteer> arrayList= (ArrayList<SchoolMessageAndUserVolunteer>) userService.findVolunteer(openid);
        return Result.success(arrayList);
    }
}
