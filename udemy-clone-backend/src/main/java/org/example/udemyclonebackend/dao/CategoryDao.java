package org.example.udemyclonebackend.dao;

import org.example.udemyclonebackend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CategoryDao extends JpaRepository<Category, UUID> {
    Optional<Category> findByCategoryName(String categoryName);
}
