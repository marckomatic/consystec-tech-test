package com.notecs.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.notecs.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long>{

    List<Task> findByUser_Id(Long userId);
	

}

