package com.scnu.school.pojo;

import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
//@TableName("school_message")
public class   SchoolMessage {
    private Integer ranking;
    private String school;
    private String province;
    private String city;
    private String level;
    private String message;
    private String image;

    public static void blankToNull(SchoolMessage schoolMessage){
        if (StringUtils.isBlank(schoolMessage.getSchool())){
            schoolMessage.setSchool(null);
        }
        if (StringUtils.isBlank(schoolMessage.getMessage())){
            schoolMessage.setMessage(null);
        }
        if(StringUtils.isBlank((schoolMessage.getProvince()))){
            schoolMessage.setProvince(null);
        }
        if(StringUtils.isBlank((schoolMessage.getCity()))){
            schoolMessage.setCity(null);
        }
        if(StringUtils.isBlank(schoolMessage.getLevel())){
            schoolMessage.setLevel(null);
        }
    }
}
