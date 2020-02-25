package com.appservices.qmmigration.repository;

import com.appservices.qmmigration.domain.Engineer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Engineer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EngineerRepository extends JpaRepository<Engineer, Long> {

}
