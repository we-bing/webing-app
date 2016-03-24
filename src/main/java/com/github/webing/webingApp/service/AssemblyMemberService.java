package com.github.webing.webingApp.service;

import com.github.webing.webingApp.model.AssemblyMember;
import com.github.webing.webingApp.repository.AssemblyMemberRepository;
import org.springframework.stereotype.Service;

import javax.inject.Inject;

/**
 * Created by sleepbear on 2016. 3. 25..
 */
@Service
public class AssemblyMemberService {

    @Inject
    AssemblyMemberRepository assemblyMemberRepository;

    public AssemblyMember getAssemblyMember(long assemblyId) {
        return assemblyMemberRepository.findByAssemblyId(assemblyId);
    }
}
