package com.scnu.school.utils;

import org.springframework.stereotype.Component;

@Component
public class GreyModel {
    //原始数组的个数
    private int size;
    //灰色预测的系数a
    private double a;
    //灰色预测系数b
    private double b;
    //累加序列预测值
    private double m;
    //累加序列预测值
    private double n;
    //原始序列预测值，灰色预测模型的输出值
    private double result;

    public double build(double[] x0) {
//原始数组的长度
        this.size = x0.length;
//创建累加数组
        double[] x1 = new double[this.size];
//累加数组的第一个值等于原始数组的第一个值
        x1[0] = x0[0];
//对原始数组进行累加
        for(int i = 1; i < this.size; ++i) {
            x1[i] = x0[i] + x1[i - 1];
        }
//创建矩阵B
        double[][] B = new double[this.size - 1][2];
//对矩阵B进行赋值
        for(int i = 0; i < this.size - 1; ++i) {
            B[i][0] = -(x1[i] + x1[i + 1]) / 2.0;
            B[i][1] = 1.0;
        }
//创建转置矩阵Bt
        double[][] Bt = new double[2][this.size - 1];
//转置矩阵Bt赋值
        for(int i = 0; i < this.size - 1; ++i) {
            Bt[0][i] = B[i][0];
            Bt[1][i] = 1.0;
        }
//创建矩阵t，作为Bt*B的结果
        double[][] t = new double[2][2];
        t = this.multiply(Bt, B);
//创建矩阵t1，作为t的逆矩阵
        double[][] t1 = new double[2][2];
        t1 = this.inverse(t);
//创建矩阵t2，作为t1*Bt的结果
        double[][] t2 = new double[2][this.size - 1];
        t2 = this.multiply(t1, Bt);
//创建矩阵Y
        double[][] Y = new double[this.size - 1][1];
        for(int i = 0; i < this.size - 1; ++i) {
            Y[i][0] = x0[i + 1];
        }
//创建矩阵t3，作为t2*Y的结果
        double[][] t3 = new double[2][1];
        t3 = this.multiply(t2, Y);
        this.a = t3[0][0];
        System.out.println(this.a);
        this.b = t3[1][0];
        System.out.println(this.b);
        this.m = (x0[0] - this.b / this.a) * Math.exp(-this.a * (double)(this.size - 1)) + this.b / this.a;
        this.n = (x0[0] - this.b / this.a) * Math.exp(-this.a * (double)this.size) + this.b / this.a;
        this.result = this.n - this.m;
        return this.result;
    }
    //矩阵相乘的函数，left为左矩阵，right为右矩阵，返回值为t
    private double[][] multiply(double[][] left, double[][] right) {
        double[][] t = new double[left.length][right[0].length];

        for(int i = 0; i < left.length; ++i) {
            for(int j = 0; j < right[0].length; ++j) {
                for(int k = 0; k < left[0].length; ++k) {
                    t[i][j] += left[i][k] * right[k][j];
                }
            }
        }

        return t;
    }
    //矩阵的求逆，t作为待求逆的矩阵，返回值为a
    private double[][] inverse(double[][] t) {
        double[][] a = new double[2][2];
        double det = t[0][0] * t[1][1] - t[0][1] * t[1][0];
        if (det > 0.0) {
            a[0][0] = t[1][1] / det;
            a[0][1] = -t[1][0] / det;
            a[1][0] = -t[0][1] / det;
            a[1][1] = t[0][0] / det;
        } else {
            System.out.println("矩阵不可逆");
        }

        return a;
    }
}
