package com.github.webing.webingApp.controller;


import com.github.webing.webingApp.model.CandidacyMember;
import com.github.webing.webingApp.model.Town;
import com.github.webing.webingApp.service.CandidacyService;
import com.github.webing.webingApp.service.TownService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Created by sleepbear on 2016. 3. 2..
 */
@RestController
@RequestMapping("/api")
public class WebingApiController {

    @Inject
    TownService townService;

    @Inject
    CandidacyService candidacyService;

    @RequestMapping(value = "townList", method = GET)
    public List<Town> region() {
        return townService.getTownList();
    }

    @RequestMapping(value = "candidacies/{districtCode}", method = GET)
    public List<CandidacyMember> candidacyMembers(@PathVariable("districtCode") long districtCode) {
        System.out.println(districtCode);
        return candidacyService.getCandidacyMembers(districtCode);
    }

}
