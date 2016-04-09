package com.github.webing.webingApp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by sleepbear on 2016. 4. 9..
 */
@Controller
public class PathRequestController {

    @RequestMapping(value={"/home", "/candidacyList/*", "/candidacyDetail/*"})
    public String pathRoute() {
        return "/";
    }
}
