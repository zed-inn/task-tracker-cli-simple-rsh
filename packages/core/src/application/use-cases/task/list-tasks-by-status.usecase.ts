import { TaskStatus, type TaskStatusType } from "@domain/entities/task";
import type { TaskQuery } from "@interfaces/queries/task-query.interface";

type ListTasksByStatusCommand = {
  status: string;
};

export class ListTasksByStatus {
  constructor(private readonly taskQuery: TaskQuery) {}

  serialize(cmd: ListTasksByStatusCommand) {
    return { status: new TaskStatus(cmd.status as TaskStatusType) };
  }

  async execute(cmd: ListTasksByStatusCommand) {
    const { status } = this.serialize(cmd);

    const tasks = await this.taskQuery.listByStatus(status);

    return tasks;
  }
}
