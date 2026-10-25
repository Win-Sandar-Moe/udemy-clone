package org.example.udemyclonebackend.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DiscriminatorValue("SITE_ADMIN")
public class SiteAdmin extends User{
    private BigDecimal platFormShare;

    public SiteAdmin(
            String username,
            String password,
            String email,
            BigDecimal platFormShare) {
        super(username, password, email);
        this.platFormShare = platFormShare;
    }
}
