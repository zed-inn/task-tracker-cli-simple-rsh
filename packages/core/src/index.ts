export {
  Task,
  TaskId,
  TaskDescription,
  TaskStatus,
} from "@domain/entities/task";

export { DomainError } from "@errors/domain.error";
export { InvalidStatusFlowError } from "@errors/tasks.errors";

export type {
  TaskQuery,
  TaskReadModel,
} from "@interfaces/queries/task-query.interface";
export type {
  KeysetPagination,
  PaginatedResult,
} from "@interfaces/queries/pagination";
export type { TaskRepository } from "@interfaces/repository/task-repository.interface";
export type { IdGenerator } from "@interfaces/utils/id-generator.interface";

import { AddTask } from "@app/use-cases/task/add-task.usecase";
import { DeleteTask } from "@app/use-cases/task/delete-task.usecase";
import { ListAllTasks } from "@app/use-cases/task/list-all-tasks.usecase";
import { ListTasksByStatus } from "@app/use-cases/task/list-tasks-by-status.usecase";
import { UpdateTaskDescription } from "@app/use-cases/task/update-task-name.usecase";
import { UpdateTaskStatus } from "@app/use-cases/task/update-task-status.usecase";
import type { TaskQuery } from "@interfaces/queries/task-query.interface";
import type { TaskRepository } from "@interfaces/repository/task-repository.interface";
import type { IdGenerator } from "@interfaces/utils/id-generator.interface";

export class TaskApplication {
  readonly addTask: AddTask;
  readonly deleteTask: DeleteTask;
  readonly updateTaskDescription: UpdateTaskDescription;
  readonly updateTaskStatus: UpdateTaskStatus;

  readonly listTasks: ListAllTasks;
  readonly listTasksByStatus: ListTasksByStatus;

  constructor(
    private readonly idGenerator: IdGenerator,
    private readonly taskRepo: TaskRepository,
    private readonly taskQuery: TaskQuery,
  ) {
    this.addTask = new AddTask(idGenerator, taskRepo);
    this.deleteTask = new DeleteTask(taskRepo);
    this.updateTaskDescription = new UpdateTaskDescription(taskRepo);
    this.updateTaskStatus = new UpdateTaskStatus(taskRepo);

    this.listTasks = new ListAllTasks(taskQuery);
    this.listTasksByStatus = new ListTasksByStatus(taskQuery);
  }
}
