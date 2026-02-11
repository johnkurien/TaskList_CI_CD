package com.example.demo.service;

import com.example.demo.model.Task;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class TaskService {

    private final List<Task> tasks = new ArrayList<>();
    private final AtomicLong counter = new AtomicLong();

    public List<Task> getAllTasks() {
        return tasks;
    }

    public Task addTask(String name) {
        Task task = new Task(counter.incrementAndGet(), name);
        tasks.add(task);
        return task;
    }

    public void deleteTask(Long id) {
        tasks.removeIf(task -> task.getId().equals(id));
    }

    public Task updateTask(Long id, String name) {
    for (Task task : tasks) {
        if (task.getId().equals(id)) {
            task.setName(name);
            return task;
        }
    }
    return null;
}
}
