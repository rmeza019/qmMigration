package com.appservices.qmmigration.web.rest;

import com.appservices.qmmigration.QmMigrationApp;
import com.appservices.qmmigration.domain.SRCase;
import com.appservices.qmmigration.repository.SRCaseRepository;
import com.appservices.qmmigration.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.appservices.qmmigration.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SRCaseResource} REST controller.
 */
@SpringBootTest(classes = QmMigrationApp.class)
public class SRCaseResourceIT {

    private static final Long DEFAULT_SR_NUMBER = 1L;
    private static final Long UPDATED_SR_NUMBER = 2L;

    private static final String DEFAULT_SEVERITY = "A";
    private static final String UPDATED_SEVERITY = "B";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    @Autowired
    private SRCaseRepository sRCaseRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restSRCaseMockMvc;

    private SRCase sRCase;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SRCaseResource sRCaseResource = new SRCaseResource(sRCaseRepository);
        this.restSRCaseMockMvc = MockMvcBuilders.standaloneSetup(sRCaseResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SRCase createEntity(EntityManager em) {
        SRCase sRCase = new SRCase()
            .srNumber(DEFAULT_SR_NUMBER)
            .severity(DEFAULT_SEVERITY)
            .type(DEFAULT_TYPE);
        return sRCase;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SRCase createUpdatedEntity(EntityManager em) {
        SRCase sRCase = new SRCase()
            .srNumber(UPDATED_SR_NUMBER)
            .severity(UPDATED_SEVERITY)
            .type(UPDATED_TYPE);
        return sRCase;
    }

    @BeforeEach
    public void initTest() {
        sRCase = createEntity(em);
    }

    @Test
    @Transactional
    public void createSRCase() throws Exception {
        int databaseSizeBeforeCreate = sRCaseRepository.findAll().size();

        // Create the SRCase
        restSRCaseMockMvc.perform(post("/api/sr-cases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sRCase)))
            .andExpect(status().isCreated());

        // Validate the SRCase in the database
        List<SRCase> sRCaseList = sRCaseRepository.findAll();
        assertThat(sRCaseList).hasSize(databaseSizeBeforeCreate + 1);
        SRCase testSRCase = sRCaseList.get(sRCaseList.size() - 1);
        assertThat(testSRCase.getSrNumber()).isEqualTo(DEFAULT_SR_NUMBER);
        assertThat(testSRCase.getSeverity()).isEqualTo(DEFAULT_SEVERITY);
        assertThat(testSRCase.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createSRCaseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sRCaseRepository.findAll().size();

        // Create the SRCase with an existing ID
        sRCase.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSRCaseMockMvc.perform(post("/api/sr-cases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sRCase)))
            .andExpect(status().isBadRequest());

        // Validate the SRCase in the database
        List<SRCase> sRCaseList = sRCaseRepository.findAll();
        assertThat(sRCaseList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkSrNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = sRCaseRepository.findAll().size();
        // set the field null
        sRCase.setSrNumber(null);

        // Create the SRCase, which fails.

        restSRCaseMockMvc.perform(post("/api/sr-cases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sRCase)))
            .andExpect(status().isBadRequest());

        List<SRCase> sRCaseList = sRCaseRepository.findAll();
        assertThat(sRCaseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSeverityIsRequired() throws Exception {
        int databaseSizeBeforeTest = sRCaseRepository.findAll().size();
        // set the field null
        sRCase.setSeverity(null);

        // Create the SRCase, which fails.

        restSRCaseMockMvc.perform(post("/api/sr-cases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sRCase)))
            .andExpect(status().isBadRequest());

        List<SRCase> sRCaseList = sRCaseRepository.findAll();
        assertThat(sRCaseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = sRCaseRepository.findAll().size();
        // set the field null
        sRCase.setType(null);

        // Create the SRCase, which fails.

        restSRCaseMockMvc.perform(post("/api/sr-cases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sRCase)))
            .andExpect(status().isBadRequest());

        List<SRCase> sRCaseList = sRCaseRepository.findAll();
        assertThat(sRCaseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSRCases() throws Exception {
        // Initialize the database
        sRCaseRepository.saveAndFlush(sRCase);

        // Get all the sRCaseList
        restSRCaseMockMvc.perform(get("/api/sr-cases?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sRCase.getId().intValue())))
            .andExpect(jsonPath("$.[*].srNumber").value(hasItem(DEFAULT_SR_NUMBER.intValue())))
            .andExpect(jsonPath("$.[*].severity").value(hasItem(DEFAULT_SEVERITY)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)));
    }
    
    @Test
    @Transactional
    public void getSRCase() throws Exception {
        // Initialize the database
        sRCaseRepository.saveAndFlush(sRCase);

        // Get the sRCase
        restSRCaseMockMvc.perform(get("/api/sr-cases/{id}", sRCase.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sRCase.getId().intValue()))
            .andExpect(jsonPath("$.srNumber").value(DEFAULT_SR_NUMBER.intValue()))
            .andExpect(jsonPath("$.severity").value(DEFAULT_SEVERITY))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE));
    }

    @Test
    @Transactional
    public void getNonExistingSRCase() throws Exception {
        // Get the sRCase
        restSRCaseMockMvc.perform(get("/api/sr-cases/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSRCase() throws Exception {
        // Initialize the database
        sRCaseRepository.saveAndFlush(sRCase);

        int databaseSizeBeforeUpdate = sRCaseRepository.findAll().size();

        // Update the sRCase
        SRCase updatedSRCase = sRCaseRepository.findById(sRCase.getId()).get();
        // Disconnect from session so that the updates on updatedSRCase are not directly saved in db
        em.detach(updatedSRCase);
        updatedSRCase
            .srNumber(UPDATED_SR_NUMBER)
            .severity(UPDATED_SEVERITY)
            .type(UPDATED_TYPE);

        restSRCaseMockMvc.perform(put("/api/sr-cases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSRCase)))
            .andExpect(status().isOk());

        // Validate the SRCase in the database
        List<SRCase> sRCaseList = sRCaseRepository.findAll();
        assertThat(sRCaseList).hasSize(databaseSizeBeforeUpdate);
        SRCase testSRCase = sRCaseList.get(sRCaseList.size() - 1);
        assertThat(testSRCase.getSrNumber()).isEqualTo(UPDATED_SR_NUMBER);
        assertThat(testSRCase.getSeverity()).isEqualTo(UPDATED_SEVERITY);
        assertThat(testSRCase.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingSRCase() throws Exception {
        int databaseSizeBeforeUpdate = sRCaseRepository.findAll().size();

        // Create the SRCase

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSRCaseMockMvc.perform(put("/api/sr-cases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sRCase)))
            .andExpect(status().isBadRequest());

        // Validate the SRCase in the database
        List<SRCase> sRCaseList = sRCaseRepository.findAll();
        assertThat(sRCaseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSRCase() throws Exception {
        // Initialize the database
        sRCaseRepository.saveAndFlush(sRCase);

        int databaseSizeBeforeDelete = sRCaseRepository.findAll().size();

        // Delete the sRCase
        restSRCaseMockMvc.perform(delete("/api/sr-cases/{id}", sRCase.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SRCase> sRCaseList = sRCaseRepository.findAll();
        assertThat(sRCaseList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
