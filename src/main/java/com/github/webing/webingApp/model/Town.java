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
    private long townCode;

    private long districtCode;
    private String districtName;

    @Column(name = "city_code" )
    private long cityCode;
    private String townName;
}
