package com.scnu.school.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.scnu.school.pojo.Score;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ScoreMapper extends BaseMapper<Score> {

    @Select("select * from score,school_message where score.school=school_message.school and score.school=#{school} and major=#{major}")
    public List<Score> getRank(String school, String major);

    @Select("SELECT * FROM score WHERE rank22=(SELECT MAX(rank22) FROM score where school=#{school}and subjects_first=#{subjectsFirst}) and school=#{school}and subjects_first=#{subjectsFirst}")
    public List<Score> getScoreByMinRank22(String school,String subjectsFirst);
    public Integer getScoreToTalNum(Score score, Integer ranking1,Integer ranking2);
    public List<Score> getScore(Integer pageNo, Integer pageSize, Score score,Integer ranking1,Integer ranking2);

    @Select("select * from score,school_message where score.school=school_message.school and score.school=#{school}")

    public List<Score> getRankBySchool(String school);

    @Select("select * from score,school_message where score.school=school_message.school and major=#{major}")
    public List<Score> getRankByMajor(String major);
}
