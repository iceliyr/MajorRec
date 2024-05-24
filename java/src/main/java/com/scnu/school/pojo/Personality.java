package com.scnu.school.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Personality {
    private int id;
    private String question;
    private String optionA;
    private String optionB;
    private String score;
}
