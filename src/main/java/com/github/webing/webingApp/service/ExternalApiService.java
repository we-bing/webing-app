package com.github.webing.webingApp.service;

import com.github.webing.webingApp.model.NewsPerKeyword;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by kd4 on 2016. 4. 2..
 */

@Service
public class ExternalApiService {
    public List<NewsPerKeyword> parseNewsContentsXml(String xmlString) throws ParserConfigurationException, IOException, SAXException {
        List<NewsPerKeyword> newsPerKeywords = new ArrayList<>();
        InputSource is = new InputSource(new StringReader(xmlString));
        Document document = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(is);
        document.getDocumentElement().normalize();
        NodeList itemNodeList = document.getElementsByTagName("item");

        for (int s = 0; s < itemNodeList.getLength(); s++) {

            Node itemNode = itemNodeList.item(s);

            NewsPerKeyword newsPerKeyword = new NewsPerKeyword();

            if (itemNode.getNodeType() == Node.ELEMENT_NODE) {

                Element itemElement = (Element)itemNode;

                NodeList titleNodeList = itemElement.getElementsByTagName("title");
                Element titleElement = (Element)titleNodeList.item(0);
                NodeList childTitleNodeList = titleElement.getChildNodes();
                newsPerKeyword.setNewsTitle(((Node)childTitleNodeList.item(0)).getNodeValue().replaceAll("(<b>)|(</b>)","").replaceAll("&[a-zA-z]+;",""));
                NodeList linkNodeList = itemElement.getElementsByTagName("link");
                Element linkElement = (Element) linkNodeList.item(0);
                NodeList childLinkNodeList = linkElement.getChildNodes();
                newsPerKeyword.setNewsLink(((Node)childLinkNodeList.item(0)).getNodeValue().replaceAll("(<b>)|(</b>)","").replaceAll("&[a-zA-z]+;",""));
                NodeList descriptionNodeList = itemElement.getElementsByTagName("description");
                Element descriptionElement = (Element) descriptionNodeList.item(0);
                NodeList childDescriptionNodeList = descriptionElement.getChildNodes();
                newsPerKeyword.setNewsDescription(((Node)childDescriptionNodeList.item(0)).getNodeValue().replaceAll("(<b>)|(</b>)","").replaceAll("&[a-zA-z]+;",""));
                newsPerKeywords.add(newsPerKeyword);
            }

        }
        return newsPerKeywords;
    }

    public String getNewsStringWithAPI(String query) throws IOException {
        URL url;
        URLConnection urlConnection;
        String sUrl = "https://openapi.naver.com/v1/search/news.xml?query="+ URLEncoder.encode(query, "UTF-8")+"&display=10&start=1&sort=sim";
        url = new URL(sUrl);
        urlConnection = url.openConnection();
        urlConnection.setRequestProperty("X-Naver-Client-Id","TsshNF_3sY3pu9gOkU7d");
        urlConnection.setRequestProperty("X-Naver-Client-Secret","5FOHV3Ysqo");
        InputStream ist = urlConnection.getInputStream();
        InputStreamReader isr = new InputStreamReader(ist);
        BufferedReader br = new BufferedReader(isr);
        String xmlString = "";
        while(true){
            String temp = br.readLine();
            if(temp==null){
                break;
            }
            xmlString += temp;
        }
        return xmlString;
    }
}
