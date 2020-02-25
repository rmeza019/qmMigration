package com.appservices.qmmigration.repository;

import com.appservices.qmmigration.domain.SRCase;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SRCase entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SRCaseRepository extends JpaRepository<SRCase, Long> {

}
