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
@Table(name = "CITIES")
@Data
public class City {

    @Id
    @Column(name = "city_code")
    private long cityCode;

    private String cityName;

}
