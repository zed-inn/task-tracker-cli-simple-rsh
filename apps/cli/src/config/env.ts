import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
  datafile: z
    .string("Data file is necessary.")
    .trim()
    .endsWith(".json", "Data must be stored on a json file"),
});

export const env = envSchema.parse(process.env);
