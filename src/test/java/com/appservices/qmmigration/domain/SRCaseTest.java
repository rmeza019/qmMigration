package com.appservices.qmmigration.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.appservices.qmmigration.web.rest.TestUtil;

public class SRCaseTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SRCase.class);
        SRCase sRCase1 = new SRCase();
        sRCase1.setId(1L);
        SRCase sRCase2 = new SRCase();
        sRCase2.setId(sRCase1.getId());
        assertThat(sRCase1).isEqualTo(sRCase2);
        sRCase2.setId(2L);
        assertThat(sRCase1).isNotEqualTo(sRCase2);
        sRCase1.setId(null);
        assertThat(sRCase1).isNotEqualTo(sRCase2);
    }
}
