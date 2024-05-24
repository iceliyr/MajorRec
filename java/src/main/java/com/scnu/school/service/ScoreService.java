package com.scnu.school.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.scnu.school.mapper.ScoreMapper;
import com.scnu.school.pojo.Score;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScoreService extends ServiceImpl<ScoreMapper, Score> {
    @Autowired
    private ScoreMapper scoreMapper;


    public List<Score> getRank(String school, String major) {
//        QueryWrapper<Score> queryWrapper=new QueryWrapper<>();
//        queryWrapper.eq("score.school",school);
//        queryWrapper.eq("score.major",major);
//        queryWrapper.eq("school_message.school","score.school");
//
//        return scoreMapper.selectList(queryWrapper);
        return scoreMapper.getRank(school,major);
    }

    public List<Score> getRankBySchool(String school) {
//        QueryWrapper<Score> queryWrapper=new QueryWrapper<>();
//        queryWrapper.eq("school",school);
//        return scoreMapper.selectList(queryWrapper);
        return scoreMapper.getRankBySchool(school);
    }

    public List<Score> getRankByMajor(String major) {
//        QueryWrapper<Score> queryWrapper=new QueryWrapper<>();
//        queryWrapper.eq("major",major);
//        return scoreMapper.selectList(queryWrapper);
        return scoreMapper.getRankByMajor(major);
    }

    public List<Score> getRankByLike(Integer pageNo, Integer pageSize, Score score,Integer ranking1,Integer ranking2) {
        System.out.println(score);
        return scoreMapper.getScore(pageNo,pageSize,score,ranking1,ranking2);
    }

}
