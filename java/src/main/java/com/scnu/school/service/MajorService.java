package com.scnu.school.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.scnu.school.mapper.MajorMapper;
import com.scnu.school.pojo.Major;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MajorService extends ServiceImpl<MajorMapper, Major> {
    @Autowired
    private MajorMapper majorMapper;


    public ArrayList<Major> majors(String second_subject){
        QueryWrapper<Major> queryWrapper=new QueryWrapper<>();
        queryWrapper.like("second_subject",second_subject);
        ArrayList<Major> arrayList= (ArrayList<Major>) majorMapper.selectList(queryWrapper);
//        ArrayList<Major> arrayList=majorMapper.majors(second_subject);
//        System.out.println(arrayList);
        return arrayList;
    }
    public ArrayList<String> findFirstSubject(short level, String category){
        ArrayList<String> arrayList=majorMapper.findFirstSubject(level,category);

        return arrayList;
    }
    public ArrayList<String> findSecondSubject(short level,String category, String first_subject){
        ArrayList<String> arrayList=majorMapper.findSecondSubject(level,category,first_subject);
        return arrayList;
    }
    public ArrayList<Major> findAll(short level,String category, String first_subject,String second_subject){
        ArrayList<Major> arrayList=majorMapper.findAll(level,category,first_subject,second_subject);
        return arrayList;
    }

    public List<Major> getMajorsBySecond(Short level,String secondSubject) {
        QueryWrapper<Major> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("second_subject",secondSubject);
        queryWrapper.eq("level", level);
        return majorMapper.selectList(queryWrapper);
    }
}
