package org.example.udemyclonebackend.dao;

import org.example.udemyclonebackend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface StudentDao extends JpaRepository<Student, UUID> {
    Optional<Student> findByUsername(String username);
}
