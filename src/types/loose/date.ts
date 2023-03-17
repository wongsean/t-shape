import { z } from "zod";

export const date = z
  .union([z.string(), z.number(), z.date()])
  .transform((datelike) =>
    datelike instanceof Date ? datelike : new Date(datelike)
  )
  .pipe(z.date());
