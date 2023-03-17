import { z } from "zod";

export const boolean = z
  .union([z.string(), z.boolean()])
  .transform((strOrBool) =>
    typeof strOrBool === "boolean"
      ? strOrBool
      : strOrBool.trim() === "true"
      ? true
      : strOrBool.trim() === "false"
      ? false
      : strOrBool
  )
  .pipe(z.boolean());
