package com.github.webing.webingApp.repository;

import com.github.webing.webingApp.model.AssemblyMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by sleepbear on 2016. 3. 25..
 */
@Repository
public interface AssemblyMemberRepository extends JpaRepository<AssemblyMember, Long>{

    AssemblyMember findByAssemblyId(long assemblyId);

}
