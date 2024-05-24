package com.scnu.school.pojo;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchoolMessageAndUserVolunteer {
    private String school;
    private String province;
    private String city;
    private String level;
    private String message;
    private String image;
    private String subjects;
    private String group;
    private String major;
    private String openid;
    private Integer id;
    private String rank24;
}
