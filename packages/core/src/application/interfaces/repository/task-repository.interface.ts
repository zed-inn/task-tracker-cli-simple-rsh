import type { Task, TaskId } from "@domain/entities/task";

export interface TaskRepository {
  getById(id: TaskId): Promise<Task>;
  save(task: Task): Promise<void>;
  remove(task: Task): Promise<void>;
}
