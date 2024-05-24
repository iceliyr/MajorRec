package com.scnu.school.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserVolunteer {
    private String openid;
    private String school;
    private String major;
    private String rank24;
    private Integer id;
}
