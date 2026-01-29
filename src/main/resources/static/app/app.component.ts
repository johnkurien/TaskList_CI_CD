import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task.service';
import { Task } from './models/task.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  newTaskName: string = '';
  loading: boolean = false;
  error: string = '';
  editingId: number | null = null;
  editingName: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.error = '';
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load tasks';
        console.error(err);
        this.loading = false;
      }
    });
  }

  addTask(): void {
    if (!this.newTaskName.trim()) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.taskService.addTask(this.newTaskName).subscribe({
      next: (task) => {
        this.tasks.push(task);
        this.newTaskName = '';
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to add task';
        console.error(err);
        this.loading = false;
      }
    });
  }

  startEdit(task: Task): void {
    this.editingId = task.id;
    this.editingName = task.name;
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editingName = '';
  }

  saveEdit(task: Task): void {
    if (!this.editingName.trim()) {
      this.cancelEdit();
      return;
    }

    this.loading = true;
    this.error = '';
    this.taskService.updateTask(task.id, this.editingName).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
        this.cancelEdit();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to update task';
        console.error(err);
        this.loading = false;
      }
    });
  }

  deleteTask(taskId: number): void {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to delete task';
        console.error(err);
        this.loading = false;
      }
    });
  }
}
