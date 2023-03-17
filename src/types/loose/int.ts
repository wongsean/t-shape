import { z } from "zod";

export const Int = z
  .union([z.string().min(1), z.number()])
  .transform((strOrNum) => {
    const n = new Number(strOrNum).valueOf();

    return Math.trunc(n);
  })
  .pipe(z.number().int());
