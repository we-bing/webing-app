package com.github.webing.webingApp.controller;


import com.github.webing.webingApp.model.AssemblyMember;
import com.github.webing.webingApp.model.CandidacyMember;
import com.github.webing.webingApp.model.City;
import com.github.webing.webingApp.model.NewsPerKeyword;
import com.github.webing.webingApp.service.*;
import org.h2.util.New;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.inject.Inject;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;
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
    TownService townService;

    @Inject
    CityService cityService;

    @Inject
    CandidacyService candidacyService;

    @Inject
    AssemblyMemberService assemblyMemberService;

    @Inject
    ExternalApiService externalApiService;

    @RequestMapping(value = "townList", method = GET)
    public List<City> region() {
        return cityService.fetchTown();
    }

    @RequestMapping(value = "candidacies/{districtCode}", method = GET)
    public List<CandidacyMember> candidacyMembers(@PathVariable("districtCode") long districtCode) {
        System.out.println(districtCode);
        return candidacyService.getCandidacyMembers(districtCode);
    }

    @RequestMapping(value = "assemblyMember/{assemblyId}")
    public AssemblyMember getAssemblyMem(@PathVariable("assemblyId") long assemblyId) {
        return assemblyMemberService.getAssemblyMember(assemblyId);
    }

    @RequestMapping(value = "newsKeywords")
    public List<NewsPerKeyword> getNewsWithQuery(@RequestParam(value = "query") String query) throws IOException, ParserConfigurationException, SAXException {

        // query를 검색어로 naver 검색 API 호출. 호출 후 본문을 xml 형식의 String으로 변환해서 가져옴.
        String xmlString = externalApiService.getNewsStringWithAPI(query);

        // naver 검색 API로 얻은 xml형식에 string에서 news 정보들을 파씽하고 NewsPerKeyword List를 반환
        return externalApiService.parseNewsContentsXml(xmlString);
    }

}
