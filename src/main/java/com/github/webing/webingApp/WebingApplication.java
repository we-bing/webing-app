package com.github.webing.webingApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;

/**
 * Created by sleepbear on 2016. 2. 11..
 */
@SpringBootApplication
public class WebingApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(WebingApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(WebingApplication.class, args);
    }
}
