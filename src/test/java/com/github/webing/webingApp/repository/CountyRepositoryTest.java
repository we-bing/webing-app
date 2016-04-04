package com.github.webing.webingApp.repository;

import com.github.webing.webingApp.WebingApplication;
import com.github.webing.webingApp.model.County;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.inject.Inject;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

/**
 * Created by sleepbear on 2016. 4. 3..
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WebingApplication.class)
public class CountyRepositoryTest {

    @Inject
    CountyRepository countyRepository;

    @Test
    public void testFindByCityCode() throws Exception {
        // Given
        long cityCode = 4900;
        long expectResult = 2;
        // When
        final List<County> resultCountyList = countyRepository.findByCityCodeOrderByCountyNameAsc(cityCode);
        // Then
        assertThat(resultCountyList.size(), is(2));
    }
}