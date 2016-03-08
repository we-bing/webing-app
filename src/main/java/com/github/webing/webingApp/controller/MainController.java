package com.github.webing.webingApp.controller;


import com.github.webing.webingApp.model.City;
import com.github.webing.webingApp.repository.CitiesRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Created by sleepbear on 2016. 3. 2..
 */
@Controller
public class MainController {

    @Inject
    CitiesRepository citiesRepository;

    @RequestMapping(value = "/city" , method = GET)
    @ResponseBody
    public List<City> hello() {
        return citiesRepository.findAll();
    }

}
