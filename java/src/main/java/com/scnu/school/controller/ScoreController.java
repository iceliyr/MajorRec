package com.scnu.school.controller;

import com.scnu.school.mapper.ScoreMapper;
import com.scnu.school.pojo.Score;
import com.scnu.school.service.ScoreService;
import com.scnu.school.utils.GreyModel;
import com.scnu.school.utils.PageResult;
import com.scnu.school.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ScoreController {
    @Autowired
    private GreyModel greyModel;
    @Autowired
    private ScoreService service;
    @Autowired
    private ScoreMapper scoreMapper;

    @RequestMapping("/getPredictRank")
    public Result getPredictRank(String rank1, String rank2, String rank3){
        System.out.println("rank:"+rank1+rank2+rank3);
        double rank[]=new double[3];
        rank[0]=Double.parseDouble(rank1);
        rank[1]=Double.parseDouble(rank2);
        rank[2]=Double.parseDouble(rank3);
        int res=(int)greyModel.build(rank);
        return Result.success(res);
    }

    @RequestMapping("getScore")
    public Result getScoreByLike(@RequestParam(name="current",defaultValue = "1")Integer current,
                                 @RequestParam(name="size",defaultValue = "10")Integer size,
                                 @RequestParam(name="ranking")Integer ranking,
                                 @RequestParam(name="option")Integer option,
                                 Score score){
        System.out.println(score);
        Score.blankToNull(score);
        Integer ranking1,ranking2;
        if(option.equals(1)){
            ranking1=(int)(0.4*ranking);
            ranking2=ranking;
        }else if (option.equals(2)){
            ranking1=ranking;
            ranking2=(int)(1.8*ranking);
        }else {
            ranking1=(int)(1.8*ranking);
            ranking2=Integer.MAX_VALUE;
        }
        Integer totalNum=scoreMapper.getScoreToTalNum(score,ranking1,ranking2);
        System.out.println("总数为："+totalNum);
        Integer total=totalNum%size==0 ? totalNum/size:totalNum/size+1;

        if(current<=total){
            Integer pageNo=(current-1)*size;
            List<Score> list=service.getRankByLike(pageNo,size,score,ranking1,ranking2);
            PageResult<List<Score>> result=new PageResult<>(current,size,total,list);
            return Result.success(result);
        }else if(totalNum==0){
            return Result.error("未查找到任何数据");
        }
        else {
            return Result.error("异常访问，请重新正确尝试");
        }


    }

    @RequestMapping("/getRank")
    public Result getRank(String school, String major){
       return  Result.success(service.getRank(school,major));
    }

    @RequestMapping("/getRankBySchool")
    public Result getRankBySchool(String school){
       return  Result.success(service.getRankBySchool(school));
    }
    @RequestMapping("/getRankByMajor")
    public Result getRankByMajor(String major){
       return Result.success(service.getRankByMajor(major));
    }

    @RequestMapping("/getMajorBySchool")
    public Result getMajorBySchool(String school){
        return  Result.success(service.getRankBySchool(school));
    }


    @RequestMapping("/getScoreMinRank")
    public Result getScoreByMinRankAndSchool(String school,String subjectsFirst){
       List<Score> score= scoreMapper.getScoreByMinRank22(school,subjectsFirst);
       if(score.isEmpty()){
           return Result.error("找不到相关院校信息");
       }else {
           return Result.success(score.get(0));
       }
    }
}
