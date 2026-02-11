package com.example.demo.controller;

import com.example.demo.model.Task;
import com.example.demo.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping({ "", "/" })
    public List<Task> getTasks() {
        return taskService.getAllTasks();
    }

    @PostMapping
    public Task addTask(@RequestBody String name) {
        return taskService.addTask(name);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
    
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody String name) {
        return taskService.updateTask(id, name);
    }

}
