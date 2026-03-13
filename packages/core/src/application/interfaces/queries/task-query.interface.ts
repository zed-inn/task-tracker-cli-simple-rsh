import type { TaskStatus } from "@domain/entities/task";
import type { KeysetPagination, PaginatedResult } from "./pagination";

export interface TaskReadModel {
  id: string;
  name: string;
  status: "PENDING" | "DONE" | "IN PROGRESS";
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
