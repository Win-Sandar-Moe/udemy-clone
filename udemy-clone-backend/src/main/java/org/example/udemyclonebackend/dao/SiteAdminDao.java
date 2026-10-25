package org.example.udemyclonebackend.dao;

import org.example.udemyclonebackend.entity.SiteAdmin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface SiteAdminDao extends JpaRepository<SiteAdmin, UUID> {
    Optional<SiteAdmin> findByUsername(String username);
}
