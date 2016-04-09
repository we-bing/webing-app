package com.github.webing.webingApp.model;

import lombok.Data;

import javax.persistence.*;

/**
 * Created by sleepbear on 2016. 4. 9..
 */
@Entity
@Table(name = "COMPLETE")
@Data
public class Complete {

    @Id
    @Column(name= "city_code")
    private Long completedCityCode;
}
