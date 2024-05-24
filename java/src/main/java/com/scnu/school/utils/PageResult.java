package com.scnu.school.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageResult<T> {
    private Integer current;
    private Integer size;
    private Integer total;
    private T list;
}
