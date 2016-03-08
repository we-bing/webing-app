package com.github.webing.webingApp.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by sleepbear on 2016. 2. 26..
 */
@Entity
@Table(name = "BILL_KEYWORDS")
@Data
public class BillKeyword {
    @Id
    private long keywordId;
    private float keywordSize;
    private String keywordName;
    private long assemblyId;
    private String birth;
    private String name;
    private String keywordStatus;
}
