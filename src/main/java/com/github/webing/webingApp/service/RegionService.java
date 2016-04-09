package com.github.webing.webingApp.service;

import com.github.webing.webingApp.model.City;
import com.github.webing.webingApp.model.Complete;
import com.github.webing.webingApp.model.County;
import com.github.webing.webingApp.model.Town;
import com.github.webing.webingApp.repository.CitiesRepository;
import com.github.webing.webingApp.repository.CompleteRepository;
import com.github.webing.webingApp.repository.CountyRepository;
import com.github.webing.webingApp.repository.TownsRepository;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by sleepbear on 2016. 4. 3..
 */
@Service
public class RegionService {

    @Inject
    CitiesRepository citiesRepository;

    @Inject
    CountyRepository countyRepository;

    @Inject
    TownsRepository townsRepository;

    @Inject
    CompleteRepository completeRepository;

    public List<City> getCityList() {
        final List<Complete> completeList = completeRepository.findAll();
        final List<Long> completeCityList = completeList.stream()
                .map(Complete::getCompletedCityCode)
                .collect(Collectors.toList());
        return citiesRepository.findAll(completeCityList);
    }

    public List<County> getCounyList(long cityCode) {
        return countyRepository.findByCityCodeOrderByCountyNameAsc(cityCode);
    }

    public List<Town> getTownList(long countyCode) {
        return townsRepository.findByCountyCodeOrderByTownNameAsc(countyCode);
    }

}
