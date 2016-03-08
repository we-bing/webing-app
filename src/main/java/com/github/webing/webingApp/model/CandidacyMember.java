package com.github.webing.webingApp.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

/**
 * Created by sleepbear on 2016. 2. 26..
 */
@Entity
@Table(name = "CANDIDACY_MEMBERS")
@Data
public class CandidacyMember {
    @Id
    @Column(name = "candidacy_id")
    private long candidacyId;
    private long assemblyId;
    private String birth;
    private String party;
    private long districtCode;
    private String candidacyImg;
    private String gender;
    private String address;
    private String education;
    private String criminal;
    private String name;
    private String candidacyStatus;
    private String experience;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "candidacy_id")
    private List<CandidacyPledge> candidacyPledge;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "candidacy_id")
    private List<CandidacyKeyword> candidacyKeywordList;
}
