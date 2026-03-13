import { z } from "zod";
import fs from "fs/promises";
import { NoTaskError, Task, TaskId, TaskRepository } from "task_tracker_core";
import {
  DataCorruptedError,
  NonUniqueIdError,
} from "@errors/database.error.js";
import { JsonFileSystem } from "@shared/services/json-file-system.service.js";

export const TaskModel = z.object({
  id: z
    .int("Id must be an integer.")
    .positive("Id cannot be negative or 0.")
    .or(
      z.coerce
        .number()
        .int("Id must be an integer.")
        .positive("Id cannot be negative or 0."),
    ),
  description: z.string("A description is necessary").trim(),
  status: z.enum(
    ["todo", "in-progress", "done"],
    "Status can only be 'todo', 'in-progress' or 'done'",
  ),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type TaskType = z.infer<typeof TaskModel>;

export class JsonFileSystemTaskRepo
  extends JsonFileSystem<TaskType>
  implements TaskRepository
{
  protected readonly model = TaskModel;

  protected parseRows(rows: any) {
    return z.array(this.model).parse(rows);
  }

  protected async getJsonData() {
    const rawData = await this.getRows();
    try {
      return this.parseRows(rawData);
    } catch (err) {
      console.log(err);
      throw new DataCorruptedError();
    }
  }

  protected async saveJsonData(data: z.infer<typeof this.model>[]) {
    await fs.writeFile(this.jsonDataFile, JSON.stringify(data));
  }

  async getById(id: TaskId): Promise<Task> {
    const data = await this.getJsonData();

    for (const t of data) if (t.id === id.v) return new Task(t);

    throw new NoTaskError();
  }

  async save(task: Task): Promise<void> {
    const data = await this.getJsonData();

    for (let i = 0; i < data.length; i++) {
      if ((data[i] as TaskType).id === task.id.v) {
        data[i] = {
          id: task.id.v,
          description: task.description.v,
          status: task.status.v,
          createdAt: (data[i] as TaskType).createdAt,
          updatedAt: new Date(),
        };

        await this.saveJsonData(data);
        return;
      }
    }

    data.push(
      this.model.parse({
        id: task.id.v,
        description: task.description.v,
        status: task.status.v,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    await this.saveJsonData(data);
  }

  async remove(task: Task): Promise<void> {
    const data = await this.getJsonData();

    const newData: typeof data = [];
    for (const t of data) if (t.id !== task.id.v) newData.push(t);

    await this.saveJsonData(newData);
  }
}
