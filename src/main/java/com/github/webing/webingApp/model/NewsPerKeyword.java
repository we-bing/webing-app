package com.github.webing.webingApp.model;

/**
 * Created by sleepbear on 2016. 2. 26..
 */

import lombok.Data;
import org.w3c.dom.Node;

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

    // news API를 위한 게터 세터
    public long getNewsId() {
        return newsId;
    }

    public void setNewsId(long newsId) {
        this.newsId = newsId;
    }

    public long getKeywordId() {
        return keywordId;
    }

    public void setKeywordId(long keywordId) {
        this.keywordId = keywordId;
    }

    public String getNewsLink() {
        return newsLink;
    }

    public void setNewsLink(String newsLink) {
        this.newsLink = newsLink;
    }

    public String getNewsTitle() {
        return newsTitle;
    }

    public void setNewsTitle(String newsTitle) {
        this.newsTitle = newsTitle;
    }

    public String getNewsDescription() {
        return newsDescription;
    }

    public void setNewsDescription(String newsDescription) {
        this.newsDescription = newsDescription;
    }
}
