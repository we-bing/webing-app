package com.github.webing.webingApp.service;

import com.github.webing.webingApp.model.CandidacyMember;
import com.github.webing.webingApp.repository.CandidacyMembersRepository;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

/**
 * Created by sleepbear on 2016. 3. 4..
 */
@Service
public class CandidacyService {

    @Inject
    CandidacyMembersRepository candidacyMembersRepository;

    public List<CandidacyMember> getCandidacyMembers(long districtCode) {
        return candidacyMembersRepository.findByDistrictCode(districtCode);
    }
}
