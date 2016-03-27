package com.github.webing.webingApp.model;

/**
 * Created by sleepbear on 2016. 2. 26..
 */

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "NEWS_PER_KEYWORDS")
@Data
public class NewsPerKeyword {
    @Id
    @Column(name = "news_id")
    private long newsId;
    @Column(name = "keyword_id")
    private long keywordId;
    @Column(name = "news_link")
    private String newsLink;
    @Column(name = "news_title")
    private String newsTitle;
    @Column(name = "news_description")
    private String newsDescription;
}
