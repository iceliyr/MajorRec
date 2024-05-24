package com.scnu.school.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.scnu.school.mapper.SchoolMapper;
import com.scnu.school.pojo.SchoolMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class SchoolService extends ServiceImpl<SchoolMapper,SchoolMessage> {
    @Autowired
    private SchoolMapper schoolMapper;

    public ArrayList<SchoolMessage> find(Integer current, Integer size,SchoolMessage schoolMessage){

        ArrayList<SchoolMessage> schoolMessageList=schoolMapper.find(current,size,schoolMessage);

        return schoolMessageList;
    }

    public SchoolMessage find_one(String school){
        SchoolMessage schoolMessage=schoolMapper.find_one(school);
        return schoolMessage;
    }




}
