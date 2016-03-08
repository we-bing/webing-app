package com.github.webing.webingApp.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by sleepbear on 2016. 2. 26..
 */
@Entity
@Table(name = "CANDIDACY_PLEDGE")
@Data
public class CandidacyPledge {
    @Id
    private long pledgeId;

    @Column(name = "candidacy_id")
    private long candidacyId;
    private String pledgeTitle;
    private String pledgeDescription;
}
