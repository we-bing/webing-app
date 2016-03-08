package com.github.webing.webingApp.model;

/**
 * Created by sleepbear on 2016. 2. 26..
 */

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "NEWS_PER_KEYWORDS")
@Data
public class NewsPerKeyword {
    @Id
    private long newsId;
    private long keywordId;
    private String newsLink;
    private String newsTitle;
    private String newsDescription;
}
