import { JsonFileSystem } from "@shared/services/json-file-system.service.js";
import { TaskModel, TaskType } from "../repo/tasks.repo.js";
import { IdGenerator } from "task_tracker_core";
import { z } from "zod";
import { DataCorruptedError } from "@errors/database.error.js";

export class JsonFileSystemIdGenerator
  extends JsonFileSystem<TaskType>
  implements IdGenerator
{
  protected readonly model = TaskModel;

  protected parseRows(rows: any) {
    return z.array(this.model).parse(rows);
  }

  protected async getJsonData() {
    const rawData = await this.getRows();
    try {
      return this.parseRows(rawData);
    } catch (err){
        console.log(err);
      throw new DataCorruptedError();
    }
  }

  async generateInt(): Promise<number> {
    const data = await this.getJsonData();
    if (data.length < 1) return 1;

    let maxId = 1;
    data.forEach((dt) => {
      maxId = Math.max(dt.id, maxId);
    });

    return maxId + 1;
  }
}
