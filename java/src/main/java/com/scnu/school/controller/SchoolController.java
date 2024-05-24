package com.scnu.school.controller;

import com.scnu.school.mapper.SchoolMapper;
import com.scnu.school.pojo.SchoolMessage;
import com.scnu.school.service.SchoolService;
import com.scnu.school.utils.PageResult;
import com.scnu.school.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class SchoolController {

    @Autowired
    private SchoolMapper schoolMapper;
    @Autowired
    private SchoolService service;

    @GetMapping("/find")
    public Result find(@RequestParam(name="current",defaultValue = "1")Integer current,
                       @RequestParam(name="size",defaultValue = "10")Integer size,
                       SchoolMessage schoolMessage){
        System.out.println(schoolMessage);
        SchoolMessage.blankToNull(schoolMessage);
        System.out.println(schoolMessage);
        Integer totalNum=schoolMapper.findCount(schoolMessage);
        Integer total=totalNum%size==0 ? totalNum/size:totalNum/size+1;
        if(current<=total){
            Integer pageNo=(current-1)*size;
            List<SchoolMessage> list=schoolMapper.find(pageNo,size,schoolMessage);
            PageResult<List<SchoolMessage>> result=new PageResult<>(current,size,total,list);
            return Result.success(result);
        }else {
            return Result.error("异常访问，请重新正确尝试");
        }
    }

    @GetMapping("/findOne")
    public Result find_one(String school){
        SchoolMessage schoolMessage=service.find_one(school);
        return Result.success(schoolMessage);
    }

    @GetMapping("/getSchoolMessageBySchool")
    public Result getSchoolMessageBySchool(String school){
        SchoolMessage schoolMessage=service.find_one(school);
        return Result.success(schoolMessage);
    }


}
