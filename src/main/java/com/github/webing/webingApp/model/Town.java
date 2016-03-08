package com.github.webing.webingApp.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by sleepbear on 2016. 3. 4..
 */
@Entity
@Table(name = "TOWNS")
@Data
public class Town {

    @Id
    private long townCode;

    private long districtCode;
    private String districtName;
    private long cityCode;
    private String townName;
}
