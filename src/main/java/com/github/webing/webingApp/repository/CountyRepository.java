package com.github.webing.webingApp.repository;

import com.github.webing.webingApp.model.County;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by sleepbear on 2016. 4. 3..
 */
@Repository
public interface CountyRepository extends JpaRepository<County, Long> {

    List<County> findByCityCodeOrderByCountyNameAsc(long cityCode);
}
