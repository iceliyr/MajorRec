package com.scnu.school.mapper;

import com.scnu.school.pojo.SchoolMessageAndUserVolunteer;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface SchoolMessageAndUserVolunteerMapper {
    @Select("select * from school_message,user_volunteer where school_message.school=user_volunteer.school and openid=#{openid}")
    public List<SchoolMessageAndUserVolunteer> findByOpenId(String openid);
}
