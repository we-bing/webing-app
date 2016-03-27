package com.github.webing.webingApp.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

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
    @Column(name = "city_name")
    private String cityName;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "city_code")
    private List<Town> townList;
}
