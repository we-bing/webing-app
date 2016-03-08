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
@Table(name = "CANDIDACY_KEYWORDS")
@Data
public class CandidacyKeyword {
    @Id
    private long keywordId;
    private String keywordName;

    @Column(name = "candidacy_id")
    private long candidacyId;
    private String keywordStatus;
}
