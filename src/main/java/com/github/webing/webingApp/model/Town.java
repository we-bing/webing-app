package com.github.webing.webingApp.model;

import lombok.Data;

import javax.persistence.*;

/**
 * Created by sleepbear on 2016. 3. 4..
 */
@Entity
@Table(name = "TOWNS")
@Data
public class Town {

    @Id
    @Column(name = "town_code")
    private long townCode;

    @Column(name = "district_code")
    private long districtCode;
    @Column(name = "district_name")
    private String districtName;

    @Column(name = "city_code" )
    private long cityCode;
    @Column(name = "town_name")
    private String townName;
}
