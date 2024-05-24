package com.scnu.school;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DemoApplicationTests {

	@Test
	void contextLoads() {
		int r=greyPrediction(12345,12344,13244);
		System.out.println(r);
	}
	public static int greyPrediction(int year1, int year2, int year3) {
		// 灰色预测模型计算方法
		double a = (year1 + year2) / 2.0;
		double b = 0.5 * (year2 - year1);
		double result = a + b * 2;

		return (int) Math.round(result);
	}

}
