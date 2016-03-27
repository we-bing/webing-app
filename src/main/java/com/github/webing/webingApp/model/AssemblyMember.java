package com.github.webing.webingApp.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

/**
 * Created by sleepbear on 2016. 2. 26..
 */
@Entity
@Table(name = "`ASSEMBLY_MEMBERS`")
@Data
public class AssemblyMember {

    @Id
    @Column(name = "assembly_id")
    private long assemblyId;

    @Column(length = 16)
    private String birth;

    @Column(length = 24)
    private String name;

    @Column(name = "attendance_rate")
    private float attendanceRate;

    private int proposal;

    @Column(name = "assembly_status", length = 2)
    private String assemblyStatus;

    @Column(name = "complete_pledges_rate")
    private String completedPledgesRate;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "assembly_id")
    private List<BillKeyword> billKeywordList;
}
