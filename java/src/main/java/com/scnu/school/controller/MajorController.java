package com.scnu.school.controller;

import com.scnu.school.pojo.Major;
import com.scnu.school.service.MajorService;
import com.scnu.school.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class MajorController {
    @Autowired
    private MajorService majorService;

    @GetMapping("/majors")
    public Result majors(String secondSubject){
        List<Major> majorList=majorService.majors(secondSubject);
        return Result.success(majorList);
    }

    @GetMapping("getMajorsBySecondSubject")
    public Result getMajorsBySecond(Short level,String secondSubject){
        List<Major> majorList=majorService.getMajorsBySecond(level,secondSubject);
        return Result.success(majorList);
    }


    @GetMapping("/majorFirst")
    public Result majorFirst(short level,String category){
        List<String> list=majorService.findFirstSubject(level,category);
        return Result.success(list);
    }

    @GetMapping("/majorSecond")
    public Result majorSecond(short level,String category,String firstSubject){
        ArrayList<String> list=majorService.findSecondSubject(level,category,firstSubject);
        return Result.success(list);
    }

    @GetMapping("/majorAll")
    public Result majorAll(short level,String category,String firstSubject,String secondSubject){
        List<Major> majorList=majorService.findAll(level,category,firstSubject,secondSubject);
        return Result.success(majorList);
    }

}
