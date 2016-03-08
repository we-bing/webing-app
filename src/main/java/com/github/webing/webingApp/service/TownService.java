package com.github.webing.webingApp.service;

import com.github.webing.webingApp.model.Town;
import com.github.webing.webingApp.repository.TownsRepository;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

/**
 * Created by sleepbear on 2016. 3. 2..
 */
@Service
public class TownService {

    @Inject
    private TownsRepository townsRepository;

    public List<Town> getTownList() {
        return townsRepository.findAll();
    }
}
