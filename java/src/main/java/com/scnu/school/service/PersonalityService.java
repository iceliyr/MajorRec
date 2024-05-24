package com.scnu.school.service;

import com.scnu.school.mapper.PersonalityMapper;
import com.scnu.school.pojo.Mbti;
import com.scnu.school.pojo.Personality;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class PersonalityService {
    @Autowired
    private PersonalityMapper mapper;

    public ArrayList<Personality> getAll(){
        ArrayList<Personality> arrayList= mapper.getAll();
        return arrayList;
    }

    public ArrayList<String> per_Major(String personality){
        ArrayList<String> arrayList=mapper.per_major(personality);
        return arrayList;
    }

    public ArrayList<Mbti> mbti(String personality){
        ArrayList<Mbti> arrayList=mapper.mbti(personality);
        return arrayList;
    }
}
