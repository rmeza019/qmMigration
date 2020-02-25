package com.appservices.qmmigration.web.rest;

import com.appservices.qmmigration.QmMigrationApp;
import com.appservices.qmmigration.domain.Engineer;
import com.appservices.qmmigration.repository.EngineerRepository;
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
 * Integration tests for the {@link EngineerResource} REST controller.
 */
@SpringBootTest(classes = QmMigrationApp.class)
public class EngineerResourceIT {

    private static final String DEFAULT_ENG_MAIL = "AAAAAAAAAA";
    private static final String UPDATED_ENG_MAIL = "BBBBBBBBBB";

    private static final String DEFAULT_ENG_NAME = "AAAAAAAAAA";
    private static final String UPDATED_ENG_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ENG_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_ENG_LAST_NAME = "BBBBBBBBBB";

    @Autowired
    private EngineerRepository engineerRepository;

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

    private MockMvc restEngineerMockMvc;

    private Engineer engineer;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EngineerResource engineerResource = new EngineerResource(engineerRepository);
        this.restEngineerMockMvc = MockMvcBuilders.standaloneSetup(engineerResource)
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
    public static Engineer createEntity(EntityManager em) {
        Engineer engineer = new Engineer()
            .engMail(DEFAULT_ENG_MAIL)
            .engName(DEFAULT_ENG_NAME)
            .engLastName(DEFAULT_ENG_LAST_NAME);
        return engineer;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Engineer createUpdatedEntity(EntityManager em) {
        Engineer engineer = new Engineer()
            .engMail(UPDATED_ENG_MAIL)
            .engName(UPDATED_ENG_NAME)
            .engLastName(UPDATED_ENG_LAST_NAME);
        return engineer;
    }

    @BeforeEach
    public void initTest() {
        engineer = createEntity(em);
    }

    @Test
    @Transactional
    public void createEngineer() throws Exception {
        int databaseSizeBeforeCreate = engineerRepository.findAll().size();

        // Create the Engineer
        restEngineerMockMvc.perform(post("/api/engineers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(engineer)))
            .andExpect(status().isCreated());

        // Validate the Engineer in the database
        List<Engineer> engineerList = engineerRepository.findAll();
        assertThat(engineerList).hasSize(databaseSizeBeforeCreate + 1);
        Engineer testEngineer = engineerList.get(engineerList.size() - 1);
        assertThat(testEngineer.getEngMail()).isEqualTo(DEFAULT_ENG_MAIL);
        assertThat(testEngineer.getEngName()).isEqualTo(DEFAULT_ENG_NAME);
        assertThat(testEngineer.getEngLastName()).isEqualTo(DEFAULT_ENG_LAST_NAME);
    }

    @Test
    @Transactional
    public void createEngineerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = engineerRepository.findAll().size();

        // Create the Engineer with an existing ID
        engineer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEngineerMockMvc.perform(post("/api/engineers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(engineer)))
            .andExpect(status().isBadRequest());

        // Validate the Engineer in the database
        List<Engineer> engineerList = engineerRepository.findAll();
        assertThat(engineerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkEngMailIsRequired() throws Exception {
        int databaseSizeBeforeTest = engineerRepository.findAll().size();
        // set the field null
        engineer.setEngMail(null);

        // Create the Engineer, which fails.

        restEngineerMockMvc.perform(post("/api/engineers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(engineer)))
            .andExpect(status().isBadRequest());

        List<Engineer> engineerList = engineerRepository.findAll();
        assertThat(engineerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEngNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = engineerRepository.findAll().size();
        // set the field null
        engineer.setEngName(null);

        // Create the Engineer, which fails.

        restEngineerMockMvc.perform(post("/api/engineers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(engineer)))
            .andExpect(status().isBadRequest());

        List<Engineer> engineerList = engineerRepository.findAll();
        assertThat(engineerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEngLastNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = engineerRepository.findAll().size();
        // set the field null
        engineer.setEngLastName(null);

        // Create the Engineer, which fails.

        restEngineerMockMvc.perform(post("/api/engineers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(engineer)))
            .andExpect(status().isBadRequest());

        List<Engineer> engineerList = engineerRepository.findAll();
        assertThat(engineerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEngineers() throws Exception {
        // Initialize the database
        engineerRepository.saveAndFlush(engineer);

        // Get all the engineerList
        restEngineerMockMvc.perform(get("/api/engineers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(engineer.getId().intValue())))
            .andExpect(jsonPath("$.[*].engMail").value(hasItem(DEFAULT_ENG_MAIL)))
            .andExpect(jsonPath("$.[*].engName").value(hasItem(DEFAULT_ENG_NAME)))
            .andExpect(jsonPath("$.[*].engLastName").value(hasItem(DEFAULT_ENG_LAST_NAME)));
    }
    
    @Test
    @Transactional
    public void getEngineer() throws Exception {
        // Initialize the database
        engineerRepository.saveAndFlush(engineer);

        // Get the engineer
        restEngineerMockMvc.perform(get("/api/engineers/{id}", engineer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(engineer.getId().intValue()))
            .andExpect(jsonPath("$.engMail").value(DEFAULT_ENG_MAIL))
            .andExpect(jsonPath("$.engName").value(DEFAULT_ENG_NAME))
            .andExpect(jsonPath("$.engLastName").value(DEFAULT_ENG_LAST_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingEngineer() throws Exception {
        // Get the engineer
        restEngineerMockMvc.perform(get("/api/engineers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEngineer() throws Exception {
        // Initialize the database
        engineerRepository.saveAndFlush(engineer);

        int databaseSizeBeforeUpdate = engineerRepository.findAll().size();

        // Update the engineer
        Engineer updatedEngineer = engineerRepository.findById(engineer.getId()).get();
        // Disconnect from session so that the updates on updatedEngineer are not directly saved in db
        em.detach(updatedEngineer);
        updatedEngineer
            .engMail(UPDATED_ENG_MAIL)
            .engName(UPDATED_ENG_NAME)
            .engLastName(UPDATED_ENG_LAST_NAME);

        restEngineerMockMvc.perform(put("/api/engineers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEngineer)))
            .andExpect(status().isOk());

        // Validate the Engineer in the database
        List<Engineer> engineerList = engineerRepository.findAll();
        assertThat(engineerList).hasSize(databaseSizeBeforeUpdate);
        Engineer testEngineer = engineerList.get(engineerList.size() - 1);
        assertThat(testEngineer.getEngMail()).isEqualTo(UPDATED_ENG_MAIL);
        assertThat(testEngineer.getEngName()).isEqualTo(UPDATED_ENG_NAME);
        assertThat(testEngineer.getEngLastName()).isEqualTo(UPDATED_ENG_LAST_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingEngineer() throws Exception {
        int databaseSizeBeforeUpdate = engineerRepository.findAll().size();

        // Create the Engineer

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEngineerMockMvc.perform(put("/api/engineers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(engineer)))
            .andExpect(status().isBadRequest());

        // Validate the Engineer in the database
        List<Engineer> engineerList = engineerRepository.findAll();
        assertThat(engineerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEngineer() throws Exception {
        // Initialize the database
        engineerRepository.saveAndFlush(engineer);

        int databaseSizeBeforeDelete = engineerRepository.findAll().size();

        // Delete the engineer
        restEngineerMockMvc.perform(delete("/api/engineers/{id}", engineer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Engineer> engineerList = engineerRepository.findAll();
        assertThat(engineerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
