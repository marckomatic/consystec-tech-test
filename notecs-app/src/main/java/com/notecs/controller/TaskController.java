package com.notecs.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.notecs.dto.TaskRequest;
import com.notecs.dto.TaskResponse;
import com.notecs.entity.Task;
import com.notecs.entity.User;
import com.notecs.repository.TaskRepository;
import com.notecs.repository.UserRepository;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

	@Autowired
	private TaskRepository taskRepository;

	@Autowired
	private UserRepository userRepository;

	@GetMapping("/user/{userId}")
	public ResponseEntity<?> getUserTasks(@PathVariable("userId") Long userId) {
		try {
			List<Task> tasks = taskRepository.findByUser_Id(userId);
			List<TaskResponse> response = new ArrayList<TaskResponse>();
			for (Task task : tasks) {
				TaskResponse newTaskResponse = new TaskResponse(task.getId(), task.getTitle(), task.getContent(),
						task.getDate(), task.getUser().getId());
				newTaskResponse.setCompleted(task.isCompleted());
				response.add(newTaskResponse);
			}
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			return ResponseEntity.internalServerError().body("Internal server error.");
		}
	}

	@PostMapping("/")
	public ResponseEntity<?> postTask(@RequestBody TaskRequest taskRequest) {
		try {

			Task task = new Task();
			task.setTitle(taskRequest.getTitle());
			task.setContent(taskRequest.getContent());
			task.setDate(taskRequest.getDate());
			task.setCompleted(taskRequest.isCompleted());
			Optional<User> userOpt = userRepository.findById(taskRequest.getUserId());
			if (!userOpt.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id de usuario no encontrado.");
			}
			task.setUser(userOpt.get());
			taskRepository.save(task);
			TaskResponse taskResponse = new TaskResponse(task.getId(), task.getTitle(), task.getContent(), task.getDate(),
					task.getUser().getId());

			taskResponse.setCompleted(task.isCompleted());
			return ResponseEntity.ok(taskResponse);
		} catch (ConstraintViolationException exception) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("id de usuario no encontrado.");
		} catch (Exception exception) {
			System.out.println(exception.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server error.");
		}

	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateTaskContent(@PathVariable("id") Long id, @RequestBody TaskRequest taskRequest) {
		try {
			Optional<Task> taskOptional = taskRepository.findById(id);
			if (!taskOptional.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tarea no encontrada.");
			}

			Task task = taskOptional	.get();
			task.setTitle(taskRequest.getTitle());
			task.setContent(taskRequest.getContent());
			task.setDate(java.sql.Date.valueOf(java.time.LocalDate.now()));
			task.setCompleted(taskRequest.isCompleted());
			taskRepository.save(task);
			TaskResponse taskResponse = new TaskResponse(task.getId(), task.getTitle(), task.getContent(), task.getDate(),
					task.getUser().getId());
			taskResponse.setCompleted(task.isCompleted());
			return ResponseEntity.ok(taskResponse);
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor.");
		}
	}
	
    @PutMapping("/{id}/completed")
    public ResponseEntity<?> updateTaskCompleted(
            @PathVariable("id") Long id,
            @RequestParam("completed") boolean completed) {

        Optional<Task> taskOptional = taskRepository.findById(id);
        if (!taskOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Task no encontrada.");
        }
        
        Task task = taskOptional.get();
        task.setCompleted(completed);
        System.out.println("is completed " + task.isCompleted());
        taskRepository.save(task);
        TaskResponse response = new TaskResponse(task.getId(), task.getTitle(), task.getContent(), task.getDate(), task.getId());
        response.setCompleted(task.isCompleted());
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable("id") Long id) {
        Optional<Task> taskOptional = taskRepository.findById(id);
        if (!taskOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Task no encontrada.");
        }
        
        taskRepository.deleteById(id);
        return ResponseEntity.ok("Task eliminada correctamente.");
    }
}
