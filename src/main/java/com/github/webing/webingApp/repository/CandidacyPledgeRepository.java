package com.github.webing.webingApp.repository;

import com.github.webing.webingApp.model.CandidacyPledge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by sleepbear on 2016. 3. 29..
 */
public interface CandidacyPledgeRepository extends JpaRepository<CandidacyPledge, Long> {

    @Override
    List<CandidacyPledge> findAll();
}
