package com.scnu.school.utils;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler
{
    @ExceptionHandler(RuntimeException.class)
//    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Result exception(Exception e)
    {
        String message=e.getMessage();

        if(message.contains("unique_constraint_name")){
            return Result.error("数据重复添加!");
        }



        return Result.error(e.getMessage());
    }
}