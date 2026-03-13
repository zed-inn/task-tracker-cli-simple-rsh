import type { TaskQuery } from "@interfaces/queries/task-query.interface";

export class ListAllTasks {
  constructor(private readonly taskQuery: TaskQuery) {}

  async execute() {
    const tasks = await this.taskQuery.list();

    return tasks;
  }
}
