package com.scnu.school.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private String openid;
    private Integer mark;
    private Integer ranking;
    private String province;
    private String firstSubject;
    private String secondSubject;
    private String thirdSubject;
    private String mbti;


}
