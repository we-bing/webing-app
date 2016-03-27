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
    @Column(name = "pledge_id")
    private long pledgeId;

    @Column(name = "candidacy_id")
    private long candidacyId;
    @Column(name = "pledge_title")
    private String pledgeTitle;
    @Column(name = "pledge_description")
    private String pledgeDescription;
}
