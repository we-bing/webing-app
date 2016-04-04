package com.github.webing.webingApp.repository;

import com.github.webing.webingApp.WebingApplication;
import com.github.webing.webingApp.model.Town;
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
public class TownsRepositoryTest {

    @Inject
    TownsRepository townsRepository;

    @Test
    public void testFindByCountyCode() throws Exception {
        // Given
        long countyCode = 1;
        int expectResult = 26;
        // When
        final List<Town> resultTownList = townsRepository.findByCountyCodeOrderByTownNameAsc(countyCode);
        // Then
        assertThat(resultTownList.size(), is(expectResult));
    }
}