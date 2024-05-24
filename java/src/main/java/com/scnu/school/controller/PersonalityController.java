package com.scnu.school.controller;

import com.scnu.school.pojo.Mbti;
import com.scnu.school.pojo.Personality;
import com.scnu.school.utils.Result;
import com.scnu.school.service.PersonalityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class PersonalityController {
    @Autowired
    private PersonalityService service;

    @GetMapping("/personalityAll")
    public Result personalityList(){
        ArrayList<Personality> arrayList=service.getAll();
        return Result.success(arrayList);
    }
    @GetMapping("/perMajor")
    public Result per_Major(String personality){
        ArrayList<String> arrayList=service.per_Major(personality);
        return Result.success(arrayList);
    }

    @GetMapping("/mbti")
    public Result mbti(String personality){
        ArrayList<Mbti> arrayList=service.mbti(personality);
        return Result.success(arrayList);
    }
}
