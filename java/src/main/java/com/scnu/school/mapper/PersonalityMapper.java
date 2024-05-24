package com.scnu.school.mapper;

import com.scnu.school.pojo.Mbti;
import com.scnu.school.pojo.Personality;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.ArrayList;

@Mapper
public interface PersonalityMapper {
    @Select("select * from personality;")
    ArrayList<Personality> getAll();

    @Select("select major from per_major where personality=#{personality};")
    ArrayList<String> per_major(String personality);

    @Select("select * from mbti where personality=#{personality};")
    ArrayList<Mbti> mbti(String personality);
}
