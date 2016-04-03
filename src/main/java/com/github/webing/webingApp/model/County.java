package com.github.webing.webingApp.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by sleepbear on 2016. 4. 3..
 */
@Entity
@Table(name = "COUNTYS")
@Data
public class County {

    @Id
    @Column(name = "county_code")
    private Long countyCode;

    @Column(name = "county_name")
    private String countyName;

    @Column(name = "city_code")
    private Long cityCode;

}
