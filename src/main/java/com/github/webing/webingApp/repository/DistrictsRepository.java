package com.github.webing.webingApp.repository;


import com.github.webing.webingApp.model.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by sleepbear on 2016. 2. 27..
 */
@Repository
public interface DistrictsRepository extends JpaRepository<District, Long> {

    @Override
    List<District> findAll();
}
