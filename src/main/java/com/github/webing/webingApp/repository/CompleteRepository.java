package com.github.webing.webingApp.repository;

import com.github.webing.webingApp.model.Complete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by sleepbear on 2016. 4. 9..
 */
@Repository
public interface CompleteRepository extends JpaRepository<Complete, Long >{
    @Override
    List<Complete> findAll();
}
