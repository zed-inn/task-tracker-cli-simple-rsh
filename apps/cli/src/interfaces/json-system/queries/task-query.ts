import { TaskQuery, TaskReadModel, TaskStatus } from "task_tracker_core";
import { JsonFileSystem } from "@shared/services/json-file-system.service.js";
import {
  TaskModel,
  TaskType,
} from "@interfaces/json-system/repo/tasks.repo.js";
import { z } from "zod";
import { DataCorruptedError } from "@errors/database.error.js";

export class JsonFileSystemTaskQuery
  extends JsonFileSystem<TaskType>
  implements TaskQuery
{
  protected readonly model = TaskModel;

  protected parseRows(rows: any) {
    return z.array(this.model).parse(rows);
  }

  protected async getJsonData() {
    const rawData = await this.getRows();
    try {
      return this.parseRows(rawData);
    } catch {
      throw new DataCorruptedError();
    }
  }

  async list(): Promise<TaskReadModel[]> {
    let tasks = await this.getJsonData();
    tasks.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

    return tasks;
  }

  async listByStatus(status: TaskStatus): Promise<TaskReadModel[]> {
    let tasks = await this.getJsonData();
    tasks.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    tasks = tasks.filter((t) => t.status === status.v);

    return tasks;
  }
}
