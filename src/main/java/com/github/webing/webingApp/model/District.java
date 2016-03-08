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
@Table(name = "DISTRICTS")
@Data
public class District {

    @Id
    @Column(name = "district_code")
    private long districtCode;

    private String districtName;

    private long city_code;
}
