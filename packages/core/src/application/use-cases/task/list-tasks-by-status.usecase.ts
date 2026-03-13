import { TaskStatus } from "@domain/entities/task";
import type { KeysetPagination } from "@interfaces/queries/pagination";
import type { TaskQuery } from "@interfaces/queries/task-query.interface";

type ListTasksByStatusCommand = {
  status: string;
  pagination: KeysetPagination;
};

export class ListTasksByStatus {
  constructor(private readonly taskQuery: TaskQuery) {}

  serialize(cmd: ListTasksByStatusCommand) {
    return { ...cmd, status: new TaskStatus(cmd.status) };
  }

  async execute(cmd: ListTasksByStatusCommand) {
    const { pagination, status } = this.serialize(cmd);

    const tasks = await this.taskQuery.listByStatus(status, pagination);

    return tasks;
  }
}
