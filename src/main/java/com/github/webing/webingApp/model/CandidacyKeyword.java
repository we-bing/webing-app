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
    @Column(name = "keyword_id")
    private long keywordId;
    @Column(name = "keyword_name")
    private String keywordName;

    @Column(name = "candidacy_id")
    private long candidacyId;
    @Column(name = "keyword_status")
    private String keywordStatus;
}
