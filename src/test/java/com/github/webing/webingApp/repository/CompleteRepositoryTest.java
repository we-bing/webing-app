package com.github.webing.webingApp.repository;

import com.github.webing.webingApp.WebingApplication;
import com.github.webing.webingApp.model.Complete;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.inject.Inject;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.greaterThan;

/**
 * Created by sleepbear on 2016. 4. 9..
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WebingApplication.class)
public class CompleteRepositoryTest {

    @Inject
    CompleteRepository completeRepository;

    @Test
    public void testFindAll() throws Exception {
        // Given
        final List<Complete> completeList = completeRepository.findAll();
        // When

        // Then
        assertThat(completeList.size(), greaterThan(0));

    }
}