package com.scnu.school.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.scnu.school.mapper.SchoolMessageAndUserVolunteerMapper;
import com.scnu.school.mapper.UserMapper;
import com.scnu.school.pojo.SchoolMessageAndUserVolunteer;
import com.scnu.school.pojo.User;
import com.scnu.school.pojo.UserVolunteer;
import com.scnu.school.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService extends ServiceImpl<UserMapper, User> {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private SchoolMessageAndUserVolunteerMapper schoolMessageAndUserVolunteerMapper;

    public Integer userExits(String openid){
        return userMapper.userExits(openid);
    }

    public Result addUser(String openid){
        userMapper.addUser(openid);
        return Result.success("修改成功");
    }

    public Result updateUser(User user){
        userMapper.updateUser(user);
        return Result.success("修改成功");
    }

    public User findUser(String openid){
        return userMapper.findUser(openid);
    }




    public Result addVolunteer(UserVolunteer userVolunteer){
        userMapper.addVolunteer(userVolunteer);
        return Result.success("添加成功");
    }
    public Result deleteVolunteer(String openid, Integer id){
        userMapper.deleteVolunteer(openid,id);
        return Result.success("删除成功");
    }

    public Result updateVolunteer(UserVolunteer userVolunteer){
        userMapper.updateUserVolunteer(userVolunteer);
        return Result.success("修改成功");
    }

    public List<SchoolMessageAndUserVolunteer> findVolunteer(String openid){
        return schoolMessageAndUserVolunteerMapper.findByOpenId(openid);
    }
}
