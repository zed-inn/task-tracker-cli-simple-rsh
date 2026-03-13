import type { TaskStatus, TaskStatusType } from "@domain/entities/task";

export interface TaskReadModel {
  id: number;
  description: string;
  status: TaskStatusType;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskQuery {
  list(): Promise<TaskReadModel[]>;
  listByStatus(status: TaskStatus): Promise<TaskReadModel[]>;
}
