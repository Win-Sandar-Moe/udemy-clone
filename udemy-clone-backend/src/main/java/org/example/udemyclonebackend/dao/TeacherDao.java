package org.example.udemyclonebackend.dao;

import org.example.udemyclonebackend.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TeacherDao extends JpaRepository<Teacher, UUID> {
    Optional<Teacher> findByUsername(String username);
}
