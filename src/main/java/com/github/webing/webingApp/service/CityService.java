package com.github.webing.webingApp.service;

import com.github.webing.webingApp.model.City;
import com.github.webing.webingApp.repository.CitiesRepository;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

/**
 * Created by sleepbear on 2016. 3. 19..
 */
@Service
public class CityService {

    @Inject
    CitiesRepository citiesRepository;

    public List<City> fetchTown() {
        return citiesRepository.findAll();
    }
}
