import type { KeysetPagination } from "@interfaces/queries/pagination";
import type { TaskQuery } from "@interfaces/queries/task-query.interface";

type ListAllTasksCommand = {
  pagination: KeysetPagination;
};

export class ListAllTasks {
  constructor(private readonly taskQuery: TaskQuery) {}

  async execute(cmd: ListAllTasksCommand) {
    const tasks = await this.taskQuery.list(cmd.pagination);

    return tasks;
  }
}
