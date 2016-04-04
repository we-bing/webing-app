package com.github.webing.webingApp.controller;


import com.github.webing.webingApp.model.*;
import com.github.webing.webingApp.service.AssemblyMemberService;
import com.github.webing.webingApp.service.CandidacyService;
import com.github.webing.webingApp.service.ExternalApiService;
import com.github.webing.webingApp.service.RegionService;
import org.springframework.web.bind.annotation.*;
import org.xml.sax.SAXException;

import javax.inject.Inject;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Created by sleepbear on 2016. 3. 2..
 */
@RestController
@RequestMapping("/api")
@CrossOrigin
public class WebingApiController {

    @Inject
    RegionService regionService;

    @Inject
    CandidacyService candidacyService;

    @Inject
    AssemblyMemberService assemblyMemberService;

    @Inject
    ExternalApiService externalApiService;

    @RequestMapping(value = "cityList",
            method = GET)
    public List<City> cityList() {
        return regionService.getCityList();
    }

    @RequestMapping(value = "countyList/{cityCode}",
            method = GET)
    public List<County> countyList(@PathVariable("cityCode") long cityCode) {
        return regionService.getCounyList(cityCode);
    }

    @RequestMapping(value = "townList/{countyCode}",
            method = GET)
    public List<Town> townList(@PathVariable("countyCode") long countyCode) {
        return regionService.getTownList(countyCode);
    }

    @RequestMapping(value = "candidacies/{districtCode}",
            method = GET)
    public List<CandidacyMember> candidacyMembers(@PathVariable("districtCode") long districtCode) {

        System.out.println(districtCode);
        return candidacyService.getCandidacyMembers(districtCode);
    }

    @RequestMapping(value = "assemblyMember/{assemblyId}")
    public AssemblyMember getAssemblyMem(@PathVariable("assemblyId") long assemblyId) {
        return assemblyMemberService.getAssemblyMember(assemblyId);
    }

    @RequestMapping(value = "newsKeywords" )
    public List<NewsPerKeyword> getNewsWithQuery(@RequestParam(value = "query") String query) throws IOException, ParserConfigurationException, SAXException {

        // query를 검색어로 naver 검색 API 호출. 호출 후 본문을 xml 형식의 String으로 변환해서 가져옴.
        String xmlString = externalApiService.getNewsStringWithAPI(query);

        // naver 검색 API로 얻은 xml형식에 string에서 news 정보들을 파씽하고 NewsPerKeyword List를 반환
        return externalApiService.parseNewsContentsXml(xmlString);
    }

}
