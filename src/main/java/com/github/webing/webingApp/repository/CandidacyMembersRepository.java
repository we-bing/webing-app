package com.github.webing.webingApp.repository;

import com.github.webing.webingApp.model.CandidacyMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by sleepbear on 2016. 3. 4..
 */
@Repository
public interface CandidacyMembersRepository extends JpaRepository<CandidacyMember, Long> {

    @Override
    List<CandidacyMember> findAll();
    
    List<CandidacyMember> findByDistrictCode(Long districtCode);
}
