package com.scnu.school.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.scnu.school.pojo.SchoolMessage;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface SchoolMapper extends BaseMapper<SchoolMessage> {

    //查找学校
    ArrayList<SchoolMessage> find(Integer current,Integer size,SchoolMessage schoolMessage);
    Integer findCount(SchoolMessage schoolMessage);

    //根据学校名字，返回学校基本信息
    SchoolMessage find_one(String school);

}
