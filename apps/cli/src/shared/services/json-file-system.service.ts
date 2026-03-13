import fs from "fs/promises";

export class JsonFileSystem<T extends Record<string, unknown>> {
  protected readonly jsonDataFile: string;
  protected readonly model: unknown;

  constructor(datafile: string) {
    this.jsonDataFile = datafile;
  }

  protected async getRows(): Promise<T[]> {
    const rawData = await fs.readFile(this.jsonDataFile);
    return JSON.parse(rawData.toString()) as T[];
  }
}
