import type { TaskStatus, TaskStatusType } from "@domain/entities/task";
import type { KeysetPagination, PaginatedResult } from "./pagination";

export interface TaskReadModel {
  id: string;
  description: string;
  status: TaskStatusType;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskQuery {
  list(pagination: KeysetPagination): Promise<PaginatedResult<TaskReadModel>>;
  listByStatus(
    status: TaskStatus,
    pagination: KeysetPagination,
  ): Promise<PaginatedResult<TaskReadModel>>;
}
