import { z } from "zod";

export const number = z
  .union([z.string().min(1), z.number()])
  .transform((strOrNum) => {
    const n = new Number(strOrNum).valueOf();

    return n;
  })
  .pipe(z.number());
