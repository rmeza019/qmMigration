package com.appservices.qmmigration.web.rest;

import com.appservices.qmmigration.domain.SRCase;
import com.appservices.qmmigration.repository.SRCaseRepository;
import com.appservices.qmmigration.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.appservices.qmmigration.domain.SRCase}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SRCaseResource {

    private final Logger log = LoggerFactory.getLogger(SRCaseResource.class);

    private static final String ENTITY_NAME = "sRCase";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SRCaseRepository sRCaseRepository;

    public SRCaseResource(SRCaseRepository sRCaseRepository) {
        this.sRCaseRepository = sRCaseRepository;
    }

    /**
     * {@code POST  /sr-cases} : Create a new sRCase.
     *
     * @param sRCase the sRCase to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sRCase, or with status {@code 400 (Bad Request)} if the sRCase has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sr-cases")
    public ResponseEntity<SRCase> createSRCase(@Valid @RequestBody SRCase sRCase) throws URISyntaxException {
        log.debug("REST request to save SRCase : {}", sRCase);
        if (sRCase.getId() != null) {
            throw new BadRequestAlertException("A new sRCase cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SRCase result = sRCaseRepository.save(sRCase);
        return ResponseEntity.created(new URI("/api/sr-cases/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sr-cases} : Updates an existing sRCase.
     *
     * @param sRCase the sRCase to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sRCase,
     * or with status {@code 400 (Bad Request)} if the sRCase is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sRCase couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sr-cases")
    public ResponseEntity<SRCase> updateSRCase(@Valid @RequestBody SRCase sRCase) throws URISyntaxException {
        log.debug("REST request to update SRCase : {}", sRCase);
        if (sRCase.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SRCase result = sRCaseRepository.save(sRCase);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sRCase.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sr-cases} : get all the sRCases.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sRCases in body.
     */
    @GetMapping("/sr-cases")
    public ResponseEntity<List<SRCase>> getAllSRCases(Pageable pageable) {
        log.debug("REST request to get a page of SRCases");
        Page<SRCase> page = sRCaseRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /sr-cases/:id} : get the "id" sRCase.
     *
     * @param id the id of the sRCase to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sRCase, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sr-cases/{id}")
    public ResponseEntity<SRCase> getSRCase(@PathVariable Long id) {
        log.debug("REST request to get SRCase : {}", id);
        Optional<SRCase> sRCase = sRCaseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sRCase);
    }

    /**
     * {@code DELETE  /sr-cases/:id} : delete the "id" sRCase.
     *
     * @param id the id of the sRCase to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sr-cases/{id}")
    public ResponseEntity<Void> deleteSRCase(@PathVariable Long id) {
        log.debug("REST request to delete SRCase : {}", id);
        sRCaseRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
