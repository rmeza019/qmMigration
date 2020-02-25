package com.appservices.qmmigration.web.rest;

import com.appservices.qmmigration.domain.Engineer;
import com.appservices.qmmigration.repository.EngineerRepository;
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
 * REST controller for managing {@link com.appservices.qmmigration.domain.Engineer}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EngineerResource {

    private final Logger log = LoggerFactory.getLogger(EngineerResource.class);

    private static final String ENTITY_NAME = "engineer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EngineerRepository engineerRepository;

    public EngineerResource(EngineerRepository engineerRepository) {
        this.engineerRepository = engineerRepository;
    }

    /**
     * {@code POST  /engineers} : Create a new engineer.
     *
     * @param engineer the engineer to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new engineer, or with status {@code 400 (Bad Request)} if the engineer has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/engineers")
    public ResponseEntity<Engineer> createEngineer(@Valid @RequestBody Engineer engineer) throws URISyntaxException {
        log.debug("REST request to save Engineer : {}", engineer);
        if (engineer.getId() != null) {
            throw new BadRequestAlertException("A new engineer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Engineer result = engineerRepository.save(engineer);
        return ResponseEntity.created(new URI("/api/engineers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /engineers} : Updates an existing engineer.
     *
     * @param engineer the engineer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated engineer,
     * or with status {@code 400 (Bad Request)} if the engineer is not valid,
     * or with status {@code 500 (Internal Server Error)} if the engineer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/engineers")
    public ResponseEntity<Engineer> updateEngineer(@Valid @RequestBody Engineer engineer) throws URISyntaxException {
        log.debug("REST request to update Engineer : {}", engineer);
        if (engineer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Engineer result = engineerRepository.save(engineer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, engineer.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /engineers} : get all the engineers.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of engineers in body.
     */
    @GetMapping("/engineers")
    public ResponseEntity<List<Engineer>> getAllEngineers(Pageable pageable) {
        log.debug("REST request to get a page of Engineers");
        Page<Engineer> page = engineerRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /engineers/:id} : get the "id" engineer.
     *
     * @param id the id of the engineer to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the engineer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/engineers/{id}")
    public ResponseEntity<Engineer> getEngineer(@PathVariable Long id) {
        log.debug("REST request to get Engineer : {}", id);
        Optional<Engineer> engineer = engineerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(engineer);
    }

    /**
     * {@code DELETE  /engineers/:id} : delete the "id" engineer.
     *
     * @param id the id of the engineer to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/engineers/{id}")
    public ResponseEntity<Void> deleteEngineer(@PathVariable Long id) {
        log.debug("REST request to delete Engineer : {}", id);
        engineerRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
