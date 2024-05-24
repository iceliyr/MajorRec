package com.scnu.school.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.scnu.school.pojo.Major;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface MajorMapper extends BaseMapper<Major> {


    ArrayList<Major> majors(String second_subject);
    ArrayList<String> findFirstSubject(short level, String category);
    ArrayList<String> findSecondSubject(short level, String category,String first_subject);
    ArrayList<Major> findAll(short level, String category,String first_subject, String second_subject);
}
