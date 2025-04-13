package com.notecs.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notecs.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);
}
