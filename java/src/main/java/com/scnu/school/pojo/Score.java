package com.scnu.school.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import lombok.Data;

@Data
@TableName("score")
public class Score {
        @TableId(value = "id",type = IdType.AUTO)
        private Integer id;
        private String subjectsFirst;
        private String subjectsSecond;
        private String school;
        private String college;
        private String batch;
        private String major;
        private String rank24;
        private String rank23;
        private String rank22;
        private String rank21;
        private String rank20;
        private String mark24;
        private String mark23;
        private String mark22;
        private String mark21;
        private String mark20;
        private String predictAccuracy ;


        @TableField(exist = false)
        private String province;

        @TableField(exist = false)
        private String city;

        @TableField(exist = false)
        private String level;


        public static void blankToNull(Score score){
                if (StringUtils.isBlank(score.getSubjectsFirst())) {
                        score.setSubjectsFirst(null);
                }
                if (StringUtils.isBlank(score.getSubjectsSecond())) {
                        score.setSubjectsSecond(null);
                }
                if (StringUtils.isBlank(score.getSchool())) {
                        score.setSchool(null);
                }
                if (StringUtils.isBlank(score.getCollege())) {
                        score.setCollege(null);
                }
                if (StringUtils.isBlank(score.getBatch())) {
                        score.setBatch(null);
                }
                if (StringUtils.isBlank(score.getMajor())) {
                        score.setMajor(null);
                }
                if (StringUtils.isBlank(score.getProvince())) {
                        score.setProvince(null);
                }
                if (StringUtils.isBlank(score.getCity())) {
                        score.setCity(null);
                }
                if (StringUtils.isBlank(score.getLevel())) {
                        score.setLevel(null);
                }
        }

    }
