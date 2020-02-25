package com.appservices.qmmigration.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Engineer.
 */
@Entity
@Table(name = "engineer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Engineer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "eng_mail", nullable = false)
    private String engMail;

    @NotNull
    @Column(name = "eng_name", nullable = false)
    private String engName;

    @NotNull
    @Column(name = "eng_last_name", nullable = false)
    private String engLastName;

    @OneToMany(mappedBy = "caseOwner")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SRCase> cases = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEngMail() {
        return engMail;
    }

    public Engineer engMail(String engMail) {
        this.engMail = engMail;
        return this;
    }

    public void setEngMail(String engMail) {
        this.engMail = engMail;
    }

    public String getEngName() {
        return engName;
    }

    public Engineer engName(String engName) {
        this.engName = engName;
        return this;
    }

    public void setEngName(String engName) {
        this.engName = engName;
    }

    public String getEngLastName() {
        return engLastName;
    }

    public Engineer engLastName(String engLastName) {
        this.engLastName = engLastName;
        return this;
    }

    public void setEngLastName(String engLastName) {
        this.engLastName = engLastName;
    }

    public Set<SRCase> getCases() {
        return cases;
    }

    public Engineer cases(Set<SRCase> sRCases) {
        this.cases = sRCases;
        return this;
    }

    public Engineer addCase(SRCase sRCase) {
        this.cases.add(sRCase);
        sRCase.setCaseOwner(this);
        return this;
    }

    public Engineer removeCase(SRCase sRCase) {
        this.cases.remove(sRCase);
        sRCase.setCaseOwner(null);
        return this;
    }

    public void setCases(Set<SRCase> sRCases) {
        this.cases = sRCases;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Engineer)) {
            return false;
        }
        return id != null && id.equals(((Engineer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Engineer{" +
            "id=" + getId() +
            ", engMail='" + getEngMail() + "'" +
            ", engName='" + getEngName() + "'" +
            ", engLastName='" + getEngLastName() + "'" +
            "}";
    }
}
