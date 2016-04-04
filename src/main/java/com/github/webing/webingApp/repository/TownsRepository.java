package com.github.webing.webingApp.repository;


import com.github.webing.webingApp.model.Town;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by sleepbear on 2016. 3. 6..
 */
@Repository
public interface TownsRepository extends JpaRepository<Town, Long> {

    @Override
    List<Town> findAll();

    List<Town> findByCountyCodeOrderByTownNameAsc(long countyCode);
}
