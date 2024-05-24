package com.scnu.school.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Major {
    private Short level;
    private String category;
    private String firstSubject;
    private String secondSubject;
    private String introduction;
    private String course;
    private String employmentDirection;
}
