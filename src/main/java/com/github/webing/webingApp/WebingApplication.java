package com.github.webing.webingApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;

/**
 * Created by sleepbear on 2016. 2. 11..
 */
@SpringBootApplication
public class WebingApplication {
//    todo Spring boot 프로젝트를 톰캣 서버로 배포시 아래 코드가 필요하지, 개발서버에서 적용하면 스탠드얼론 실행이 안되므로 주석처리
//    extends SpringBootServletInitializer
//    @Override
//    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
//        return application.sources(WebingApplication.class);
//    }

    public static void main(String[] args) {
        SpringApplication.run(WebingApplication.class, args);
    }
}
