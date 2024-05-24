package com.scnu.school.pojo;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SchoolPredict {
    private String subjects;
    private String school;
    private String group;
    private String major;
    private Integer year24_rank;
    private Integer year23_rank;
    private Integer year22_rank;
    private Integer year21_rank;
}
