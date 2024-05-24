package com.scnu.school.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.scnu.school.pojo.User;
import com.scnu.school.pojo.UserVolunteer;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.ArrayList;

@Mapper
public interface UserMapper extends BaseMapper<User> {

    @Select("select count(*) from user where openid=#{openid};")
    int userExits(String openid);
    @Select("SELECT mark, ranking, province, first_subject, second_subject, third_subject, mbti FROM user where openid=#{openid}")
    User findUser(String openid);

    @Insert("insert into user (openid) values (#{openid});")
    void addUser(String openid);

    void updateUser(User user);

    @Insert("INSERT INTO user_volunteer (openid,school, major,rank24) VALUES (#{openid},#{school},#{major},#{rank24})")
    void addVolunteer(UserVolunteer userVolunteer);

    @Delete("DELETE FROM user_volunteer WHERE openid=#{openid} AND id=#{id}")
    void deleteVolunteer(String openid, Integer id);

    void updateUserVolunteer(UserVolunteer userVolunteer);

    @Select("select * from user_volunteer where openid=#{openid};")
    ArrayList<UserVolunteer> findVolunteer(String openid);

}
