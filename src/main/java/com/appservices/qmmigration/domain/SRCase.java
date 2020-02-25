package com.appservices.qmmigration.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A SRCase.
 */
@Entity
@Table(name = "sr_case")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SRCase implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "sr_number", nullable = false, unique = true)
    private Long srNumber;

    @NotNull
    @Size(max = 1)
    @Column(name = "severity", length = 1, nullable = false)
    private String severity;

    @NotNull
    @Column(name = "type", nullable = false)
    private String type;

    @ManyToOne
    @JsonIgnoreProperties("cases")
    private Engineer caseOwner;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSrNumber() {
        return srNumber;
    }

    public SRCase srNumber(Long srNumber) {
        this.srNumber = srNumber;
        return this;
    }

    public void setSrNumber(Long srNumber) {
        this.srNumber = srNumber;
    }

    public String getSeverity() {
        return severity;
    }

    public SRCase severity(String severity) {
        this.severity = severity;
        return this;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getType() {
        return type;
    }

    public SRCase type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Engineer getCaseOwner() {
        return caseOwner;
    }

    public SRCase caseOwner(Engineer engineer) {
        this.caseOwner = engineer;
        return this;
    }

    public void setCaseOwner(Engineer engineer) {
        this.caseOwner = engineer;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SRCase)) {
            return false;
        }
        return id != null && id.equals(((SRCase) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SRCase{" +
            "id=" + getId() +
            ", srNumber=" + getSrNumber() +
            ", severity='" + getSeverity() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
